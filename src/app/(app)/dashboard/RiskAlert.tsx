import RiskAlertCard from "@/components/shared/RiskAlertCard";
import { alerts, TAlert } from "@/lib/demo";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";


const RiskAlert = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-[#EF4444]" />
          <h2 className="text-lg font-medium text-title">High-Risk Alerts</h2>
        </div>

        <Link href={"/risk-alerts"} className="cursor-pointer text-sm font-medium text-title transition hover:opacity-70">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {alerts.slice(0, 2).map((alert: TAlert, index: number) => (
          <RiskAlertCard key={index} alert={alert} />
        ))}
      </div>
    </section>
  );
};

export default RiskAlert;
