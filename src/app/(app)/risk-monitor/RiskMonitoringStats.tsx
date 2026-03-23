import { AlertTriangle, CircleX, Gauge, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "High-Risk Cases (30 days)",
    value: "487",
    subtitle: "+12% vs last month",
    icon: AlertTriangle,
  },
  {
    title: "False Positive Rate",
    value: "2.2%",
    subtitle: "-0.3% this week",
    icon: CircleX,
  },
  {
    title: "Doctor Override Rate",
    value: "4.7%",
    subtitle: "Stable",
    icon: Gauge,
  },
  {
    title: "Average Response Time",
    value: "1.2s",
    subtitle: "-0.1s improvement",
    icon: TrendingUp,
  },
];

const RiskMonitoringStats = () => {
  return (
    <section className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <article
          key={item.title}
          className="rounded-[10px] border border-border-color bg-main p-5 shadow-xs"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-description">{item.title}</p>
              <h2 className="mt-0.5 text-[34px] leading-[1.1] font-medium text-title">{item.value}</h2>
              <p className="mt-1 text-xs text-[#16A34A]">{item.subtitle}</p>
            </div>

            <div className="flex size-9 items-center justify-center rounded-[10px] bg-[#F3F4F6]">
              <item.icon className="size-[18px] text-[#6B7280]" />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default RiskMonitoringStats;
