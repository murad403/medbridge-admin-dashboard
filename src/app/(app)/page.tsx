import PageHeader from "@/components/shared/PageHeader";
import AIPerformance from "./dashboard/AIPerformance";
import DashboardStats from "./dashboard/DashboardStats";
import PatientQueue from "./dashboard/PatientQueue";
import RecentlyCompleted from "./dashboard/RecentlyCompleted";
import RiskAlert from "./dashboard/RiskAlert";


export default function DashboardPage() {
    return (
        <div className="space-y-6 md:space-y-8">
            <PageHeader title="Dashboard" description="Overview of today's clinical activities" />

            <DashboardStats />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <div className="space-y-6 xl:col-span-8">
                    <RiskAlert />
                    <PatientQueue />
                </div>

                <div className="space-y-6 xl:col-span-4">
                    <RecentlyCompleted />
                    <AIPerformance />
                </div>
            </div>
        </div>
    );
}
