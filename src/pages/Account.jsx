import UpdateEmail from '../features/account/UpdateEmail';
import UpdatePassword from '../features/account/UpdatePassword';
import DeleteAccount from '../features/account/DeleteAccount';

function Account() {
  return (
    <div className="flex justify-center items-start min-h-[80vh] bg-gray-900 py-10 px-2">
      <div className="w-full max-w-xl bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">Account Settings</h2>
        {/* Update Email Section */}
        <section className="mb-10 border-b border-gray-700 pb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Update Email</h3>
          <UpdateEmail />
        </section>
        {/* Update Password Section */}
        <section className="mb-10 border-b border-gray-700 pb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Update Password</h3>
          <UpdatePassword />
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