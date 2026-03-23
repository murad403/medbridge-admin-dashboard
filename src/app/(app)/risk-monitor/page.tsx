import PageHeader from "@/components/shared/PageHeader";

import HighRiskCaseFrequency from "./HighRiskCaseFrequency";
import MostFlaggedSymptoms from "./MostFlaggedSymptoms";
import RiskMonitoringStats from "./RiskMonitoringStats";

const RiskMonitorPage = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <PageHeader
        title="Risk Monitoring"
        description="Track high-risk case patterns and AI performance metrics"
      />

      <RiskMonitoringStats />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <HighRiskCaseFrequency />
        <MostFlaggedSymptoms />
      </section>
    </div>
  );
};

export default RiskMonitorPage;
