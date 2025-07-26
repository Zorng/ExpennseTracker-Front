import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../utils/axios';

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. Missing token.');
        return;
      }

      try {
        await api.post(`/users/verify-email?token=${token}`);
        setStatus('success');
        setMessage('Email verified successfully! You can now log in to your account.');
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed. The link may be invalid or expired.');
      }
    };

    verifyEmail();
  }, [token]);

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-sm w-full mx-auto p-8 bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg flex flex-col gap-5">
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-gray-100">Verifying Email</h2>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-300 text-sm">Please wait while we verify your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-green-400 text-4xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-100">Email Verified!</h2>
              <p className="text-green-400 text-sm mb-6">{message}</p>
              <button
                onClick={handleGoToLogin}
                className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
              >
                Go to Login
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-red-400 text-4xl mb-4">✗</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-100">Verification Failed</h2>
              <p className="text-red-400 text-sm mb-6">{message}</p>
              <div className="space-y-3">
                <button
                  onClick={handleGoToLogin}
                  className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
                >
                  Go to Login
                </button>
                <button
                  onClick={handleGoToRegister}
                  className="w-full bg-gray-600 text-white rounded py-2 font-semibold hover:bg-gray-700 transition"
                >
                  Register New Account
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailVerification; 