import RecordForm from '../features/records/RecordForm';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

function CreateRecord() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    // POST to /records
    try {
      await api.post('/records', data);
      navigate('/records');
    } catch (err) {
      alert('Could not create record');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 pt-2 pb-4 px-2">
      <div className="w-full max-w-lg bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg p-5 sm:p-6 text-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">Create Record</h2>
        <RecordForm onSubmit={handleSubmit} onCancel={() => navigate('/records')} compact />
      </div>
    </div>
  );
}

export default CreateRecord; 