import { useState } from 'react';
import api from '../../utils/axios';
import { useAuth } from '../../AuthContext';

function DeleteAccount() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const handleDelete = async () => {
    setError('');
    setLoading(true);
    try {
      await api.delete('/users/me');
      logout();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="w-full bg-red-600 text-white rounded py-2 font-semibold hover:bg-red-700 transition mb-2" onClick={() => setShowConfirm(true)} disabled={loading}>
        Delete Account
      </button>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-2 text-center">
            <h4 className="text-2xl font-bold text-red-600 mb-4">Are you sure you want to delete your account?</h4>
            <p className="mb-6 text-gray-700">This action is <span className="font-semibold">irreversible</span> and will remove all your data.</p>
            {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
            <div className="flex flex-col gap-3">
              <button className="w-full bg-red-600 text-white rounded py-2 font-semibold hover:bg-red-700 transition" onClick={handleDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Yes, delete my account'}
              </button>
              <button className="w-full bg-gray-300 rounded py-2 font-semibold hover:bg-gray-400 transition" onClick={() => setShowConfirm(false)} disabled={loading}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount; 