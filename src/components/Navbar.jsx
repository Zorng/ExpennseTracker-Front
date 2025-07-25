import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (
    <>
      {isAuthenticated && <li><Link to="/" className="font-semibold text-gray-100 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>}
      {isAuthenticated && <li><Link to="/records" className="font-semibold text-gray-100 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Records</Link></li>}
      {isAuthenticated && <li><Link to="/account" className="font-semibold text-gray-100 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Account</Link></li>}
      {!isAuthenticated && <li><Link to="/login" className="font-semibold text-gray-100 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Login</Link></li>}
      {!isAuthenticated && <li><Link to="/register" className="font-semibold text-gray-100 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Register</Link></li>}
      {isAuthenticated && <li><button onClick={() => { logout(); setMenuOpen(false); }} className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">Logout</button></li>}
    </>
  );

  return (
    <nav className="backdrop-blur-md bg-gray-950/70 border-b border-gray-800 shadow-lg mb-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-400 tracking-tight">Expense Tracker</Link>
          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-6 items-center">{navLinks}</ul>
          {/* Mobile Burger Button */}
          <button
            className="md:hidden flex items-center px-2 py-1 border rounded text-gray-100 border-gray-700 hover:bg-gray-900 focus:outline-none"
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Open navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 z-50 bg-gray-950/80 backdrop-blur-md shadow-lg border-t border-gray-800 animate-fade-in">
            <ul className="flex flex-col gap-2 p-4">{navLinks}</ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 