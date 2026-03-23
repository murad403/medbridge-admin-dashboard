"use client";

import React from "react";

type SummaryItem = {
  area: string;
  duration: string;
  severity: string;
  severityClass: string;
};

type BodyMapSummaryCardProps = {
  items: SummaryItem[];
};

const BodyMapSummaryCard = ({ items }: BodyMapSummaryCardProps) => {
  return (
    <article className="rounded-[14px] border border-border-color bg-main p-4 shadow-xs">
      <h3 className="text-base font-semibold text-title">Body Map Summary</h3>
      <p className="mt-1 text-xs text-description">Areas highlighted by patient</p>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.area} className="rounded-lg border border-[#EEF2F6] bg-[#F9FAFB] px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-title">{item.area}</p>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.severityClass}`}>
                {item.severity}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-description">{item.duration}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default BodyMapSummaryCard;
