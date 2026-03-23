import React from "react";

const data = [
  { label: "Chest Pain", value: 12 },
  { label: "Headache", value: 18 },
  { label: "Cough", value: 24 },
  { label: "Back Pain", value: 15 },
  { label: "Fever", value: 10 },
  { label: "Joint Pain", value: 8 },
];

const MostCommonSymptoms = () => {
  const maxValue = 24;
  const yTicks = [24, 18, 12, 6, 0];
  const plotHeight = 320;

  return (
    <section className="rounded-[10px] border border-border-color bg-main p-4 shadow-xs sm:p-6">
      <h2 className="text-2xl font-medium text-title">Most Common Symptoms</h2>
      <p className="text-sm text-description">Last 30 days</p>

      <div className="mt-6 grid grid-cols-[42px_1fr] gap-3">
        <div className="flex flex-col justify-between text-xs text-description sm:text-sm" style={{ height: plotHeight }}>
          {yTicks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        <div className="relative pl-3 pr-2" style={{ height: plotHeight + 36 }}>
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

          <div className="relative z-10 flex items-end gap-3 sm:gap-5" style={{ height: plotHeight }}>
            {data.map((item) => (
              <div key={item.label} className="relative flex h-full min-w-0 flex-1 items-end justify-center">
                <div
                  className="w-full rounded-t-[8px] bg-button-color"
                  style={{ height: `${(item.value / maxValue) * plotHeight}px` }}
                />
                <p className="absolute top-[calc(100%+8px)] text-center text-[10px] leading-tight text-description sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostCommonSymptoms;
