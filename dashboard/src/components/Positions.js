import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        // Try authenticated endpoint first, then fallback
        let response;
        try {
          response = await axios.get('http://localhost:4000/api/market/market-positions', {
            withCredentials: true
          });
        } catch (authError) {
          // Fallback to basic endpoint
          response = await axios.get('http://localhost:4000/allPositions');
        }
        
        if (response.data.success) {
          setPositions(response.data.data);
        } else if (Array.isArray(response.data)) {
          // Handle direct array response from fallback endpoint
          setPositions(response.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch positions');
        }
      } catch (err) {
        console.error('Error fetching positions:', err);
        setError(err.message);
        // Fallback to local data if API fails
        try {
          const { positions: fallbackData } = await import('../data/data');
          setPositions(fallbackData);
        } catch (importErr) {
          console.error('Failed to load fallback data:', importErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchPositions, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="loading">Loading positions data...</div>;
  }

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      {error && (
        <div className="error-message" style={{color: 'red', fontSize: '12px', margin: '5px 0'}}>
          {error} (Using fallback data)
        </div>
      )}

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {positions.map((stock, index) => {
            const curValue = parseFloat(stock.price) * parseInt(stock.qty);
            const avgCost = parseFloat(stock.avg);
            const investment = avgCost * parseInt(stock.qty);
            const pnl = curValue - investment;
            const isProfit = pnl >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{avgCost.toFixed(2)}</td>
                <td>{parseFloat(stock.price).toFixed(2)}</td>
                <td className={profClass}>
                  {pnl.toFixed(2)}
                </td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
