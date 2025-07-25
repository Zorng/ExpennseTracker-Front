import { useEffect, useState } from 'react';
import api from '../../utils/axios';

function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function RecordForm({ onSubmit, onCancel, initialData = {}, compact = false }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [amount, setAmount] = useState(initialData.amount || '');
  const [currency, setCurrency] = useState(initialData.currency || 'USD');
  const [categoryId, setCategoryId] = useState(initialData.categoryId || initialData.Category?.id || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [date, setDate] = useState(initialData.date ? initialData.date.slice(0, 10) : getToday());
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatColor, setNewCatColor] = useState('#888888');
  const [error, setError] = useState('');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [showCreateCategory]); // refetch after creating new category

  // Inline create category
  const handleCreateCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      const res = await api.post('/categories', { name: newCatName, color: newCatColor });
      setCategories(cats => [...cats, res.data]);
      setCategoryId(res.data.id);
      setShowCreateCategory(false);
      setNewCatName('');
      setNewCatColor('#888888');
    } catch {
      setError('Could not create category');
    }
  };

  const handleSubmit = (e) => {
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
    if (categoryId === '__create__') {
      setError('Please finish creating the new category or select another');
      return;
    }
    let categoryName = '';
    if (categoryId) {
      const cat = categories.find(c => String(c.id) === String(categoryId));
      if (cat) categoryName = cat.name;
    }
    console.log('DEBUG categoryId:', categoryId, 'categories:', categories, 'categoryName:', categoryName);
    const data = {
      title,
      amount: Number(amount),
      currency,
      category: categoryName || null,
      description,
      date,
    };
    onSubmit && onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col ${compact ? 'gap-2' : 'gap-4'}`}>
      <div className={`flex flex-col ${compact ? 'gap-0.5' : 'gap-1'}`}>
        <label className="font-medium mb-0.5">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium">Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium">Currency</label>
        <select value={currency} onChange={e => setCurrency(e.target.value)} className="border rounded px-3 py-2">
          <option value="USD">USD</option>
          <option value="KHR">KHR</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium">Amount</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required min="0" step="0.01" className="border rounded px-3 py-2" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium">Category</label>
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="border rounded px-3 py-2">
          <option value="">Uncategorized</option>
          <option value="__create__">+ Create New Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {categoryId === '__create__' && (
          <div className="mt-2 flex flex-col gap-2 bg-gray-100 p-2 rounded max-h-48 overflow-y-auto">
            <h4 className="font-semibold">Create New Category</h4>
            <label className="font-medium" htmlFor="new-category-name">Category name</label>
            <input id="new-category-name" placeholder="Category name" value={newCatName} onChange={e => setNewCatName(e.target.value)} className="border rounded px-2 py-1" />
            <div className="flex items-center gap-2">
              <label htmlFor="new-category-color" className="font-medium">Color</label>
              <input id="new-category-color" type="color" value={newCatColor} onChange={e => setNewCatColor(e.target.value)} className="w-12 h-12 p-0 border-0 rounded" />
              <button type="button" onClick={handleCreateCategory} className="button-small px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">Create</button>
              <button type="button" onClick={() => { setShowCreateCategory(false); setCategoryId(''); }} className="button-small px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition">Cancel</button>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="border rounded px-3 py-2" rows={2} />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {initialData.id ? 'Update' : loading ? 'Loading...' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancel</button>
      </div>
    </form>
  );
}

export default RecordForm;