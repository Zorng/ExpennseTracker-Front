import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import ResendVerification from '../features/account/ResendVerification';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showResend, setShowResend] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShowResend(false);
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    try {
      const res = await api.post('/users/login', { email, password });
      login(res.data.token, res.data.user);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      
      // Check if the response indicates unverified email
      if (err.response?.data?.needsVerification) {
        setShowResend(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="max-w-sm w-full mx-auto p-8 bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg flex flex-col gap-5">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-100">Login</h2>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-200">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="border border-gray-700 bg-gray-900/80 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-200">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="border border-gray-700 bg-gray-900/80 text-gray-100 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 pr-16"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-400 hover:underline focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition">Login</button>
        
        {showResend && (
          <div className="text-center">
            <p className="text-gray-300 text-sm mb-3">Need to verify your email?</p>
            <ResendVerification email={email} />
          </div>
        )}
        
        <div className="text-center text-sm mt-2 space-y-2">
          <div>
            <Link to="/forgot-password" className="text-blue-400 hover:underline">Forgot password?</Link>
          </div>
          <div>
            <Link to="/register" className="text-blue-400 hover:underline">Don't have an account? Register</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login; 