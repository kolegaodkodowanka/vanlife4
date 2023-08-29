import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Income() {

    const data = [
        { month: 'January', income: 720 , id: "1"},
        { month: 'February', income: 560, id: "2"},
        { month: 'March', income: 980, id: "3"},
      ];

      
let totalIncome = 0;

for (const entry of data) {
    totalIncome += entry.income;
}


      const IncomeGraph = () => {
        return (
          <BarChart width={600} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#ff8c38" />
          </BarChart>
        );
      };
      
    

    return (
        <section className="host-income">
            <h1>Income</h1>
            <p>
                Last <span>{data.length} months</span>
            </p>
            <h2>${totalIncome}</h2>
            <div className="App">
      <h1>Income Graph</h1>
      <IncomeGraph />
    </div>
            <div className="info-header">
                <h3>Your transactions ({data.length})</h3>
                <p>
                    Last <span>{data.length} months</span>
                </p>
            </div>
            <div className="transactions">
                {data.map((item) => (
                    <div key={item.id} className="transaction">
                        <h3>${item.income}</h3>
                        <p>{item.month}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
