import { AlertTriangle, Brain, FileText, UserPlus } from "lucide-react";

const activities = [
  {
    title: "User created",
    subtitle: "by Dr. Sarah Chen",
    time: "2 minutes ago",
    icon: UserPlus,
  },
  {
    title: "Report edited",
    subtitle: "by Dr. Michel Ross",
    time: "15 minutes ago",
    icon: FileText,
  },
  {
    title: "AI protocol updated",
    subtitle: "by Admin User",
    time: "1 hour ago",
    icon: Brain,
  },
  {
    title: "Permission changed",
    subtitle: "by Admin User",
    time: "2 hours ago",
    icon: AlertTriangle,
  },
  {
    title: "Audit log exported",
    subtitle: "by Dr. Emily Stone",
    time: "3 hours ago",
    icon: FileText,
  },
];

const RecentActivity = () => {
  return (
    <section className="rounded-[10px] border border-border-color bg-main p-4 md:p-6">
      <h2 className="text-base leading-[1.2] font-semibold text-title md:text-xl">
        Recent Activity
      </h2>

      <div className="mt-3 divide-y divide-[#ECEFF3]">
        {activities.map((activity) => (
          <article key={activity.title} className="flex items-start justify-between gap-4 py-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-[#F3F4F6]">
                <activity.icon className="size-4 text-[#6B7280]" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-title">{activity.title}</h3>
                <p className="text-xs text-description">{activity.subtitle}</p>
              </div>
            </div>
            <p className="text-xs text-description">{activity.time}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;
