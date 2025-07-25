import { useState } from 'react';
import api from '../../utils/axios';

function UpdateEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !password) {
      setError('Email and current password are required');
      return;
    }
    setLoading(true);
    try {
      await api.put('/users/me/email', { email, password });
      setSuccess('Email updated successfully!');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-1">
        <label className="font-medium">New Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium">Current Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      {success && <div className="text-green-600 text-sm text-center">{success}</div>}
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-60 mt-2">{loading ? 'Updating...' : 'Update Email'}</button>
    </form>
  );
}

export default UpdateEmail; 