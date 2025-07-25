import { useEffect, useState } from 'react';
import api from '../../utils/axios';

function CategorySidebar({ onCategorySelect, selectedCategoryId }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [manageMode, setManageMode] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#888888');
  const [error, setError] = useState('');
  const [collapsed, setCollapsed] = useState(true);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
    setLoading(true);
      setError('');
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        setError('Could not load categories');
      } finally {
      setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Create category
  const handleCreate = async () => {
    if (!newName.trim()) return;
    setError('');
    try {
      const res = await api.post('/categories', { name: newName, color: newColor });
      setCategories(cats => [...cats, res.data]);
    setShowCreate(false);
    setNewName('');
    setNewColor('#888888');
    } catch (err) {
      setError('Could not create category');
    }
  };

  // Update category (placeholder, needs modal/form)
  const handleUpdate = async (cat) => {
    const newCatName = prompt('Edit category name:', cat.name);
    if (!newCatName) return;
    try {
      const res = await api.put(`/categories/${cat.id}`, { name: newCatName, color: cat.color });
      setCategories(cats => cats.map(c => c.id === cat.id ? res.data : c));
    } catch (err) {
      setError('Could not update category');
    }
  };

  // Delete category (with confirmation)
  const handleDelete = async (cat) => {
    if (!window.confirm(`Delete category '${cat.name}'? This will not delete your records, but the category will be removed.`)) return;
    setError('');
    try {
      await api.delete(`/categories/${cat.id}`);
      setCategories(cats => cats.filter(c => c.id !== cat.id));
    } catch (err) {
      setError('Could not delete category');
    }
  };

  return (
    <aside className="w-full md:w-[340px] bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg p-6 mb-4 md:mb-0 md:mr-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl text-gray-100">Categories</h3>
        <button
          onClick={() => setCollapsed(c => !c)}
          className="px-2 py-1 rounded bg-gray-700 text-gray-100 hover:bg-gray-600 transition text-xs font-semibold"
          aria-label={collapsed ? 'Expand categories' : 'Collapse categories'}
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
      {!collapsed && <>
        <button onClick={() => setManageMode(m => !m)} className="button-small mb-4 px-3 py-1 bg-gray-700 text-gray-100 rounded hover:bg-gray-600 transition">
          {manageMode ? 'Done' : 'Manage'}
        </button>
        <ul className="list-none p-0 m-0">
          {categories.map(cat => (
            <li
              key={cat.id}
              style={{ color: cat.color }}
              className={`mb-4 px-3 py-2 rounded cursor-pointer ${selectedCategoryId === cat.id ? 'bg-blue-900/40 font-bold' : 'hover:bg-gray-900/40'} flex items-center justify-between`}
              onClick={() => onCategorySelect && onCategorySelect(cat.id)}
            >
              <span>{cat.name}</span>
              {manageMode && (
                <span className="flex gap-2 ml-2">
                  <button className="button-small px-2 py-1 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 transition" onClick={e => { e.stopPropagation(); handleUpdate(cat); }}>Update</button>
                  <button className="button-small px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition" onClick={e => { e.stopPropagation(); handleDelete(cat); }}>Delete</button>
                </span>
              )}
            </li>
          ))}
          <li>
            {!showCreate && (
              <button onClick={() => setShowCreate(true)} className="button-small mt-4 px-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition w-full">+ Create New Category</button>
            )}
            {showCreate && (
              <div className="mt-4 flex flex-col gap-3 bg-gray-900/80 border border-gray-700 p-3 rounded w-full max-w-full">
                <h3 className="font-semibold text-base text-gray-100">Create New Category</h3>
                <label className="font-medium text-gray-200" htmlFor="new-category-name">Category name</label>
                <input id="new-category-name" placeholder="Category name" value={newName} onChange={e => setNewName(e.target.value)} className="border border-gray-700 bg-gray-800/80 text-gray-100 rounded px-2 py-1 w-full max-w-full focus:ring-2 focus:ring-blue-600" />
                <div className="flex flex-wrap items-center gap-3">
                  <label htmlFor="new-category-color" className="font-medium text-gray-200">Color</label>
                  <input id="new-category-color" type="color" value={newColor} onChange={e => setNewColor(e.target.value)} className="w-10 h-10 p-0 border-0 rounded" />
                  <button onClick={handleCreate} className="button-small px-2 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition">Create</button>
                  <button onClick={() => setShowCreate(false)} className="button-small px-2 py-1 bg-gray-700 text-gray-100 rounded hover:bg-gray-600 transition">Cancel</button>
                </div>
              </div>
            )}
          </li>
        </ul>
        {loading && <div className="text-sm text-gray-400 mt-4">Loading...</div>}
        {error && <div className="text-red-400 mt-4">{error}</div>}
      </>}
    </aside>
  );
}

export default CategorySidebar; 