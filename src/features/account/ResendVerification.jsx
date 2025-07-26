import { useState } from 'react';
import api from '../../utils/axios';

function ResendVerification({ email, onSuccess, className = '' }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleResend = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/users/resend-verification', { email });
      setSuccess('Verification email sent! Please check your inbox.');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleResend}
        disabled={loading}
        className="text-blue-400 hover:underline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Resend verification email'}
      </button>
      {success && <div className="text-green-400 text-xs mt-1">{success}</div>}
      {error && <div className="text-red-400 text-xs mt-1">{error}</div>}
    </div>
  );
}

export default ResendVerification; 