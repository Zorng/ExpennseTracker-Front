import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!username || !email || !password) {
      setError('Username, email and password are required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      await api.post('/users/register', { username, email, password });
      setSuccess('Registration successful! Please check your email to verify your account before logging in.');
      setIsRegistered(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="max-w-sm w-full mx-auto p-8 bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg flex flex-col gap-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">Check Your Email</h2>
            <div className="text-green-400 text-sm mb-6">{success}</div>
            <p className="text-gray-300 text-sm mb-6">
              We've sent a verification link to <span className="font-mono text-blue-400">{email}</span>
            </p>
            <p className="text-gray-400 text-xs mb-6">
              Click the link in your email to activate your account. You can then log in.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => setIsRegistered(false)}
                className="w-full bg-gray-600 text-white rounded py-2 font-semibold hover:bg-gray-700 transition"
              >
                Register Another Account
              </button>
              <Link 
                to="/login" 
                className="block w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition text-center"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="max-w-sm w-full mx-auto p-8 bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg flex flex-col gap-5">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-100">Register</h2>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-200">Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="border border-gray-700 bg-gray-900/80 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </div>
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
        <button type="submit" className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition">Register</button>
        <div className="text-center text-sm mt-2">
          <Link to="/login" className="text-blue-400 hover:underline">Already have an account? Log in</Link>
        </div>
      </form>
    </div>
  );
}

export default Register; 