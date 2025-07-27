import { useState, useEffect } from 'react';
import api from '../../utils/axios';

function QuickAddRecord({ onClose, onSuccess, currency: defaultCurrency }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [currency, setCurrency] = useState(defaultCurrency);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get today's date
  const getToday = () => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  };

  // Fetch categories
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title.trim() || !amount) {
      setError('Title and amount are required');
      return;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      setError('Amount must be a positive number');
      return;
    }

    setLoading(true);
    try {
      let categoryName = '';
      if (categoryId) {
        const cat = categories.find(c => String(c.id) === String(categoryId));
        if (cat) categoryName = cat.name;
      }

      const data = {
        title: title.trim(),
        amount: Number(amount),
        currency,
        category: categoryName || null,
        description: '',
        date: getToday(),
      };

      await api.post('/records', data);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create record');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-100">Quick Add Record</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition"
            disabled={loading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What did you spend on?"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-900/80 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Amount *
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-700 bg-gray-900/80 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-700 bg-gray-900/80 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={loading}
              >
                <option value="USD">USD</option>
                <option value="KHR">KHR</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-900/80 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={loading}
            >
              <option value="">Uncategorized</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition font-semibold"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Record'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-400 text-center">
          Press Enter to quickly add the record
        </div>
      </div>
    </div>
  );
}

export default QuickAddRecord; 