import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ data }) => {

  const chartData = {
    labels: data.map(d => d.category),
    datasets: [{
      label: 'Amount ($)',
      data: data.map(d => d.amount),
      backgroundColor: data.map(d => d.type === 'income' ? 'rgba(52, 211, 153, 0.8)' : 'rgba(252, 165, 165, 1)'),
      borderRadius: 8,
      hoverBackgroundColor: data.map(d => d.type === 'income' ? '#059669' : 'rgba(244, 63, 94, 1)')
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        cornerRadius: 8,
        displayColors: false,
      },
      x: {
        grid: { display: false }, // Remove vertical lines for modern look
        ticks: { color: '#94a3b8', font: { size: 11 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9' },
        ticks: {
          color: '#94a3b8',
          font: { size: 11 },
          callback: (value) => `$${value}`
        }
      },
    }
  }
  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-80'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='font-bold text-lg text-slate-800'>Cash Flow Trend</h3>
        <div className='flex gap-4 text-[10px] font-bold tracking-wider'>
          <div className='flex items-center gap-1.5 text-emerald-600'>
            <span className='w-2 h-2 rounded-full bg-emerald-400'></span>Income
          </div>
          <div className="flex items-center gap-1.5 text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-300"></span> Expense
          </div>
        </div>
      </div>
      
      <div className='h-56'>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

export default Chart
