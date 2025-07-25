import { useEffect, useState } from 'react';
import api from '../../utils/axios';

const USD_TO_KHR = 4000;

export default function useDashboardAverages(currency) {
  const [averages, setAverages] = useState([]); // [{ month, value }]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAverages = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/summary/recent-average');
        setAverages(
          (res.data.recentMonths || []).map(avg => {
            let usd = avg.averagePerDay?.USD;
            let khr = avg.averagePerDay?.KHR;
            let value;
            if (currency === 'USD') {
              if (usd != null) {
                value = usd;
              } else if (khr != null) {
                value = Number(khr) / USD_TO_KHR;
              } else {
                value = 0;
              }
            } else {
              if (khr != null) {
                value = khr;
              } else if (usd != null) {
                value = Number(usd) * USD_TO_KHR;
              } else {
                value = 0;
              }
            }
            return {
              month: avg.monthName,
              value,
            };
          })
        );
      } catch {
        setError('Could not load averages');
        setAverages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAverages();
    // eslint-disable-next-line
  }, [currency]);

  return { averages, loading, error };
} 