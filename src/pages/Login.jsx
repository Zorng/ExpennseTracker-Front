import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import api from '../utils/axios';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    try {
      const res = await api.post('/users/login', { email, password });
      login(res.data.token, res.data.user); // expects { token, user }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="border border-gray-700 bg-gray-900/80 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </div>
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition">Log In</button>
        <div className="text-center text-sm mt-2">
          <Link to="/register" className="text-blue-400 hover:underline">Don't have an account? Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login; 