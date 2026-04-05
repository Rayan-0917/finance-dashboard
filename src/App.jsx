import { Layout, User, ShieldCheck, Wallet, ArrowUpCircle, ArrowDownCircle, Search, Plus } from 'lucide-react';
import './App.css'
import SummaryCard from './components/summaryCard';
import InsightsSection from './components/InsightsSection';
import Chart from './components/Chart';
import { useMemo, useState } from 'react';

const INITIAL_DATA = [
  { id: 1, date: '2024-03-01', amount: 2500, category: 'Salary', type: 'income' },
  { id: 2, date: '2024-03-02', amount: 120, category: 'Groceries', type: 'expense' },
  { id: 3, date: '2024-03-05', amount: 450, category: 'Rent', type: 'expense' },
  { id: 4, date: '2024-03-10', amount: 80, category: 'Utilities', type: 'expense' },
  { id: 5, date: '2024-03-15', amount: 200, category: 'Freelance', type: 'income' },
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

        <section className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          <div className='p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4'>
            <h3 className='font-bold text-lg'>Recent Transactions</h3>
            <div className='flex gap-2'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={18}/>
                <input type="text" placeholder='Search category...' className='pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full' onChange={(e)=>setSearchTerm(e.target.value)} />
              </div>
              {role=== 'admin' && (
                <button className='bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2'>
                  <Plus size={18}/>Add
                </button>
              )}
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead className='bg-slate-50 text-slate-500 text-xs uppercase tracking-wider'>
                <tr>
                  <th className='px-6 py-4 font-semibold'>Date</th>
                  <th className='px-6 py-4 font-semibold'>Category</th>
                  <th className='px-6 py-4 font-semibold'>Type</th>
                  <th className='px-6 py-4 font-semibold text-right'>Amount</th>
                  {role === 'admin' && <th className="px-6 py-4 font-semibold text-center">Action</th>}
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {filteredTransactions.length>0 ? (
                  filteredTransactions.map(t=>(
                    <tr key={t.id} className='hover:bg-slate-50 transition-colors'>
                      <td className="px-6 py-4 text-sm text-slate-600">{t.date}</td>
                      <td className="px-6 py-4 text-sm font-medium">{t.category}</td>
                      <td className='px-6 py-4'>
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${t.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {t.type}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm font-bold text-right ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                      </td>
                      {role === 'admin' && (
                        <td className="px-6 py-4 text-center">
                          <button className="text-slate-400 hover:text-indigo-600 text-xs font-semibold">Edit</button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">No transactions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
