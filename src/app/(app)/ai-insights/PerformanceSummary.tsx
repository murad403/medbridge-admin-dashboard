import React from "react";

const rows = [
  { label: "Notes Auto-Drafted", value: 247, width: "100%", color: "bg-button-color" },
  { label: "Drafts Accepted", value: 232, width: "94%", color: "bg-[#16A34A]" },
  { label: "Drafts Edited", value: 15, width: "15%", color: "bg-[#F59E0B]" },
  { label: "Drafts Regenerated", value: 8, width: "8%", color: "bg-[#6B7280]" },
];

const PerformanceSummary = () => {
  return (
    <section className="rounded-[10px] border border-border-color bg-main p-4 shadow-xs sm:p-5">
      <h2 className="text-xl font-medium text-title">Performance Summary</h2>

      <div className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="space-y-1.5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <p className="text-description">{row.label}</p>
              <p className="font-medium text-title">{row.value}</p>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#ECEEF2]">
              <div className={`h-full rounded-full ${row.color}`} style={{ width: row.width }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PerformanceSummary;
