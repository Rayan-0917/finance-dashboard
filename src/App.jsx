import { Layout, User, ShieldCheck } from 'lucide-react';
import './App.css'
import { useState } from 'react';

const INITIAL_DATA = [
  { id: 1, date: '2024-03-01', amount: 2500, category: 'Salary', type: 'income' },
  { id: 2, date: '2024-03-02', amount: 120, category: 'Groceries', type: 'expense' },
  { id: 3, date: '2024-03-05', amount: 450, category: 'Rent', type: 'expense' },
  { id: 4, date: '2024-03-10', amount: 80, category: 'Utilities', type: 'expense' },
  { id: 5, date: '2024-03-15', amount: 200, category: 'Freelance', type: 'income' },
];


function App() {

  const [role, setRole]=useState('admin');

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
    </div>
  )
}

export default App
