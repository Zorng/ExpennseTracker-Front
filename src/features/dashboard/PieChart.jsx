function PieChart({ data, size = 140 }) {
  // data: [{ name, value, color }]
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
  const radius = size * 0.43; // 60 for 140, 86 for 200
  const innerRadius = size * 0.257; // 36 for 140, 51 for 200
  const cx = size / 2, cy = size / 2;
  const gapAngle = 0.04; // radians, ~2.3 degrees
  return (
    <svg width={size} height={size}>
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {data.map((d, i) => {
        // Shrink each arc by gapAngle on both sides
        const rawStart = (cumulative / total) * 2 * Math.PI;
        const rawEnd = ((cumulative + d.value) / total) * 2 * Math.PI;
        const arcLength = rawEnd - rawStart;
        const startAngle = rawStart + (arcLength > gapAngle ? gapAngle / 2 : 0);
        const endAngle = rawEnd - (arcLength > gapAngle ? gapAngle / 2 : 0);
        const x1 = cx + radius * Math.sin(startAngle);
        const y1 = cy - radius * Math.cos(startAngle);
        const x2 = cx + radius * Math.sin(endAngle);
        const y2 = cy - radius * Math.cos(endAngle);
        const x1i = cx + innerRadius * Math.sin(startAngle);
        const y1i = cy - innerRadius * Math.cos(startAngle);
        const x2i = cx + innerRadius * Math.sin(endAngle);
        const y2i = cy - innerRadius * Math.cos(endAngle);
        const largeArc = (endAngle - startAngle) > Math.PI ? 1 : 0;
        const pathData = [
          `M${x1},${y1}`,
          `A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2}`,
          `L${x2i},${y2i}`,
          `A${innerRadius},${innerRadius} 0 ${largeArc} 0 ${x1i},${y1i}`,
          'Z',
        ].join(' ');
        cumulative += d.value;
        return (
          <g key={d.name}>
            <path d={pathData} fill={d.color} filter="url(#glow)" />
          </g>
        );
      })}
      {/* Center circle for donut effect (now transparent) */}
      <circle cx={cx} cy={cy} r={innerRadius - 1} fill="transparent" />
    </svg>
  );
}

export default PieChart; 