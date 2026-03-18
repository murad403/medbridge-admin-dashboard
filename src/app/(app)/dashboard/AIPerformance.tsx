import { BrainCircuit } from "lucide-react";

const metrics = [
  { label: "Draft Acceptance", value: "94%", width: "94%", color: "bg-[#16A34A]" },
  { label: "Time Saved", value: "3.2 hrs", width: "80%", color: "bg-button-color" },
  { label: "Risk Detection", value: "98%", width: "98%", color: "bg-[#16A34A]" },
];

const AIPerformance = () => {
  return (
    <section className="rounded-2xl border border-border-color bg-main p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex items-center gap-2">
        <BrainCircuit className="size-4 text-title" />
        <div>
          <h2 className="text-xl font-medium text-title">AI Performance</h2>
          <p className="text-sm text-description">Today&apos;s metrics</p>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-1.5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <p className="text-description">{metric.label}</p>
              <p className="font-medium text-title">{metric.value}</p>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-[#ECEEF2]">
              <div
                className={`h-full rounded-full ${metric.color}`}
                style={{ width: metric.width }}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full rounded-lg border border-border-color bg-[#F8F9FB] py-2.5 text-sm font-medium text-title transition hover:bg-gray-100">
        View Full Insights
      </button>
    </section>
  );
};

export default AIPerformance;
