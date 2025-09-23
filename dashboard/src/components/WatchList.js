import React, { useState, useContext, useEffect } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";
import { useAuth } from "../contexts/AuthContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined, 
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch real market data from our API
  useEffect(() => {
    const fetchWatchlistData = async () => {
      try {
        setLoading(true);
        // Try authenticated endpoint first, then fallback
        let response;
        try {
          response = await axios.get('http://localhost:4000/api/market/user-watchlist', {
            withCredentials: true
          });
        } catch (authError) {
          // Fallback to basic watchlist endpoint
          response = await axios.get('http://localhost:4000/api/market/watchlist', {
            withCredentials: true
          });
        }
        
        if (response.data.success) {
          setWatchlist(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching watchlist data:', err);
        setError(err.message);
        // Fallback to local data if API fails
        try {
          const { watchlist: fallbackData } = await import('../data/data');
          setWatchlist(fallbackData);
        } catch (importErr) {
          console.error('Failed to load fallback data:', importErr);
          // Create a basic fallback if even data.js fails
          setWatchlist([
            { name: "AAPL", price: 150.00, percent: "+1.5%", isDown: false },
            { name: "MSFT", price: 280.00, percent: "+0.8%", isDown: false },
            { name: "GOOGL", price: 2500.00, percent: "-0.5%", isDown: true }
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchWatchlistData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const labels = watchlist.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="watchlist-container">
        <div className="loading">Loading market data...</div>
      </div>
    );
  }

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:AAPL, MSFT, GOOGL, TSLA"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      {error && (
        <div className="error-message" style={{color: 'red', fontSize: '12px', margin: '5px 0'}}>
          {error} (Using fallback data)
        </div>
      )}

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="down" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleBuyClick}
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
