import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import MonthYearSelector from '../features/dashboard/MonthYearSelector';
import CurrencyToggleSummary from '../features/dashboard/CurrencyToggleSummary';
import PieChart from '../features/dashboard/PieChart';
import useDashboardSummary from '../features/dashboard/useDashboardSummary';
import useDashboardAverages from '../features/dashboard/useDashboardAverages';
import Top5Expenses from '../features/dashboard/Top5Expenses';
import QuickAddRecord from '../features/records/QuickAddRecord';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [currency, setCurrency] = useState('USD');
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const { categories, loading, error } = useDashboardSummary(selectedYear, selectedMonth, currency);
  const { averages, loading: loadingAvg, error: errorAvg } = useDashboardAverages(currency);

  // Calculate total expense from categories (already in selected currency)
  const total = categories.reduce((sum, cat) => sum + (Number(cat.value) || 0), 0);
  let displayExpense = '';
  if (!loading && !error) {
    if (currency === 'USD') {
      displayExpense = `$${total.toFixed(2)}`;
    } else {
      displayExpense = `${total.toLocaleString()}៛`;
    }
  }

  // Get user display name (email, username, or name)
  const getUserDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.username) return user.username;
    if (user?.email) return user.email.split('@')[0]; // Use part before @ from email
    return 'User';
  };

  const handleQuickAddSuccess = () => {
    setShowQuickAdd(false);
    // Optionally refresh the dashboard data
    window.location.reload();
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-2 sm:p-6">
      {/* Welcome Message */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">
              Hello, {getUserDisplayName()}! 👋
            </h1>
            <p className="text-gray-300">Welcome to your expense dashboard</p>
          </div>
          <button
            onClick={() => setShowQuickAdd(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2"
          >
            <span>+</span>
            Quick Add
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Dashboard</h2>
      </div>

      {/* Month/Year Selector and Currency Toggle */}
      <div className="flex items-center gap-4 mb-6">
        <MonthYearSelector
          month={selectedMonth}
          year={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
        <CurrencyToggleSummary currency={currency} onChange={setCurrency} />
      </div>

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <QuickAddRecord
          onClose={() => setShowQuickAdd(false)}
          onSuccess={handleQuickAddSuccess}
          currency={currency}
        />
      )}

      {/* Responsive Layout: Summary left, Averages & Top 5 right */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Summary Section (Donut + Category Breakdown) */}
        <div className="flex-1 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 mb-8 lg:mb-0 p-6 min-w-0">
          <div className="text-xl font-semibold mb-6 text-gray-100">
            {loading ? 'Loading...' : error ? <span className="text-red-400">{error}</span> : (
              <>
                Total Expense: {displayExpense || 'No data'}
              </>
            )}
          </div>
          <div className="mb-6">
            <div className="mb-2 font-medium text-gray-200">Category Breakdown:</div>
            {loading ? 'Loading...' : error ? null : categories.length === 0 ? (
              <div className="text-gray-400">No data for selected month</div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <PieChart data={categories} size={200} />
                <ul className="list-none p-0 m-0 w-full max-w-xs mx-auto">
                  {categories.map(cat => {
                    const percent = total > 0 ? ((cat.value / total) * 100).toFixed(0) : 0;
                    return (
                      <li key={cat.name} style={{ color: cat.color }} className="font-medium flex items-center gap-2 justify-between border-b border-gray-700 py-1">
                        <span>{cat.name}</span>
                        <span className="text-gray-100">{currency === 'USD' ? `$${Number(cat.value).toFixed(2)}` : `${Number(cat.value).toLocaleString()}៛`} <span className="text-xs text-gray-400">({percent}%)</span></span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Right Side: Averages and Top 5 */}
        <div className="flex flex-col gap-8 flex-1 min-w-0">
          {/* Average Daily Expense for Most Recent 3 Months */}
          <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6">
            <div className="mb-2 font-medium text-gray-200">Average Daily Expense (most recent 3 months):</div>
            {loadingAvg ? 'Loading...' : errorAvg ? <span className="text-red-400">{errorAvg}</span> : averages.length === 0 ? (
              <div className="text-gray-400">No data</div>
            ) : (
              <ul className="list-none p-0 m-0">
                {averages.map(avg => (
                  <li key={avg.month} className="font-medium text-gray-100">
                    {avg.month}: {currency === 'USD' ? `$${Number(avg.value).toFixed(2)}` : `${Number(avg.value).toLocaleString()}៛`}/day
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Top 5 Expenses Section */}
          <Top5Expenses currency={currency} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 