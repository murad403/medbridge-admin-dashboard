import {
  AlertTriangle,
  Brain,
  FileText,
  Stethoscope,
  UsersRound,
} from "lucide-react";

const stats = [
  {
    title: "Total Patients",
    value: "12,847",
    subtitle: "+234 this month",
    icon: UsersRound,
    iconClass: "text-[#4F81FF]",
    iconWrapper: "bg-[#EFF4FF]",
  },
  {
    title: "Active Doctors",
    value: "342",
    subtitle: "+12 this month",
    icon: Stethoscope,
    iconClass: "text-[#22C55E]",
    iconWrapper: "bg-[#EEFAF3]",
  },
  {
    title: "Reports Today",
    value: "1,284",
    subtitle: "",
    icon: FileText,
    iconClass: "text-[#6B7280]",
    iconWrapper: "bg-[#F3F4F6]",
  },
  {
    title: "High Risk Cases Today",
    value: "16",
    subtitle: "",
    icon: AlertTriangle,
    iconClass: "text-[#6B7280]",
    iconWrapper: "bg-[#F3F4F6]",
  },
  {
    title: "AI Accuracy Rate",
    value: "96.8%",
    subtitle: "+0.3% this week",
    icon: Brain,
    iconClass: "text-[#4F81FF]",
    iconWrapper: "bg-[#EFF4FF]",
  },
];

const DashboardStats = () => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-5">
      {stats.map((item) => (
        <article
          key={item.title}
          className="rounded-[10px] border border-border-color bg-main p-4 shadow-xs sm:px-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-description">{item.title}</p>
              <h2 className="mt-0.5 text-[34px] leading-[1.1] font-medium text-title">
                {item.value}
              </h2>
              {item.subtitle ? (
                <p className="mt-1 text-xs text-[#16A34A]">{item.subtitle}</p>
              ) : (
                <div className="mt-1 h-4" />
              )}
            </div>

            <div
              className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[10px] ${item.iconWrapper}`}
            >
              <item.icon className={`size-4.5 ${item.iconClass}`} />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default DashboardStats;
