import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Optionally, fetch user info here
      setUser({}); // Placeholder, replace with real user fetch if needed
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = (jwt, userInfo) => {
    setToken(jwt);
    localStorage.setItem('token', jwt);
    setUser(userInfo || {});
    navigate('/');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 