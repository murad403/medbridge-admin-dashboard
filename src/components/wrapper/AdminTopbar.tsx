"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import NotificationModal from "@/components/modal/NotificationModal";
import LogoutModal from "@/components/modal/LogoutModal";

export default function AdminTopbar() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!profileMenuRef.current) return;
      if (!profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-2 md:px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsNotificationOpen(true)}
            className="relative cursor-pointer text-gray-500 transition hover:text-gray-700"
            aria-label="Open notifications"
          >
            <Bell className="size-5" />
            <span className="absolute -right-1 -top-1 size-2 rounded-full bg-red-500" />
          </button>

          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-transparent px-1.5 py-1 transition hover:bg-[#F7F8FA]"
              aria-label="Open profile menu"
            >
              <Avatar className="size-9 bg-[#1b3a5c]">
                <AvatarFallback className="bg-[#1b3a5c] text-white text-sm font-semibold">
                  DR
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium text-title">Jhon Doe</p>
                <p className="text-xs text-description">Doctor</p>
              </div>
              <ChevronDown className="size-4 text-description" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-34 overflow-hidden rounded-[10px] border border-border-color bg-white shadow-sm">
                <Link
                  href="/settings"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="block border-b border-border-color px-4 py-3 text-sm text-title transition hover:bg-[#F9FAFB]"
                >
                  Profile Settings
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    setIsLogoutOpen(true);
                  }}
                  className="w-full cursor-pointer px-4 py-3 text-sm font-medium text-[#FF2D2D] transition hover:bg-[#FFF5F5]"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <NotificationModal open={isNotificationOpen} onOpenChange={setIsNotificationOpen} />
      <LogoutModal open={isLogoutOpen} onOpenChange={setIsLogoutOpen} onConfirm={() => {}} />
    </>
  );
}
