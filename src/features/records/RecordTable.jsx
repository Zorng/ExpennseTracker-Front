function RecordTable({ records, displayAmount, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow bg-gray-800/80 backdrop-blur-md border border-gray-700">
      <table className="min-w-full table-auto text-sm text-gray-100">
        <thead className="bg-gray-900/80">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">Title</th>
            <th className="px-4 py-2 text-left font-semibold">Amount</th>
            <th className="px-4 py-2 text-left font-semibold">Category</th>
            <th className="px-4 py-2 text-left font-semibold">Date</th>
            <th className="px-4 py-2 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, i) => (
            <tr key={record.id} className={i % 2 === 0 ? 'bg-gray-800/60' : 'bg-gray-900/40'}>
              <td className="px-4 py-2 whitespace-nowrap">{record.title}</td>
              <td className="px-4 py-2 whitespace-nowrap">{displayAmount(record)}</td>
              <td className="px-4 py-2 whitespace-nowrap" style={{ color: record.Category?.color || undefined }}>{record.Category?.name || 'Uncategorized'}</td>
              <td className="px-4 py-2 whitespace-nowrap">{record.date}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <button onClick={() => onEdit(record)} className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition">Edit</button>
                <button onClick={() => onDelete(record)} className="ml-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordTable; 