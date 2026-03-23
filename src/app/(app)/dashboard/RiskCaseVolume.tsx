const data = [
  { label: "Jan", value: 12 },
  { label: "Feb", value: 15 },
  { label: "Mar", value: 9 },
  { label: "Apr", value: 18 },
  { label: "May", value: 14 },
  { label: "Jun", value: 11 },
  { label: "Jul", value: 16 },
  { label: "Aug", value: 13 },
  { label: "Sep", value: 17 },
  { label: "Oct", value: 10 },
  { label: "Nov", value: 12 },
  { label: "Dec", value: 19 },
];

const yTicks = [0, 5, 10, 15, 20];

const RiskCaseVolume = () => {
  const width = 1200;
  const height = 320;
  const left = 56;
  const right = 16;
  const top = 24;
  const bottom = 46;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;

  const points = data.map((item, index) => {
    const x = left + (index * chartWidth) / (data.length - 1);
    const y = top + ((20 - item.value) / 20) * chartHeight;
    return { x, y, label: item.label };
  });

  const linePath = points.reduce((acc, point, index, arr) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = arr[index - 1];
    const controlX = (previous.x + point.x) / 2;
    return `${acc} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  return (
    <section className="rounded-[10px] border border-border-color bg-main p-4 md:p-6">
      <h2 className="text-base leading-[1.2] font-semibold text-title md:text-xl">
        Risk Case Volume (Last 12 Months)
      </h2>

      <div className="mt-4 w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-75 w-full"
          role="img"
          aria-label="Risk case volume for the last 12 months"
        >
          {yTicks.map((tick) => {
            const y = top + ((20 - tick) / 20) * chartHeight;
            return (
              <line
                key={`y-${tick}`}
                x1={left}
                y1={y}
                x2={width - right}
                y2={y}
                stroke="#E5E7EB"
                strokeDasharray="5 5"
              />
            );
          })}

          {points.map((point) => (
            <line
              key={`x-${point.label}`}
              x1={point.x}
              y1={top}
              x2={point.x}
              y2={height - bottom}
              stroke="#E5E7EB"
              strokeDasharray="5 5"
            />
          ))}

          <line x1={left} y1={top} x2={left} y2={height - bottom} stroke="#6B7280" />
          <line
            x1={left}
            y1={height - bottom}
            x2={width - right}
            y2={height - bottom}
            stroke="#6B7280"
          />

          <path d={linePath} fill="none" stroke="#2449B7" strokeWidth={2.5} />

          {points.map((point) => (
            <circle key={`dot-${point.label}`} cx={point.x} cy={point.y} r={4.8} fill="#2449B7" />
          ))}

          {yTicks.map((tick) => {
            const y = top + ((20 - tick) / 20) * chartHeight;
            return (
              <text
                key={`yl-${tick}`}
                x={left - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#6B7280"
              >
                {tick}
              </text>
            );
          })}

          {points.map((point) => (
            <text
              key={`xl-${point.label}`}
              x={point.x}
              y={height - bottom + 24}
              textAnchor="middle"
              fontSize="12"
              fill="#6B7280"
            >
              {point.label}
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
};

export default RiskCaseVolume;
