import { useState } from 'react';
import api from '../utils/axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users/forgot-password', { email });
    } catch {}
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="max-w-sm w-full mx-auto p-8 bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg flex flex-col gap-5">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-100">Forgot Password</h2>
        {submitted ? (
          <div className="text-green-400 text-center">
            If an account exists for <span className="font-mono">{email}</span>, you’ll receive an email with instructions.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-200">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="border border-gray-700 bg-gray-900/80 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
            <button type="submit" className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword; 