import React from 'react'

const SummaryCard = ({title, amount, icon, color}) => {

    const colors = {
        indigo: "bg-indigo-50 text-indigo-600",
        emerald: "bg-emerald-50 text-emerald-600",
        rose: "bg-rose-50 text-rose-600"
    };

  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4'>
      <div className={`p-3 rounded-xl ${colors[color]}`}>{icon}</div>
      <div>
        <p className='text-sm text-slate-500 font-medium'>{title}</p>
        <p className='text-2xl font-bold'>${amount.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default SummaryCard
