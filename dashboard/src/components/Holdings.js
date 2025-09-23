import React, { useEffect, useState } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { useAuth } from "../contexts/AuthContext";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);
        // First try the new authenticated endpoint
        let response;
        try {
          response = await axios.get('http://localhost:4000/api/market/market-holdings', {
            withCredentials: true
          });
        } catch (authError) {
          // Fallback to the basic endpoint if auth fails
          response = await axios.get('http://localhost:4000/allHoldings');
        }
        
        if (response.data.success) {
          setAllHoldings(response.data.data);
        } else if (Array.isArray(response.data)) {
          // Handle direct array response from fallback endpoint
          setAllHoldings(response.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch holdings');
        }
      } catch (err) {
        console.error('Error fetching holdings:', err);
        setError(err.message);
        // Fallback to local data if API fails
        try {
          const { holdings: fallbackData } = await import('../data/data');
          setAllHoldings(fallbackData);
        } catch (importErr) {
          console.error('Failed to load fallback data:', importErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchHoldings, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate totals
  const calculateTotals = () => {
    let totalInvestment = 0;
    let currentValue = 0;
    
    allHoldings.forEach(stock => {
      const investment = parseFloat(stock.avg) * parseInt(stock.qty);
      const current = parseFloat(stock.price) * parseInt(stock.qty);
      totalInvestment += investment;
      currentValue += current;
    });
    
    const pnl = currentValue - totalInvestment;
    const pnlPercentage = totalInvestment > 0 ? (pnl / totalInvestment * 100).toFixed(2) : 0;
    
    return {
      totalInvestment: totalInvestment.toFixed(2),
      currentValue: currentValue.toFixed(2),
      pnl: pnl.toFixed(2),
      pnlPercentage: pnlPercentage
    };
  };

  const totals = calculateTotals();

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  if (loading) {
    return <div className="loading">Loading holdings data...</div>;
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>
      
      {error && (
        <div className="error-message" style={{color: 'red', fontSize: '12px', margin: '5px 0'}}>
          {error} (Using fallback data)
        </div>
      )}
      
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = parseFloat(stock.price) * parseInt(stock.qty);
              const avgCost = parseFloat(stock.avg);
              const investment = avgCost * parseInt(stock.qty);
              const pnl = curValue - investment;
              const isProfit = pnl >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";
              
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{avgCost.toFixed(2)}</td>
                  <td>{parseFloat(stock.price).toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {pnl.toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col">
          <h5>
            {totals.totalInvestment.split('.')[0]}.<span>{totals.totalInvestment.split('.')[1]}</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totals.currentValue.split('.')[0]}.<span>{totals.currentValue.split('.')[1]}</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>{totals.pnl} ({totals.pnlPercentage > 0 ? '+' : ''}{totals.pnlPercentage}%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
}

export default Holdings;
