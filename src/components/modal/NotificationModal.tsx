"use client";

import React, { useMemo, useState } from "react";
import { Bell, CircleAlert, Trash2, Check } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type NotificationLevel = "high" | "medium" | "low";
type NotificationFilter = "all" | "unread" | NotificationLevel;

type NotificationItem = {
  id: number;
  title: string;
  description: string;
  time: string;
  level: NotificationLevel;
  unread: boolean;
};

type NotificationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "High Risk Alert: Chest Pain Detected",
    description:
      "Patient: Sarah Johnson, Symptoms: Chest pain radiating to left arm, Submitted: 2 mins ago",
    time: "Feb 23, 12:11 PM",
    level: "high",
    unread: true,
  },
  {
    id: 2,
    title: "New Patient Report Submitted",
    description: "Order #ORD-1247 from John Smith - $159.99",
    time: "Feb 23, 12:36 PM",
    level: "low",
    unread: true,
  },
  {
    id: 3,
    title: "Moderate Risk Case Submitted",
    description: "Sarah Johnson just signed up for Premium plan",
    time: "Feb 23, 12:26 PM",
    level: "medium",
    unread: false,
  },
  {
    id: 4,
    title: "New Patient Report Submitted",
    description: "Order #ORD-1247 from John Smith - $159.99",
    time: "Feb 23, 12:36 PM",
    level: "low",
    unread: false,
  },
  {
    id: 5,
    title: "New Patient Report Submitted",
    description: "Order #ORD-1247 from John Smith - $159.99",
    time: "Feb 23, 12:36 PM",
    level: "low",
    unread: false,
  },
];

const levelColor = {
  high: {
    card: "border-[#FECACA] bg-[#FFF5F5]",
    iconBg: "bg-[#FF3B30]",
    badge: "bg-[#FF3B30] text-white",
    title: "text-[#FF3B30]",
  },
  medium: {
    card: "border-[#BFDBFE] bg-[#EFF6FF]",
    iconBg: "bg-[#FBBF24]",
    badge: "bg-[#FBBF24] text-white",
    title: "text-title",
  },
  low: {
    card: "border-[#BFDBFE] bg-[#EFF6FF]",
    iconBg: "bg-[#22C55E]",
    badge: "bg-[#22C55E] text-white",
    title: "text-title",
  },
} as const;

const NotificationModal = ({ open, onOpenChange }: NotificationModalProps) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") return notifications;
    if (activeFilter === "unread") return notifications.filter((item) => item.unread);
    return notifications.filter((item) => item.level === activeFilter);
  }, [activeFilter, notifications]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-5 sm:max-w-4xl md:p-6">
        <DialogTitle className="text-3xl font-semibold text-title">Incoming Notifications</DialogTitle>

        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-sm text-description">All Received notifications</p>
          <button
            type="button"
            onClick={markAllRead}
            className="inline-flex items-center gap-2 rounded-[10px] border border-border-color px-3 py-2 text-sm font-medium text-title hover:bg-[#F9FAFB]"
          >
            <Check className="size-4" />
            Mark All Read
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`rounded-[10px] border px-3 py-1.5 text-sm font-medium ${
              activeFilter === "all"
                ? "border-button-color bg-button-color text-white"
                : "border-border-color bg-white text-title"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("unread")}
            className={`rounded-[10px] border px-3 py-1.5 text-sm font-medium ${
              activeFilter === "unread"
                ? "border-button-color bg-button-color text-white"
                : "border-border-color bg-white text-title"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("high")}
            className={`rounded-[10px] border px-3 py-1.5 text-sm font-medium ${
              activeFilter === "high"
                ? "border-button-color bg-button-color text-white"
                : "border-border-color bg-white text-title"
            }`}
          >
            High
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("medium")}
            className={`rounded-[10px] border px-3 py-1.5 text-sm font-medium ${
              activeFilter === "medium"
                ? "border-button-color bg-button-color text-white"
                : "border-border-color bg-white text-title"
            }`}
          >
            Medium
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("low")}
            className={`rounded-[10px] border px-3 py-1.5 text-sm font-medium ${
              activeFilter === "low"
                ? "border-button-color bg-button-color text-white"
                : "border-border-color bg-white text-title"
            }`}
          >
            Low
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {filteredNotifications.map((item) => {
            const styles = levelColor[item.level];
            return (
              <article
                key={item.id}
                className={`rounded-xl border p-3 md:p-4 ${styles.card}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full text-white ${styles.iconBg}`}>
                      {item.level === "high" ? <CircleAlert className="size-5" /> : <Bell className="size-5" />}
                    </div>
                    <div className="min-w-0">
                      <h3 className={`text-xl font-semibold ${styles.title}`}>
                        {item.title}
                        {item.unread && <span className="ml-1 text-button-color">•</span>}
                      </h3>
                      <p className="mt-0.5 text-sm text-description">{item.description}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <p className="text-sm text-description">{item.time}</p>
                        <span className={`rounded-full px-3 py-0.5 text-xs font-semibold capitalize ${styles.badge}`}>
                          {item.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteNotification(item.id)}
                    className="rounded-lg border border-[#E4E7EC] bg-white p-2 text-[#EF4444] hover:bg-[#FFF1F2]"
                    aria-label={`Delete ${item.title}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </article>
            );
          })}

          {filteredNotifications.length === 0 && (
            <div className="rounded-xl border border-dashed border-border-color py-10 text-center text-description">
              No notifications found.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
