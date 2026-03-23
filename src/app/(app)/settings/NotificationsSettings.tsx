"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import React, { useState } from "react";

const PreferenceSwitch = ({ checked, onToggle }: { checked: boolean; onToggle: () => void }) => (
    <button
        type="button"
        onClick={onToggle}
        className={`relative h-6 w-11 cursor-pointer rounded-full transition ${checked ? "bg-button-color" : "bg-border-color"
            }`}
        aria-pressed={checked}
    >
        <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${checked ? "left-5.5" : "left-0.5"
                }`}
        />
    </button>
);

const NotificationsSettings = () => {
    const [emailUpdates, setEmailUpdates] = useState(true);
    const [highRiskAlerts, setHighRiskAlerts] = useState(true);
    const [dailySummary, setDailySummary] = useState(false);

    return (
        <section className="rounded-[10px] border border-border-color bg-main p-4 shadow-xs sm:p-5">
            <div className="mb-4">
                <div className="flex items-center gap-2">

                    <Bell className="size-4 text-title" />
                    <h2 className="text-xl font-medium text-title">Notification Preferences</h2>
                </div>

                <p className="text-sm text-description">Configure how you receive alerts and updates</p>

            </div>

            <div className="divide-y divide-border-color">
                <div className="flex items-center justify-between py-3">
                    <div>
                        <p className="text-sm font-medium text-title">Email Notifications</p>
                        <p className="text-sm text-description">Receive email updates about new patients</p>
                    </div>
                    <PreferenceSwitch checked={emailUpdates} onToggle={() => setEmailUpdates((prev) => !prev)} />
                </div>

                <div className="flex items-center justify-between py-3">
                    <div>
                        <p className="text-sm font-medium text-title">High-Risk Alerts</p>
                        <p className="text-sm text-description">Immediate notifications for high-risk cases</p>
                    </div>
                    <PreferenceSwitch checked={highRiskAlerts} onToggle={() => setHighRiskAlerts((prev) => !prev)} />
                </div>

                <div className="flex items-center justify-between py-3">
                    <div>
                        <p className="text-sm font-medium text-title">Daily Summary</p>
                        <p className="text-sm text-description">Daily digest of completed cases and metrics</p>
                    </div>
                    <PreferenceSwitch checked={dailySummary} onToggle={() => setDailySummary((prev) => !prev)} />
                </div>
            </div>

            <Button
                type="button"
                className="max-w-30 mt-4"
            >
                Save Preferences
            </Button>
        </section>
    );
};

export default NotificationsSettings;
