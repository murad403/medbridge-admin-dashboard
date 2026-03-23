import PageHeader from "@/components/shared/PageHeader";
import ComplianceStatus from "./dashboard/ComplianceStatus";
import DashboardStats from "./dashboard/DashboardStats";
import RecentActivity from "./dashboard/RecentActivity";
import RiskCaseVolume from "./dashboard/RiskCaseVolume";

export default function DashboardPage() {
    return (
        <div className="space-y-6 md:space-y-8">
            <PageHeader
                title="System Overview"
                description="Real-time platform health and activity monitoring"
            />

            <DashboardStats />
            <RiskCaseVolume />

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
                <div className="lg:col-span-2">
                    <RecentActivity />
                </div>
                <ComplianceStatus />
            </section>
        </div>
    );
}
