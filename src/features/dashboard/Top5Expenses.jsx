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
        const res = await api.get('/summary/top5', { params: { currency } });
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
    if (displayCurrency === 'USD') {
      return `$${Number(record.amount).toFixed(2)}`;
    } else if (displayCurrency === 'KHR') {
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
        <ul className="list-none p-0 m-0 divide-y divide-gray-700">
          {records.map((rec) => (
            <li key={rec.id} className="flex items-center gap-4 py-3">
              <span className="flex-1 text-gray-100 font-medium" title={rec.title}>{truncateTitle(rec.title)}</span>
              <span className="w-32 text-right font-bold text-gray-100 font-mono tabular-nums" title={`Original: ${rec.originalAmount} ${rec.originalCurrency}`}>
                {getDisplayAmount(rec)}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: rec.categoryColor || '#888' }}></span>
                <span className="text-sm font-semibold" style={{ color: rec.categoryColor || '#888' }} title={rec.categoryName}>{truncateCategory(rec.categoryName)}</span>
              </span>
              <span className="w-24 text-xs text-gray-400 text-right">{formatDate(rec.date)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Top5Expenses; 