import { useEffect, useState } from 'react';
import api from '../../utils/axios';

const USD_TO_KHR = 4000;

export default function useDashboardSummary(year, month, currency) {
  const [totalExpense, setTotalExpense] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/summary/monthly', { params: { year, month } });
        const summary = res.data.summary;
        setTotalExpense(summary && summary.totalExpenses ? {
          usd: summary.totalExpenses.USD,
          khr: summary.totalExpenses.KHR
        } : null);
        setCategories(
          (res.data.categoryBreakdown || []).map(cat => {
            let value = 0;
            if (currency === 'USD') {
              // If already USD, use as is; if KHR, convert to USD
              value = (Number(cat.totalUSD) || 0) + ((Number(cat.totalKHR) || 0) / USD_TO_KHR);
            } else {
              // If already KHR, use as is; if USD, convert to KHR
              value = (Number(cat.totalKHR) || 0) + ((Number(cat.totalUSD) || 0) * USD_TO_KHR);
            }
            return {
              name: cat.categoryName,
              value,
              color: cat.categoryColor || '#888888',
            };
          })
        );
      } catch {
        setError('Could not load summary');
        setTotalExpense(null);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
    // eslint-disable-next-line
  }, [year, month, currency]);

  return { totalExpense, categories, loading, error };
} 