import RecordForm from './RecordForm';

function RecordModal({ open, onClose, onSubmit, initialData }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-2">
        <RecordForm
          onSubmit={onSubmit}
          onCancel={onClose}
          initialData={initialData || {}}
        />
      </div>
    </div>
  );
}

export default RecordModal; 