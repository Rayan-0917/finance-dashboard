import React, { useMemo, useState } from 'react'
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js';
import {months, dailyMockData, monthlyMockData} from '../data/mockDataGenerator.jsx';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const TimeChart = () => {

    const [view, setView]=useState('monthly');
    const [selectedMonth, setSelectedMonth]=useState(0);

    const chartData=useMemo(()=>{
        if(view==='monthly'){
            return {
                datasets: [{
                    label: 'Total Monthly Expenses',
                    data: monthlyMockData.map(m=>({x: m.index+1, y: m.total})),
                    backgroundColor: 'rgba(79, 70, 229, 0.2)',
                    borderColor: '#4f46e5',
                    borderWidth: 2,
                    pointBackgroundColor: '#4f46e5',
                    pointRadius: 4,
                    showLine: true,
                    fill: 'origin',
                    pointHoverRadius: 8,
                }]
            }
        }
        else{
            const filtered=dailyMockData.filter(d=>d.monthIndex===selectedMonth);
            return {
                datasets: [{
                    label: `Daily Expenses in ${months[selectedMonth]}`,
                    data: filtered.map(d=>({x: d.day, y: d.amount})),
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: '#10b981', 
                    borderWidth: 2,
                    pointBackgroundColor: '#10b981',
                    pointRadius: 3,
                    showLine: true,
                    fill: 'origin',
                    pointHoverRadius: 7,
                }]
            }
        }
    }, [view, selectedMonth]);

    const options={
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title:{
                    display: true,
                    text: view==='monthly' ? 'Month of Year' : "Day of Month",
                    color: '#64748b'
                },
                min: 1,
                max: view==='monthly' ? 12 : 31,
                grid: { color: '#f1f5f9' },
                ticks: {
                    stepSize:1,
                    callback: function(value){
                        if(view==='monthly'){
                            return months[value-1];
                        }
                        return value;
                    }
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount ($)',
                    color: '#64748b'
                },
                grid: { color: '#f1f5f9' }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (ctx)=>{
                        const label=view=='monthly' ? months[ctx.raw.x-1]: `Day ${ctx.raw.x}`;
                        return `${label} : ${ctx.raw.y}`;
                    }
                }
            }
        }
    }
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
        <div>
            <h3 className='font-bold text-xl text-slate-800'>Expense Distribution</h3>
            <p className='text-sm text-slate-500'>Visualize spending patterns</p>
        </div>

        <div className='flex items-center gap-3'>
            {view==='daily' && (
                <select value={selectedMonth} onChange={(e)=>setSelectedMonth(parseInt(e.target.value))} className='bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500'>
                    {months.map((m, i)=> <option key={m} value={i}>{m}</option>)}
                </select>
            )}

            <div className='flex bg-slate-100 p-1 rounded-xl border border-slate-200'>
                <button onClick={()=>setView('monthly')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'monthly' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                    Monhtly
                </button>
                <button onClick={()=>setView('daily')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'daily' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}>Daily</button>
            </div>
        </div>
      </div>

      <div className='h-87.5'>
        <Scatter data={chartData} options={options}/>
      </div>

      <div className='mt-4 p-4 bg-slate-50 rounded-xl flex items-center justify-between'>
        <span className='text-xs text-slate-500 font-medium'>
            {view==='monthly' ? "Tip: Look for consistent horizontal clusters to identify fixed costs." : `Showing distribution for ${months[selectedMonth]} 2026.`}
        </span>
      </div>
    </div>
  )
}

export default TimeChart
