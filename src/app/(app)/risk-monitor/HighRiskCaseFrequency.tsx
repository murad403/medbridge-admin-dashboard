const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
const values = [145, 168, 152, 188, 178, 198];
const yTicks = [0, 55, 110, 165, 220];

const HighRiskCaseFrequency = () => {
  const width = 760;
  const height = 430;
  const left = 70;
  const right = 20;
  const top = 24;
  const bottom = 52;

  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const maxY = 220;

  const points = values.map((value, index) => {
    const x = left + (index * chartWidth) / (values.length - 1);
    const y = top + ((maxY - value) / maxY) * chartHeight;
    return { x, y, label: months[index], value };
  });

  const linePath = points.reduce((acc, point, index, arr) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const prev = arr[index - 1];
    const controlX = (prev.x + point.x) / 2;
    return `${acc} C ${controlX} ${prev.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  return (
    <section className="rounded-[10px] border border-border-color bg-main p-4 md:p-6">
      <h2 className="text-base leading-[1.2] font-semibold text-title md:text-xl">High-Risk Case Frequency</h2>
      <p className="mt-2 text-base text-description">Monthly trend over last 6 months</p>

      <div className="mt-5 w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[390px] min-w-[650px] w-full"
          role="img"
          aria-label="High-risk case monthly trend over the last 6 months"
        >
          {yTicks.map((tick) => {
            const y = top + ((maxY - tick) / maxY) * chartHeight;
            return (
              <line
                key={`yt-${tick}`}
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
              key={`xt-${point.label}`}
              x1={point.x}
              y1={top}
              x2={point.x}
              y2={height - bottom}
              stroke="#E5E7EB"
              strokeDasharray="5 5"
            />
          ))}

          <line x1={left} y1={top} x2={left} y2={height - bottom} stroke="#71717A" strokeWidth="1.5" />
          <line
            x1={left}
            y1={height - bottom}
            x2={width - right}
            y2={height - bottom}
            stroke="#71717A"
            strokeWidth="1.5"
          />

          <path d={linePath} fill="none" stroke="#E32929" strokeWidth="3" />

          {points.map((point) => (
            <circle key={`dot-${point.label}`} cx={point.x} cy={point.y} r="6" fill="#E32929" />
          ))}

          {yTicks.map((tick) => {
            const y = top + ((maxY - tick) / maxY) * chartHeight;
            return (
              <text
                key={`yl-${tick}`}
                x={left - 10}
                y={y + 5}
                textAnchor="end"
                fontSize="10"
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
              y={height - bottom + 30}
              textAnchor="middle"
              fontSize="10"
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

export default HighRiskCaseFrequency;
