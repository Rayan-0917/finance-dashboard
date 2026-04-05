import React from 'react'
import { Layout, User, ShieldCheck } from 'lucide-react'

const Navbar = ({role, setRole}) => {
  return (
    <nav className='sticky top-0 z-50 w-full bg-white/60 backdrop-blur-md border-b border-slate-200 shadow-sm'>
      <div className='max-w-6xl mx-auto px-4 md:px-8'>
        <header className='flex flex-row justify-between items-center h-20'>
        <div className='flex flex-col'>
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
    </nav>
  )
}

export default Navbar
