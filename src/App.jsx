import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRecord from './pages/CreateRecord';
import EditRecord from './pages/EditRecord';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from './pages/EmailVerification';

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Navbar />
      <main className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 text-gray-100">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/records" element={isAuthenticated ? <Records /> : <Navigate to="/login" />} />
          <Route path="/records/create" element={isAuthenticated ? <CreateRecord /> : <Navigate to="/login" />} />
          <Route path="/records/:id/edit" element={isAuthenticated ? <EditRecord /> : <Navigate to="/login" />} />
          <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 w-full text-gray-100">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
