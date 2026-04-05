import React from 'react'

const InsightsSection = ({transactions}) => {
    const highestExpense=[...transactions].filter(t=>t.type==='expense').sort((a, b)=>b.amount-a.amount)[0];
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
      <h3 className='font-bold text-lg mb-4'>Smart Insights</h3>
      <div className='space-y-4'>
        <div className='p-4 bg-amber-50 rounded-xl border border-amber-100'>
            <p className='text-xs text-amber-700 font-bold mb-1'>TOP SPENDING</p>
            <p className='text-sm text-amber-900'>
                You spent the most on <span className='font-bold'>{highestExpense?.category || 'N/A'}</span> (${highestExpense?.amount || 0}).
            </p>
        </div>
        <div className='p-4 bg-indigo-50 rounded-xl border border-indigo-100'>
            <p className='text-xs text-indigo-700 font-bold mb-1'>SAVINGS RATE</p>
            <p className="text-sm text-indigo-900">Your savings rate this month is 18%. Keep it up!</p>
        </div>
      </div>
    </div>
  )
}

export default InsightsSection
