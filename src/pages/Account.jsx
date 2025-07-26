import { useState } from 'react';
import { useAuth } from '../AuthContext';
import UpdateEmail from '../features/account/UpdateEmail';
import UpdatePassword from '../features/account/UpdatePassword';
import DeleteAccount from '../features/account/DeleteAccount';

function Account() {
  const { user } = useAuth();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Get user display name (email, username, or name)
  const getUserDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.username) return user.username;
    if (user?.email) return user.email.split('@')[0]; // Use part before @ from email
    return 'User';
  };

  return (
    <div className="flex justify-center items-start min-h-[80vh] bg-gray-900 py-10 px-2">
      <div className="w-full max-w-xl bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">Account Settings</h2>
        {/* User Information Section */}
        <section className="mb-10 border-b border-gray-700 pb-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-200">Account Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-700">
              <span className="text-gray-300 font-medium">Username:</span>
              <span className="text-gray-100">{getUserDisplayName()}</span>
            </div>
            <div className="py-3 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Email:</span>
                <span className="text-gray-100">{user?.email || 'Not available'}</span>
                <button
                  className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-semibold transition"
                  onClick={() => {
                    setShowEmailForm((v) => !v);
                    setShowPasswordForm(false);
                  }}
                >
                  {showEmailForm ? 'Cancel' : 'Update'}
                </button>
              </div>
              {showEmailForm && (
                <div className="mt-4"><UpdateEmail /></div>
              )}
            </div>
            <div className="py-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Password:</span>
                <span className="text-gray-100">••••••••</span>
                <button
                  className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-semibold transition"
                  onClick={() => {
                    setShowPasswordForm((v) => !v);
                    setShowEmailForm(false);
                  }}
                >
                  {showPasswordForm ? 'Cancel' : 'Update'}
                </button>
              </div>
              {showPasswordForm && (
                <div className="mt-4"><UpdatePassword /></div>
              )}
            </div>
          </div>
        </section>
        {/* Delete Account Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-red-400">Delete Account</h3>
          <DeleteAccount />
        </section>
      </div>
    </div>
  );
}

export default Account; 