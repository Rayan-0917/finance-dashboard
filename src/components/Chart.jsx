import React from 'react'

const Chart = ({data}) => {
    const max=Math.max(...data.map(d=>d.amount));
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
      <h3 className='font-bold text-lg mb-4'>Cash Flow Trend</h3>
      <div className="flex items-end gap-2 h-32">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div 
              style={{ height: `${(d.amount / max) * 100}%` }}
              className={`w-full rounded-t-md transition-all ${d.type === 'income' ? 'bg-emerald-400 group-hover:bg-emerald-500' : 'bg-slate-300 group-hover:bg-slate-400'}`}
            />
            <span className="text-[10px] text-slate-400 truncate w-full text-center">{d.category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chart
