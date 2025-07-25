import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecordForm from '../features/records/RecordForm';
import api from '../utils/axios';

function EditRecord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/records/${id}`);
        setInitialData(res.data);
      } catch {
        setError('Could not load record');
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await api.put(`/records/${id}`, data);
      navigate('/records');
    } catch {
      alert('Could not update record');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-2 pb-4 px-2">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-5 sm:p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Record</h2>
        <RecordForm initialData={initialData} onSubmit={handleSubmit} onCancel={() => navigate('/records')} compact />
      </div>
    </div>
  );
}

export default EditRecord; 