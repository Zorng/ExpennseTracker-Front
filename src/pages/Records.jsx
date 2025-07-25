import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySidebar from '../features/categories/CategorySidebar';
import RecordTable from '../features/records/RecordTable';
import Pagination from '../features/records/Pagination';
import CurrencyToggle from '../features/dashboard/CurrencyToggle';
import useRecords from '../features/records/useRecords';
import api from '../utils/axios';
import RecordFilters from '../features/records/RecordFilters';

function Records() {
  const navigate = useNavigate();
  const [currencyMode, setCurrencyMode] = useState('default');

  // Filter state
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [amountCurrency, setAmountCurrency] = useState('USD');

  // Fetch categories for filter dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // useRecords with filters
  const {
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
    setFilters
  } = useRecords(10, { categoryId, minAmount, maxAmount, startDate, endDate, amountCurrency });

  // Update filters in useRecords when any filter changes
  useEffect(() => {
    setPage(1);
    setFilters({ categoryId, minAmount, maxAmount, startDate, endDate, amountCurrency });
    // eslint-disable-next-line
  }, [categoryId, minAmount, maxAmount, startDate, endDate, amountCurrency]);

  // Currency conversion logic
  const displayAmount = (record) => {
    if (currencyMode === 'default') {
      if (record.currency === 'USD') return `$${Number(record.amount).toFixed(2)}`;
      if (record.currency === 'KHR') return `${Number(record.amount).toLocaleString()}៛`;
    } else if (currencyMode === 'USD') {
      const usd = record.currency === 'USD' ? Number(record.amount) : Number(record.amount) / 4000;
      return `$${usd.toFixed(2)}`;
    } else if (currencyMode === 'KHR') {
      const khr = record.currency === 'KHR' ? Number(record.amount) : Number(record.amount) * 4000;
      return `${khr.toLocaleString()}៛`;
    }
    return '';
  };

  // Create or update record
  const handleFormSubmit = async (data) => {
    try {
      if (editTx) {
        await update(editTx.id, data);
      } else {
        await create(data);
      }
      setShowForm(false);
      setEditTx(null);
      refresh();
    } catch {
      alert('Could not save record');
    }
  };

  // Edit record
  const handleEdit = (tx) => {
    navigate(`/records/${tx.id}/edit`);
  };

  // Delete record
  const handleDelete = async (tx) => {
    if (!window.confirm(`Delete record '${tx.title}'? This action cannot be undone.`)) return;
    try {
      await remove(tx.id);
      refresh();
    } catch {
      alert('Could not delete record');
    }
  };

  // Modal close
  const handleCloseForm = () => {
    setShowForm(false);
    setEditTx(null);
  };

  // Filter UI
  const clearFilters = () => {
    setCategoryId('');
    setMinAmount('');
    setMaxAmount('');
    setStartDate('');
    setEndDate('');
    setAmountCurrency('USD');
  };

  return (
    <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-8 w-full">
      {/* Sidebar Section */}
      <div className="flex flex-col gap-6 md:min-w-[300px] md:w-[340px] md:mr-8 mb-4 md:mb-0">
        <div className="hidden md:block">
          <RecordFilters
            categories={categories}
            categoryId={categoryId} setCategoryId={setCategoryId}
            minAmount={minAmount} setMinAmount={setMinAmount}
            maxAmount={maxAmount} setMaxAmount={setMaxAmount}
            startDate={startDate} setStartDate={setStartDate}
            endDate={endDate} setEndDate={setEndDate}
            amountCurrency={amountCurrency} setAmountCurrency={setAmountCurrency}
            clearFilters={clearFilters}
          />
        </div>
        <CategorySidebar />
      </div>
      {/* Main Records Section */}
      <main className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-gray-100">Records</h2>
        {/* Filter Controls (mobile only) */}
        <div className="md:hidden mb-4">
          <RecordFilters
            categories={categories}
            categoryId={categoryId} setCategoryId={setCategoryId}
            minAmount={minAmount} setMinAmount={setMinAmount}
            maxAmount={maxAmount} setMaxAmount={setMaxAmount}
            startDate={startDate} setStartDate={setStartDate}
            endDate={endDate} setEndDate={setEndDate}
            amountCurrency={amountCurrency} setAmountCurrency={setAmountCurrency}
            clearFilters={clearFilters}
          />
        </div>
        {/* Currency Toggle */}
        <div className="mb-4 flex items-center gap-2">
          <span className="font-medium text-gray-200">Display currency:</span>
          <CurrencyToggle currency={currencyMode} onChange={setCurrencyMode} />
        </div>
        <button
          onClick={() => navigate('/records/create')}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Create Record
        </button>
        {/* Remove RecordModal */}
        {loading && <div className="text-gray-300">Loading...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {!loading && !error && records.length === 0 && (
          <div className="text-center text-gray-400 my-8">No records found</div>
        )}
        {!loading && !error && records.length > 0 && (
          <>
            <RecordTable
              records={records}
              displayAmount={displayAmount}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default Records; 