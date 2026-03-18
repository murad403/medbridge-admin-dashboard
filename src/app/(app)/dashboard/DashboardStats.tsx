import { Brain, ShieldAlert, UserRoundCheck, UsersRound } from "lucide-react";

const stats = [
  {
    title: "Patients Waiting",
    value: "12",
    subtitle: "awaiting doctor review",
    icon: UsersRound,
    iconClass: "text-[#4F81FF]",
    iconWrapper: "bg-[#EFF4FF]",
  },
  {
    title: "High-Risk Alerts",
    value: "3",
    subtitle: "urgent cases flagged by AI",
    icon: ShieldAlert,
    iconClass: "text-[#EF4444]",
    iconWrapper: "bg-[#FFF1F1]",
  },
  {
    title: "Cases Reviewed Today",
    value: "18",
    subtitle: "completed consultations",
    icon: UserRoundCheck,
    iconClass: "text-[#22C55E]",
    iconWrapper: "bg-[#EEFAF3]",
  },
  {
    title: "AI Draft Acceptance",
    value: "94%",
    subtitle: "AI notes accepted by doctors",
    icon: Brain,
    iconClass: "text-[#A855F7]",
    iconWrapper: "bg-[#FAF5FF]",
  },
];

const DashboardStats = () => {
  return (
    <section className="grid grid-cols-1 md:gap-6 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {stats.map((item) => (
        <article
          key={item.title}
          className="rounded-[10px] border border-border-color bg-main md:p-6 p-4 shadow-xs sm:px-5"
        >
          <div className="flex items-start gap-3">
            <div
              className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[10px] ${item.iconWrapper}`}
            >
              <item.icon className={`size-5 ${item.iconClass}`} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-description">{item.title}</p>
              <h2 className="mt-0.5 text-[30px] leading-[1.1] font-medium text-title">
                {item.value}
              </h2>
              <p className="mt-1 text-xs text-description">{item.subtitle}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default DashboardStats;
