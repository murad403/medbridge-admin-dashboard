const chartItems = [
  { label: "Chest Pain", value: 350 },
  { label: "Shortness of Breath", value: 305 },
  { label: "Severe Headache", value: 186 },
  { label: "Abdominal Pain", value: 156 },
  { label: "Dizziness", value: 134 },
];

const xTicks = [0, 90, 180, 270, 360];

const MostFlaggedSymptoms = () => {
  const width = 760;
  const height = 430;
  const left = 150;
  const right = 20;
  const top = 24;
  const bottom = 52;

  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const rowHeight = chartHeight / chartItems.length;
  const barHeight = rowHeight * 0.72;
  const maxX = 360;

  return (
    <section className="rounded-[10px] border border-border-color bg-main p-4 md:p-6">
      <h2 className="text-base leading-[1.2] font-semibold text-title md:text-xl">Most Flagged Symptoms</h2>
      <p className="mt-2 text-base text-description">Top 5 risk indicators this month</p>

      <div className="mt-5 w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[390px] min-w-[650px] w-full"
          role="img"
          aria-label="Most flagged symptoms horizontal bar chart"
        >
          {xTicks.map((tick) => {
            const x = left + (tick / maxX) * chartWidth;
            return (
              <line
                key={`xt-${tick}`}
                x1={x}
                y1={top}
                x2={x}
                y2={height - bottom}
                stroke="#E5E7EB"
                strokeDasharray="5 5"
              />
            );
          })}

          {chartItems.map((_, index) => {
            const y = top + index * rowHeight + rowHeight / 2;
            return (
              <line
                key={`yt-${index}`}
                x1={left}
                y1={y}
                x2={width - right}
                y2={y}
                stroke="#E5E7EB"
                strokeDasharray="5 5"
              />
            );
          })}

          <line x1={left} y1={top} x2={left} y2={height - bottom} stroke="#71717A" strokeWidth="1.5" />
          <line
            x1={left}
            y1={height - bottom}
            x2={width - right}
            y2={height - bottom}
            stroke="#71717A"
            strokeWidth="1.5"
          />

          {chartItems.map((item, index) => {
            const barWidth = (item.value / maxX) * chartWidth;
            const y = top + index * rowHeight + (rowHeight - barHeight) / 2;
            return (
              <g key={item.label}>
                <rect x={left} y={y} width={barWidth} height={barHeight} rx="6" fill="#4F7BE8" />
                <text
                  x={left - 6}
                  y={y + barHeight / 2 + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#6B7280"
                >
                  {item.label}
                </text>
              </g>
            );
          })}

          {xTicks.map((tick) => {
            const x = left + (tick / maxX) * chartWidth;
            return (
              <text
                key={`xl-${tick}`}
                x={x}
                y={height - bottom + 30}
                textAnchor="middle"
                fontSize="10"
                fill="#6B7280"
              >
                {tick}
              </text>
            );
          })}
        </svg>
      </div>
    </section>
  );
};

export default MostFlaggedSymptoms;
