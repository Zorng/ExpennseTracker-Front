import { useEffect, useState } from 'react';
import api from '../../utils/axios';

function Top5Expenses({ currency }) {
  const [records, setRecords] = useState([]);
  const [displayCurrency, setDisplayCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTop5 = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/summary/top5', { params: { displayCurrency: currency } });
        setRecords(res.data.top5Expenses || []);
        setDisplayCurrency(res.data.displayCurrency || 'USD');
      } catch {
        setError('Could not load top expenses');
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTop5();
  }, [currency]);

  // Format amount for display
  const getDisplayAmount = (record) => {
    // Use the currency prop to determine display format
    if (currency === 'USD') {
      return `$${Number(record.amount).toFixed(2)}`;
    } else if (currency === 'KHR') {
      return `${Number(record.amount).toLocaleString()}៛`;
    }
    return record.amount;
  };

  // Truncate title to 8 characters with ...
  const truncateTitle = (title) => {
    if (title.length > 8) {
      return title.slice(0, 8) + '...';
    }
    return title;
  };
  // Truncate category name to 8 characters with ...
  const truncateCategory = (name) => {
    if (name.length > 8) {
      return name.slice(0, 8) + '...';
    }
    return name;
  };

  // Format date to MM-DD
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${month}-${day}`;
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg p-6 mt-8">
      <h3 className="text-lg font-bold mb-4 text-gray-100">Top 5 Expenses (Last 3 Months)</h3>
      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : records.length === 0 ? (
        <div className="text-gray-400">No data available.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-gray-100">
            <thead className="bg-gray-900/80">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Title</th>
                <th className="px-4 py-2 text-right font-semibold">Amount</th>
                <th className="px-4 py-2 text-left font-semibold">Category</th>
                <th className="px-4 py-2 text-right font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id} className="border-b border-gray-700 last:border-b-0">
                  <td className="px-4 py-2 whitespace-nowrap" title={rec.title}>{truncateTitle(rec.title)}</td>
                  <td className="px-4 py-2 text-right font-bold font-mono tabular-nums" title={`Original: ${rec.originalAmount} ${rec.originalCurrency}`}>{getDisplayAmount(rec)}</td>
                  <td className="px-4 py-2 whitespace-nowrap flex items-center gap-2" style={{ color: rec.categoryColor || '#888' }}>
                    <span className="w-3 h-3 rounded-full inline-block" style={{ background: rec.categoryColor || '#888' }}></span>
                    <span className="text-sm font-semibold" title={rec.categoryName}>{truncateCategory(rec.categoryName)}</span>
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-400 text-right whitespace-nowrap">{formatDate(rec.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Top5Expenses; 