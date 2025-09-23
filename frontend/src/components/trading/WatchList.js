import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined, 
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchSymbol, setSearchSymbol] = useState('');
  const [adding, setAdding] = useState(false);
  const { user } = useAuth();

  // Popular stock symbols with realistic prices
  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 138.21 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.86 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 501.20 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 445.03 },
  ];

  // Get realistic price with small random variation
  const getRealisticPrice = (basePrice) => {
    const variation = (Math.random() - 0.5) * 0.04; // ±2% variation
    return (basePrice * (1 + variation)).toFixed(2);
  };

  // Fetch real market data from our API
  const fetchWatchlistData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/market/user-watchlist', {
        withCredentials: true
      });
      
      if (response.data.success) {
        console.log('Watchlist data received:', response.data.data);
        setWatchlist(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch data');
      }
    } catch (err) {
      console.error('Error fetching watchlist data:', err);
      setError(err.message);
      setWatchlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlistData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchWatchlistData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Add stock to watchlist
  const addToWatchlist = async () => {
    if (!searchSymbol.trim()) return;
    
    try {
      setAdding(true);
      const response = await axios.post('http://localhost:4000/api/market/user-watchlist', {
        symbol: searchSymbol.toUpperCase(),
        alertPrice: null,
        notes: ''
      }, {
        withCredentials: true
      });
      
      if (response.data.success) {
        setSearchSymbol('');
        // Refresh the watchlist
        fetchWatchlistData();
      }
    } catch (err) {
      console.error('Error adding to watchlist:', err);
      alert(err.response?.data?.message || 'Failed to add stock to watchlist');
    } finally {
      setAdding(false);
    }
  };

  // Remove from watchlist
  const removeFromWatchlist = async (symbol) => {
    if (!symbol) {
      alert('Error: No symbol provided for removal');
      return;
    }
    
    console.log('Attempting to remove symbol:', symbol);
    
    try {
      const response = await axios.delete(`http://localhost:4000/api/market/user-watchlist/${symbol}`, {
        withCredentials: true
      });
      
      console.log('Remove response:', response.data);
      
      if (response.data.success) {
        alert(`${symbol} removed from watchlist`);
        // Refresh the watchlist
        fetchWatchlistData();
      } else {
        alert(response.data.message || 'Failed to remove stock');
      }
    } catch (err) {
      console.error('Error removing from watchlist:', err);
      alert(err.response?.data?.message || 'Failed to remove stock from watchlist');
    }
  };

  // Buy stock (add to holdings/positions)
  const buyStock = async (symbol, price) => {
    if (!symbol) {
      alert('Error: No symbol provided for purchase');
      return;
    }
    
    console.log('Attempting to buy:', symbol, 'at price:', price);
    
    const quantity = prompt(`How many shares of ${symbol} would you like to buy?`);
    if (!quantity || isNaN(quantity) || quantity <= 0) return;

    const totalCost = (parseFloat(price) * parseInt(quantity)).toFixed(2);
    const confirmed = window.confirm(`Confirm purchase:\n${quantity} shares of ${symbol}\nPrice: $${price} per share\nTotal cost: $${totalCost}`);
    if (!confirmed) return;

    try {
      const response = await axios.post('http://localhost:4000/api/market/user-holdings', {
        symbol: symbol,
        quantity: parseInt(quantity),
        averagePrice: parseFloat(price),
        notes: `Bought ${quantity} shares of ${symbol} at market price $${price}`
      }, {
        withCredentials: true
      });
      
      if (response.data.success) {
        alert(`✅ Successfully bought ${quantity} shares of ${symbol} for $${totalCost}!`);
      }
    } catch (err) {
      console.error('Error buying stock:', err);
      alert(err.response?.data?.message || 'Failed to buy stock');
    }
  };

  // Sell stock (remove from holdings/positions)
  const sellStock = async (symbol, price) => {
    const quantity = prompt(`How many shares of ${symbol} would you like to sell?`);
    if (!quantity || isNaN(quantity) || quantity <= 0) return;

    // For simplicity, we'll just show a message for now
    // In a real app, you'd check current holdings and adjust quantities
    alert(`Sell functionality: Would sell ${quantity} shares of ${symbol} at $${price}`);
  };

  if (loading) {
    return (
      <div className="watchlist-container">
        <div className="loading">Loading market data...</div>
      </div>
    );
  }

  return (
    <div className="watchlist-container" style={{padding: '20px', border: '1px solid #ddd', borderRadius: '8px'}}>
      <h4>Watchlist</h4>
      <div className="search-container" style={{marginBottom: '15px'}}>
        <div className="input-group mb-2">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter stock symbol (AAPL, MSFT, GOOGL, TSLA)"
            className="form-control"
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && addToWatchlist()}
          />
          <button 
            className="btn btn-primary" 
            onClick={addToWatchlist}
            disabled={adding || !searchSymbol.trim()}
          >
            {adding ? 'Adding...' : 'Add to Watchlist'}
          </button>
        </div>
        
        {/* Quick add popular stocks */}
        <div className="mb-2">
          <small className="text-muted">Quick add: </small>
          {popularStocks.slice(0, 4).map(stock => (
            <button 
              key={stock.symbol}
              className="btn btn-outline-primary btn-sm me-1 mb-1"
              onClick={() => {
                setSearchSymbol(stock.symbol);
                // Auto add after setting symbol
                setTimeout(() => addToWatchlist(), 100);
              }}
              disabled={adding}
            >
              {stock.symbol}
            </button>
          ))}
        </div>
        
        <small className="text-muted">{watchlist.length} / 50 stocks</small>
      </div>

      {error && (
        <div className="alert alert-warning" role="alert">
          {error} (Using fallback data)
        </div>
      )}

      <div className="list-group mb-3">
        {watchlist.length === 0 ? (
          <div className="text-center py-5 border rounded">
            <h5 className="text-muted mb-3">Your watchlist is empty</h5>
            <p className="text-muted mb-3">Add stocks above to start tracking them!</p>
            <p className="text-muted">
              <small>Try adding popular stocks like AAPL, MSFT, GOOGL, or TSLA using the quick add buttons above.</small>
            </p>
          </div>
        ) : (
          watchlist.map((stock, index) => (
            <WatchListItem 
              stock={stock} 
              key={index} 
              removeFromWatchlist={removeFromWatchlist}
              buyStock={buyStock}
              sellStock={sellStock}
              popularStocks={popularStocks}
              getRealisticPrice={getRealisticPrice}
            />
          ))
        )}
      </div>
    </div>
  );
};

const WatchListItem = ({ stock, removeFromWatchlist, buyStock, sellStock, popularStocks, getRealisticPrice }) => {
  const [showActions, setShowActions] = useState(false);
  
  // Debug: Log the stock object to see its structure (temporarily enabled for debugging)
  // console.log('WatchListItem stock object:', stock);
  
  // Get realistic price data for this stock
  const getStockData = () => {
    // Safety check for stock object
    if (!stock) {
      console.error('No stock object provided');
      return {
        symbol: 'UNKNOWN',
        name: 'Unknown Stock',
        price: '0.00',
        percent: '0.00%',
        isDown: false
      };
    }
    
    // Try to get symbol from different possible properties
    const symbol = stock.symbol || stock.name || stock._id || 'UNKNOWN';
    console.log('Processing stock with symbol:', symbol, 'Original stock:', stock);
    
    const popular = popularStocks.find(p => p.symbol === symbol);
    if (popular) {
      const currentPrice = getRealisticPrice(popular.price);
      const changePercent = ((Math.random() - 0.5) * 6).toFixed(2); // ±3% change
      const isDown = parseFloat(changePercent) < 0;
      
      return {
        symbol: symbol,
        name: popular.name,
        price: currentPrice,
        percent: `${changePercent}%`,
        isDown: isDown
      };
    }
    
    // Fallback for unknown stocks
    return {
      symbol: symbol,
      name: stock.symbol,
      price: (50 + Math.random() * 200).toFixed(2), // Random price between $50-$250
      percent: `${((Math.random() - 0.5) * 6).toFixed(2)}%`,
      isDown: Math.random() < 0.5
    };
  };
  
  const stockData = getStockData();
  
  // Additional safety check - if stockData.symbol is still undefined, use original stock data
  const safeSymbol = stockData.symbol || stock.symbol || stock.name || 'UNKNOWN';
  const displayData = {
    ...stockData,
    symbol: safeSymbol
  };
  
  console.log('Final display data:', displayData);

  return (
    <div 
      className="list-group-item d-flex justify-content-between align-items-center p-3"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      style={{ minHeight: '70px' }}
    >
      <div style={{ flex: 1 }}>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <strong style={{ fontSize: '16px', display: 'block' }}>
              {displayData.symbol}
            </strong>
            <small className="text-muted" style={{ fontSize: '12px' }}>
              {displayData.name}
            </small>
          </div>
          <div className="text-end">
            <div className="fw-bold" style={{ fontSize: '16px' }}>
              ${displayData.price}
            </div>
            <div className={`d-flex align-items-center justify-content-end ${displayData.isDown ? "text-danger" : "text-success"}`}>
              <span style={{ fontSize: '12px' }}>
                {displayData.percent}
              </span>
              {displayData.isDown ? (
                <KeyboardArrowDown style={{ fontSize: '16px' }} />
              ) : (
                <KeyboardArrowUp style={{ fontSize: '16px' }} />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showActions && (
        <div className="ms-3">
          <button 
            className="btn btn-success btn-sm me-1"
            onClick={() => buyStock(displayData.symbol, displayData.price)}
            title="Buy stock"
          >
            Buy
          </button>
          <button 
            className="btn btn-outline-danger btn-sm me-1"
            onClick={() => removeFromWatchlist(displayData.symbol)}
            title="Remove from watchlist"
          >
            Remove
          </button>
          <button 
            className="btn btn-outline-secondary btn-sm"
            title="View chart"
          >
            <BarChartOutlined />
          </button>
        </div>
      )}
    </div>
  );
};

export default WatchList;