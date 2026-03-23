"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useState } from "react";


const ToggleSwitch = ({ checked, onToggle }: { checked: boolean; onToggle: () => void }) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={checked}
            className={`relative h-5 w-9 cursor-pointer rounded-full transition ${checked ? "bg-button-color" : "bg-border-color"
                }`}
        >
            <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${checked ? "left-4.5" : "left-0.5"
                    }`}
            />
        </button>
    );
};

const NotificationsSettings = () => {

    const [highRiskAlerts, setHighRiskAlerts] = useState(true);
    const [securityAlerts, setSecurityAlerts] = useState(true);
    const [systemHealthWarnings, setSystemHealthWarnings] = useState(true);
    const [complianceReminders, setComplianceReminders] = useState(true);
    const [activityDigest, setActivityDigest] = useState(false);
    const [weeklyReports, setWeeklyReports] = useState(true);
    return (
        <section className="rounded-[10px] border border-border-color bg-main p-4 md:p-5">
            <h2 className="text-2xl font-semibold text-title">Notification Policies</h2>

            <div className="mt-4 max-w-2xl divide-y divide-border-color">
                <div className="flex items-center justify-between py-3">
                    <div>
                        <h3 className="text-base font-medium text-title">High-Risk Case Alerts</h3>
                        <p className="text-sm text-description">Notify admins when AI flags high-risk cases</p>
                    </div>
                    <ToggleSwitch checked={highRiskAlerts} onToggle={() => setHighRiskAlerts((prev) => !prev)} />
                </div>

                <div className="flex items-center justify-between py-3">
                    <div>
                        <h3 className="text-base font-medium text-title">Security Alerts</h3>
                        <p className="text-sm text-description">Immediate alerts for security incidents</p>
                    </div>
                    <ToggleSwitch checked={securityAlerts} onToggle={() => setSecurityAlerts((prev) => !prev)} />
                </div>

                <div className="flex items-center justify-between py-3">
                    <div>
                        <h3 className="text-base font-medium text-title">System Health Warnings</h3>
                        <p className="text-sm text-description">Notify when system components are degraded</p>
                    </div>
                    <ToggleSwitch
                        checked={systemHealthWarnings}
                        onToggle={() => setSystemHealthWarnings((prev) => !prev)}
                    />
                </div>

                <div className="flex items-center justify-between py-3">
                    <div>
                        <h3 className="text-base font-medium text-title">Compliance Reminders</h3>
                        <p className="text-sm text-description">Reminders for upcoming audits and reviews</p>
                    </div>
                    <ToggleSwitch
                        checked={complianceReminders}
                        onToggle={() => setComplianceReminders((prev) => !prev)}
                    />
                </div>

                <div className="flex items-center justify-between py-3">
                    <div>
                        <h3 className="text-base font-medium text-title">User Activity Digest</h3>
                        <p className="text-sm text-description">Daily summary of user activity (email)</p>
                    </div>
                    <ToggleSwitch checked={activityDigest} onToggle={() => setActivityDigest((prev) => !prev)} />
                </div>

                <div className="flex items-center justify-between py-3">
                    <div>
                        <h3 className="text-base font-medium text-title">Weekly Reports</h3>
                        <p className="text-sm text-description">Automated weekly system reports</p>
                    </div>
                    <ToggleSwitch checked={weeklyReports} onToggle={() => setWeeklyReports((prev) => !prev)} />
                </div>
            </div>

            <div className="mt-6 max-w-2xl">
                <label className="text-sm font-medium text-title">Notification Email Recipients</label>
                <Textarea
                    className="mt-2 min-h-12 resize-none bg-[#F3F4F6]"
                    defaultValue="admin@medbridge.com, security@medbridge.com"
                />
                <p className="mt-1 text-xs text-description">Enter one email address per line</p>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3 max-w-2xl">
                <button className="bg-[#F5F6F8] cursor-pointer py-2.5 px-6 rounded-[10px] border border-border-color">
                    Reset
                </button>
                <Button type="button" className="flex items-center justify-center max-w-35">
                    <Save className="size-3.5" />
                    Save Changes
                </Button>
            </div>
        </section>
    )
}

export default NotificationsSettings
