

import PageHeader from "@/components/shared/PageHeader";
import Link from "next/link";

type HistoryItem = {
  title: string;
  risk: "HIGH" | "LOW";
  riskClass: string;
  date: string;
  time: string;
  doctor: string;
  description: string;
  status: string;
  statusClass: string;
  isCurrent?: boolean;
};

const timelineItems: HistoryItem[] = [
  {
    title: "Acute chest pain with arm radiation",
    risk: "HIGH",
    riskClass: "bg-[#FFECEC] text-[#EF4444]",
    date: "March 1, 2026",
    time: "10:30 AM",
    doctor: "Dr. Roberts",
    description:
      "Patient presented with sudden onset severe chest pain radiating to left arm. Associated with dizziness and SOB. ECG performed, troponin ordered...",
    status: "In Progress",
    statusClass: "bg-[#E8F0FF] text-button-color",
    isCurrent: true,
  },
  {
    title: "Blood pressure follow-up",
    risk: "LOW",
    riskClass: "bg-[#ECFDF3] text-[#16A34A]",
    date: "December 15, 2025",
    time: "2:15 PM",
    doctor: "Dr. Chen",
    description:
      "Follow-up for hypertension management. BP well controlled on current medication (Lisinopril 10mg). Patient compliant with treatment...",
    status: "Completed",
    statusClass: "bg-[#ECFDF3] text-[#16A34A]",
  },
  {
    title: "Annual physical examination",
    risk: "LOW",
    riskClass: "bg-[#ECFDF3] text-[#16A34A]",
    date: "September 22, 2025",
    time: "9:00 AM",
    doctor: "Dr. Roberts",
    description:
      "Annual wellness visit. Patient reports feeling well overall. Discussed preventive care, updated vaccinations. Labs ordered for routine screening...",
    status: "Completed",
    statusClass: "bg-[#ECFDF3] text-[#16A34A]",
  },
];

const HistoryPage = () => {
  return (
    <section className="space-y-4 max-w-4xl">
      <PageHeader title="History" description="Visit Timeline"/>

      <div className="space-y-4">
        {timelineItems.map((item) => (
          <article
            key={item.title}
            className={`rounded-[10px] border bg-main px-5 py-4 shadow-xs ${
              item.isCurrent ? "border-button-color" : "border-border-color"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-medium text-title">{item.title}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${item.riskClass}`}>
                  {item.risk}
                </span>
                {item.isCurrent && (
                  <span className="rounded-full bg-[#E8F0FF] px-2.5 py-0.5 text-base font-medium text-button-color">
                    Current
                  </span>
                )}
              </div>

              <Link
                href={`/risk-alerts/${item.title}`}
                className="rounded-[10px] border border-border-color bg-[#F8F9FB] px-3 py-1.5 text-base text-title transition hover:bg-[#EDF1F7]"
              >
                View Details
              </Link>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-base text-description">
              <span>{item.date}</span>
              <span>•</span>
              <span>{item.time}</span>
              <span>•</span>
              <span>{item.doctor}</span>
            </div>

            <p className="mt-3 max-w-[98%] text-base leading-[1.45] text-description">{item.description}</p>

            <div className="mt-4 border-t border-border-color pt-3">
              <span className={`rounded-full px-3 py-1 text-base ${item.statusClass}`}>
                {item.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HistoryPage;
