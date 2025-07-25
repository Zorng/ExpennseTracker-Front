function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6 mb-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-gray-800/80 text-gray-100 font-semibold hover:bg-blue-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition border border-gray-700 backdrop-blur-md"
      >
        Prev
      </button>
      <span className="text-sm font-medium text-gray-200">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded bg-gray-800/80 text-gray-100 font-semibold hover:bg-blue-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition border border-gray-700 backdrop-blur-md"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination; 