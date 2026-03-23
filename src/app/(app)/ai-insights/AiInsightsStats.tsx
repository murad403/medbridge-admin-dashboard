import { ChartNoAxesCombined, CheckCheck, Clock3, ShieldCheck } from "lucide-react";

const stats = [
  {
    title: "12.5 min",
    subtitle: "Average Time Saved per Case",
    trend: "+15%",
    icon: Clock3,
  },
  {
    title: "94%",
    subtitle: "Draft Acceptance Rate",
    trend: "+3%",
    icon: CheckCheck,
  },
  {
    title: "247",
    subtitle: "Total Cases Processed",
    trend: "+28",
    icon: ChartNoAxesCombined,
  },
  {
    title: "98%",
    subtitle: "High Risk Detection Rate",
    trend: "+2%",
    icon: ShieldCheck,
  },
];

const AiInsightsStats = () => {
  return (
    <section className="grid grid-cols-1 md:gap-6 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <article key={item.subtitle} className="rounded-[10px] border border-border-color bg-main p-4 shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex size-9 items-center justify-center rounded-[10px] bg-[#EEF4FF] text-button-color">
              <item.icon className="size-4" />
            </div>
            <span className="rounded-full bg-[#ECFDF3] px-2 py-0.5 text-[11px] font-medium text-[#22C55E]">
              {item.trend}
            </span>
          </div>

          <h3 className="mt-4 text-[34px] leading-none font-medium text-title">{item.title}</h3>
          <p className="mt-2 text-xs text-description">{item.subtitle}</p>
        </article>
      ))}
    </section>
  );
};

export default AiInsightsStats;
