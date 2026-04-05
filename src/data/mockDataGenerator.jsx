const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const dailyMockData=[]
months.forEach((month, monthIndex)=>{
    const daysInMonth=new Date(2026, monthIndex+1, 0).getDate();
    for(let i=1; i<=daysInMonth; i++){
        dailyMockData.push({
            month: month,
            monthIndex: monthIndex, 
            day: i,
            amount: Math.floor(Math.random()*150)+10,
        })
    }
})


const monthlyMockData=months.map((month, index)=>({
    month,
    index,
    total: dailyMockData.filter(d=>d.month===month).reduce((acc, curr)=>acc+curr.amount, 0)
}))

export {months, dailyMockData, monthlyMockData};