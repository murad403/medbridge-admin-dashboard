import PageHeader from "@/components/shared/PageHeader";
import AiInsightsStats from "./AiInsightsStats";
import MostCommonSymptoms from "./MostCommonSymptoms";
import PerformanceSummary from "./PerformanceSummary";
import RecentAchievements from "./RecentAchievements";
import RiskTrendsOverTime from "./RiskTrendsOverTime";

const AiInsightsPage = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <PageHeader
        title="AI Insights"
        description="Analytics and performance metrics for AI-assisted documentation"
      />

      <AiInsightsStats />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-8">
          <MostCommonSymptoms />
          <RiskTrendsOverTime />
        </div>

        <div className="space-y-6 xl:col-span-4">
          <PerformanceSummary />
          <RecentAchievements />
        </div>
      </div>
    </div>
  );
};

export default AiInsightsPage;
