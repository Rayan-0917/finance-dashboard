import React from 'react'
import { Search, Plus } from 'lucide-react'

const TransactionTable = ({filteredTransactions, role, setSearchTerm, filterType, setFilterType}) => {
  return (
    <section className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          <div className='p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4'>
            <h3 className='font-bold text-lg'>Recent Transactions</h3>

            <div className='flex flex-wrap items-center gap-3'>
                <div className='flex bg-slate-100 p-1 rounded-2xl border border-slate-200'>
                    {['all', 'income', 'expense'].map((type)=>(
                        <button key={type} onClick={()=>setFilterType(type)} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${filterType===type ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>{type}</button>
                    ))}
                </div>
            </div>
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
  )
}

export default TransactionTable
