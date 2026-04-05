import { Layout, User, ShieldCheck, Wallet, ArrowUpCircle, ArrowDownCircle, Search, Plus } from 'lucide-react';
import './App.css'
import SummaryCard from './components/summaryCard';
import InsightsSection from './components/InsightsSection';
import Chart from './components/Chart';
import { useMemo, useState } from 'react';
import TimeChart from './components/TimeChart';
import TransactionTable from './components/TransactionTable';

const INITIAL_DATA = [
  { id: 1, date: '2026-03-01', amount: 2500, category: 'Salary', type: 'income' },
  { id: 2, date: '2026-03-02', amount: 120, category: 'Groceries', type: 'expense' },
  { id: 3, date: '2026-03-05', amount: 450, category: 'Rent', type: 'expense' },
  { id: 4, date: '2026-03-10', amount: 80, category: 'Utilities', type: 'expense' },
  { id: 5, date: '2026-03-15', amount: 200, category: 'Freelance', type: 'income' },
];


function App() {

  const [role, setRole]=useState('admin');
  const [transactions, setTransactions]=useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm]=useState('');
  const [filterType, setFilterType] = useState('all');

  const totals=useMemo(()=>{
    const income=transactions.filter(t=>t.type=='income').reduce((acc, curr)=>acc+curr.amount, 0)
    const expenses=transactions.filter(t=>t.type=='expense').reduce((acc, curr)=>acc+curr.amount, 0)
    return {income, expenses, balance: income-expenses}
  }, [transactions])

  const filteredTransactions=transactions.filter(t=>{
    const matchedSearches=t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchedSearches && matchesType;
  })

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8'>
      <header className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
        <div>
          <h1 className='text-2xl font-bold flex items-center gap-2'>
            <Layout className='text-indigo-600'/>Finance Dashboard
          </h1>
          <p className='text-slate-500 text-sm'>Welcome back, {role=='admin' ? 'Admin' : 'Viewer'}</p>
        </div>

        <div className='flex items-center bg-white p-1 rounded-lg shadow-sm border border-slate-200'>
          <button onClick={()=>setRole('viewer')} className={`px-4 py-1.5 rounded-md text-sm transition-all ${role=='viewer' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-slate-500'}`}>
            <User size={16} className='inline mr-1'/>Viewer
          </button>
          <button 
            onClick={() => setRole('admin')}
            className={`px-4 py-1.5 rounded-md text-sm transition-all ${role === 'admin' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-slate-500'}`}
          >
            <ShieldCheck size={16} className="inline mr-1" /> Admin
          </button>
        </div>
      </header>

      <main className='max-w-6xl mx-auto space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <SummaryCard title="Total Balance" amount={totals.balance} icon={<Wallet/>} color="indigo"/>
          <SummaryCard title="Monthly Income" amount={totals.income} icon={<ArrowUpCircle/>} color="emerald"/>
          <SummaryCard title="Monthly Expenses" amount={totals.expenses} icon={<ArrowDownCircle/>} color="rose"/>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <InsightsSection transactions={transactions}/>
          <Chart data={transactions}/>
        </div>

        <div className='w-full'>
          <TimeChart/>
        </div>

        <TransactionTable filteredTransactions={filteredTransactions}  role={role} setSearchTerm={setSearchTerm} filterType={filterType} setFilterType={setFilterType}/>
      </main>
    </div>
  )
}

export default App
