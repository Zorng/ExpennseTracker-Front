import { useState } from 'react';
import api from '../../utils/axios';

function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.put('/users/me/password', {
        currentPassword,
        newPassword,
      });
      setSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-1">
        <label className="font-medium">Current Password</label>
        <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium">New Password</label>
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium">Confirm New Password</label>
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      {success && <div className="text-green-600 text-sm text-center">{success}</div>}
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-60 mt-2">{loading ? 'Updating...' : 'Update Password'}</button>
    </form>
  );
}

export default UpdatePassword; 