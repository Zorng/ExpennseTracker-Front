import RecordForm from '../features/records/RecordForm';
import { useNavigate } from 'react-router-dom';

function CreateRecord() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    // POST to /records
    try {
      const res = await fetch('/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create record');
      navigate('/records');
    } catch {
      alert('Could not create record');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-2 pb-4 px-2">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-5 sm:p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Record</h2>
        <RecordForm onSubmit={handleSubmit} onCancel={() => navigate('/records')} compact />
      </div>
    </div>
  );
}

export default CreateRecord; 