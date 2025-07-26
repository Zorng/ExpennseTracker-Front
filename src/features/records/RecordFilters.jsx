import { useState, useEffect } from 'react';

function RecordFilters({
  categories = [],
  initialFilters = {},
  onApply,
  clearFilters
}) {
  const [collapsed, setCollapsed] = useState(true);
  const [categoryId, setCategoryId] = useState(initialFilters.categoryId || '');
  const [minAmount, setMinAmount] = useState(initialFilters.minAmount || '');
  const [maxAmount, setMaxAmount] = useState(initialFilters.maxAmount || '');
  const [startDate, setStartDate] = useState(initialFilters.startDate || '');
  const [endDate, setEndDate] = useState(initialFilters.endDate || '');
  const [amountCurrency, setAmountCurrency] = useState(initialFilters.amountCurrency || 'USD');

  // If initialFilters change (e.g. after clear), update local state
  useEffect(() => {
    setCategoryId(initialFilters.categoryId || '');
    setMinAmount(initialFilters.minAmount || '');
    setMaxAmount(initialFilters.maxAmount || '');
    setStartDate(initialFilters.startDate || '');
    setEndDate(initialFilters.endDate || '');
    setAmountCurrency(initialFilters.amountCurrency || 'USD');
  }, [initialFilters]);

  const handleApply = () => {
    onApply && onApply({ categoryId, minAmount, maxAmount, startDate, endDate, amountCurrency });
  };

  return (
    <div className="mb-4 p-4 bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-lg flex flex-col gap-4 w-full md:w-[340px]">
      <div className="flex flex-col items-end mb-2">
        <div className="flex items-center w-full justify-between">
          <h3 className="font-bold text-lg text-gray-100">Filters</h3>
          <button
            onClick={() => setCollapsed(c => !c)}
            className="px-2 py-1 rounded bg-gray-700 text-gray-100 hover:bg-gray-600 transition text-xs font-semibold"
            aria-label={collapsed ? 'Expand filters' : 'Collapse filters'}
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>
        {collapsed && (
          <span className="text-xs text-gray-400 mt-2">expand to see more</span>
        )}
      </div>
      {!collapsed && <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="font-medium mb-1 text-gray-200">Category</label>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="border border-gray-700 bg-gray-900/80 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-blue-600">
            <option value="">All</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1 text-gray-200">Amount Currency</label>
          <select value={amountCurrency} onChange={e => setAmountCurrency(e.target.value)} className="border border-gray-700 bg-gray-900/80 text-gray-100 rounded px-2 py-1 text-sm w-24 focus:ring-2 focus:ring-blue-600">
            <option value="USD">USD</option>
            <option value="KHR">KHR</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1 text-gray-200">Min Amount</label>
          <input type="number" value={minAmount} onChange={e => setMinAmount(e.target.value)} className="border border-gray-700 bg-gray-900/80 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-blue-600" placeholder="Min" min="0" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1 text-gray-200">Max Amount</label>
          <input type="number" value={maxAmount} onChange={e => setMaxAmount(e.target.value)} className="border border-gray-700 bg-gray-900/80 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-blue-600" placeholder="Max" min="0" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1 text-gray-200">Start Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border border-gray-700 bg-gray-900/80 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-blue-600" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1 text-gray-200">End Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border border-gray-700 bg-gray-900/80 text-gray-100 rounded px-3 py-2 focus:ring-2 focus:ring-blue-600" />
        </div>
        <button onClick={clearFilters} className="ml-2 px-3 py-2 bg-gray-700 text-gray-100 rounded hover:bg-gray-600 transition">Clear Filters</button>
        <button onClick={handleApply} className="ml-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Apply Filter</button>
      </div>}
    </div>
  );
}

export default RecordFilters; 