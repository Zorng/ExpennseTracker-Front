function CurrencyToggle({ currency, onChange }) {
  return (
    <div className="inline-flex rounded-lg bg-gray-800/70 backdrop-blur-md border border-gray-700 p-1 shadow">
      <button
        onClick={() => onChange('default')}
        className={`px-3 py-1 rounded-l-lg font-semibold transition focus:outline-none ${currency === 'default' ? 'bg-blue-600 text-white shadow' : 'text-gray-100 hover:bg-gray-700/80'}`}
        disabled={currency === 'default'}
      >
        Default
      </button>
      <button
        onClick={() => onChange('KHR')}
        className={`px-3 py-1 font-semibold transition focus:outline-none ${currency === 'KHR' ? 'bg-blue-600 text-white shadow' : 'text-gray-100 hover:bg-gray-700/80'}`}
        disabled={currency === 'KHR'}
      >
        KHR
      </button>
      <button
        onClick={() => onChange('USD')}
        className={`px-3 py-1 rounded-r-lg font-semibold transition focus:outline-none ${currency === 'USD' ? 'bg-blue-600 text-white shadow' : 'text-gray-100 hover:bg-gray-700/80'}`}
        disabled={currency === 'USD'}
      >
        USD
      </button>
    </div>
  );
}

export default CurrencyToggle; 