import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import API_BASE_URL from "../../config/api";

const Positions = () => {
  const [holdings, setHoldings] = useState([]);
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
          setHoldings(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch holdings');
        }
      } catch (err) {
        console.error('Error fetching holdings:', err);
        setError(err.message);
        setHoldings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchHoldings, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Sell stock function
  const sellStock = async (holdingId, symbol, currentQuantity, averagePrice) => {
    const quantity = prompt(`How many shares of ${symbol} would you like to sell?\nYou own: ${currentQuantity} shares\nAvg Price: $${averagePrice}`);
    if (!quantity || isNaN(quantity) || quantity <= 0) return;
    
    const sellQuantity = parseInt(quantity);
    if (sellQuantity > currentQuantity) {
      alert(`You can't sell more than ${currentQuantity} shares!`);
      return;
    }

    const totalValue = (averagePrice * sellQuantity).toFixed(2);
    const confirmed = window.confirm(`Confirm sale:\n${sellQuantity} shares of ${symbol}\nTotal value: $${totalValue}`);
    if (!confirmed) return;

    try {
      const response = await axios.put(`${API_BASE_URL}/api/market/user-holdings/${holdingId}`, {
        quantity: currentQuantity - sellQuantity,
        notes: `Sold ${sellQuantity} shares of ${symbol} at $${averagePrice}`
      }, {
        withCredentials: true
      });
      
      if (response.data.success) {
        alert(`✅ Successfully sold ${sellQuantity} shares of ${symbol} for $${totalValue}!`);
        // Refresh holdings
        const updatedResponse = await axios.get(`${API_BASE_URL}/api/market/user-holdings`, {
          withCredentials: true
        });
        if (updatedResponse.data.success) {
          setHoldings(updatedResponse.data.data);
        }
      }
    } catch (err) {
      console.error('Error selling stock:', err);
      alert(err.response?.data?.message || 'Failed to sell stock');
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading your positions...</div>;
  }

  return (
    <div className="p-4">
      <h4 className="mb-4">Positions ({holdings.length})</h4>

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      {holdings.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">No positions found</h5>
          <p className="text-muted">Buy some stocks from your watchlist to see them here!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Quantity</th>
                <th>Avg. Price</th>
                <th>Current Value</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, index) => {
                const symbol = holding.symbol || 'N/A';
                const quantity = holding.quantity || 0;
                const averagePrice = holding.averagePrice || 0;
                const currentPrice = holding.currentPrice || holding.price || averagePrice;
                const currentValue = parseFloat(holding.currentValue || (currentPrice * quantity));

                return (
                  <tr key={holding._id || index}>
                    <td><strong>{symbol}</strong></td>
                    <td>{quantity}</td>
                    <td>${averagePrice.toFixed(2)}</td>
                    <td>${currentValue.toFixed(2)}</td>
                    <td><small className="text-muted">{holding.notes || 'N/A'}</small></td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => sellStock(holding._id, symbol, quantity, averagePrice)}
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Positions;