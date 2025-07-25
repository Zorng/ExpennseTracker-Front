function MonthYearSelector({ month, year, onMonthChange, onYearChange }) {
  const now = new Date();
  return (
    <>
      <select value={month} onChange={e => onMonthChange(Number(e.target.value))}>
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
        ))}
      </select>
      <select value={year} onChange={e => onYearChange(Number(e.target.value))}>
        {[now.getFullYear() - 1, now.getFullYear(), now.getFullYear() + 1].map(y => <option key={y} value={y}>{y}</option>)}
      </select>
    </>
  );
}

export default MonthYearSelector; 