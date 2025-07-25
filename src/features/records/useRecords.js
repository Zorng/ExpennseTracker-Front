import { useEffect, useState, useCallback } from 'react';
import api from '../../utils/axios';

export default function useRecords(pageSize = 10, filters = {}) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilters, setActiveFilters] = useState(filters);

  const fetchRecords = useCallback(async (pageOverride, filtersOverride) => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page: pageOverride || page,
        pageSize,
        ...activeFilters,
        ...filtersOverride,
      };
      // Remove empty filter values
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] == null) delete params[key];
      });
      const res = await api.get('/records', { params });
      setRecords(res.data.data || []);
      setTotalPages(res.data.meta?.totalPages || 1);
    } catch (err) {
      setError('Could not load records');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, activeFilters]);

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line
  }, [page, pageSize, activeFilters]);

  // Allow parent to update filters
  const setFilters = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const create = async (data) => {
    await api.post('/records', data);
    setPage(1);
    fetchRecords(1);
  };

  const update = async (id, data) => {
    await api.put(`/records/${id}`, data);
    fetchRecords();
  };

  const remove = async (id) => {
    await api.delete(`/records/${id}`);
    fetchRecords();
  };

  const refresh = () => fetchRecords();

  return {
    records,
    loading,
    error,
    page,
    totalPages,
    setPage,
    create,
    update,
    remove,
    refresh,
    setFilters,
  };
} 