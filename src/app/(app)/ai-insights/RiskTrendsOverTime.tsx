import React from "react";

const monthData = [
  { month: "Sep", high: 2, medium: 8, low: 15 },
  { month: "Oct", high: 3, medium: 10, low: 18 },
  { month: "Nov", high: 1, medium: 12, low: 20 },
  { month: "Dec", high: 2, medium: 9, low: 22 },
  { month: "Jan", high: 4, medium: 11, low: 19 },
  { month: "Feb", high: 3, medium: 13, low: 21 },
];

const RiskTrendsOverTime = () => {
  const maxValue = 24;
  const yTicks = [24, 18, 12, 6, 0];
  const plotHeight = "clamp(220px, 48vw, 336px)";
  const chartContainerHeight = `calc(${plotHeight} + 36px)`;

  return (
    <section className="rounded-[10px] border border-border-color bg-main p-4 shadow-xs sm:p-6">
      <h2 className="text-2xl font-medium text-title">Risk Trends Over Time</h2>
      <p className="text-sm text-description">Patient risk levels by month</p>

      <div className="mt-6 overflow-x-auto">
        <div className="grid min-w-160 grid-cols-[42px_1fr] gap-3">
          <div className="flex flex-col justify-between text-xs text-description sm:text-sm" style={{ height: plotHeight }}>
            {yTicks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>

          <div className="relative pl-3 pr-2" style={{ height: chartContainerHeight }}>
            <div className="pointer-events-none absolute left-3 right-2 top-0 border-l border-b border-[#8A8A8A]" style={{ height: plotHeight }} />

            <div className="pointer-events-none absolute left-3 right-2 top-0" style={{ height: plotHeight }}>
              <div className="grid h-full grid-rows-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={`h-grid-${index}`} className="border-t border-dashed border-[#D6DCE6]" />
                ))}
              </div>

              <div className="absolute inset-0 grid grid-cols-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={`v-grid-${index}`} className="border-l border-dashed border-[#D6DCE6]" />
                ))}
              </div>
            </div>

            <div className="relative z-10 flex items-end justify-between gap-3" style={{ height: plotHeight }}>
              {monthData.map((item) => (
                <div key={item.month} className="relative flex h-full flex-1 items-end justify-center">
                  <div className="flex h-full items-end gap-1 sm:gap-1.5 lg:gap-2">
                    <div
                      className="w-4 rounded-t-[6px] bg-[#E52424] sm:w-3 lg:w-8"
                      style={{ height: `${(item.high / maxValue) * 100}%` }}
                    />
                    <div
                      className="w-4 rounded-t-[6px] bg-[#F59E0B] sm:w-3 lg:w-8"
                      style={{ height: `${(item.medium / maxValue) * 100}%` }}
                    />
                    <div
                      className="w-4 rounded-t-[6px] bg-[#16A34A] sm:w-3 lg:w-8"
                      style={{ height: `${(item.low / maxValue) * 100}%` }}
                    />
                  </div>
                  <p className="absolute top-[calc(100%+8px)] text-[10px] text-description sm:text-sm">{item.month}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskTrendsOverTime;
