import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import API_BASE_URL from "../../config/api";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/market/user-holdings`, {
          withCredentials: true
        });
        
        if (response.data.success) {
          console.log('Holdings data received:', response.data.data);
          setAllHoldings(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch holdings');
        }
      } catch (err) {
        console.error('Error fetching holdings:', err);
        setError(err.message);
        // Keep holdings empty for new users - no fallback data
        setAllHoldings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchHoldings, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate totals using backend-provided data
  const calculateTotals = () => {
    let totalInvestment = 0;
    let currentValue = 0;
    
    allHoldings.forEach(holding => {
      const investment = (holding.averagePrice || 0) * (holding.quantity || 0);
      const current = parseFloat(holding.currentValue || investment);
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

  if (loading) {
    return <div className="text-center p-4">Loading holdings data...</div>;
  }

  return (
    <div className="p-4">
      <h4 className="mb-4">Holdings ({allHoldings.length})</h4>
      
      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}
      
      {allHoldings.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">No holdings found</h5>
          <p className="text-muted">Buy some stocks from your watchlist to see them here!</p>
        </div>
      ) : (
        <>
          <div className="table-responsive mb-4">
            <table className="table table-striped">
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
            {allHoldings.map((holding, index) => {
              // Use backend-provided data directly
              const symbol = holding.symbol || 'N/A';
              const quantity = holding.quantity || 0;
              const averagePrice = holding.averagePrice || 0;
              const currentPrice = holding.currentPrice || holding.price || averagePrice;
              const currentValue = parseFloat(holding.currentValue || (currentPrice * quantity));
              const investment = averagePrice * quantity;
              const pnl = parseFloat(holding.pnl || (currentValue - investment));
              const pnlPercent = holding.pnlPercentage || (investment > 0 ? ((pnl / investment) * 100).toFixed(2) : 0);
              const isProfit = pnl >= 0.0;
              const profClass = isProfit ? "text-success" : "text-danger";
              
              return (
                <tr key={holding._id || index}>
                  <td><strong>{symbol}</strong></td>
                  <td>{quantity}</td>
                  <td>${averagePrice.toFixed(2)}</td>
                  <td>${currentPrice.toFixed(2)}</td>
                  <td>${currentValue.toFixed(2)}</td>
                  <td className={profClass}>
                    ${pnl.toFixed(2)} ({isProfit ? '+' : ''}{pnlPercent}%)
                  </td>
                  <td className={profClass}>${(currentPrice - averagePrice).toFixed(2)}</td>
                  <td className={profClass}>{isProfit ? '+' : ''}{pnlPercent}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="row">
        <div className="col-md-4">
          <div className="card bg-light">
            <div className="card-body text-center">
              <h5>${totals.totalInvestment}</h5>
              <p className="text-muted">Total investment</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light">
            <div className="card-body text-center">
              <h5>${totals.currentValue}</h5>
              <p className="text-muted">Current value</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light">
            <div className="card-body text-center">
              <h5 className={parseFloat(totals.pnl) >= 0 ? 'text-success' : 'text-danger'}>
                ${totals.pnl} ({totals.pnlPercentage > 0 ? '+' : ''}{totals.pnlPercentage}%)
              </h5>
              <p className="text-muted">P&L</p>
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default Holdings;