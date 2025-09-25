import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import WatchList from './trading/WatchList';
import Holdings from './trading/Holdings';
import Positions from './trading/Positions';
import { DoughnutChart } from './trading/DoughnutChart';

function TradingDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch holdings data for overview
  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/market/user-holdings`, {
          withCredentials: true
        });
        
        if (response.data.success) {
          setHoldings(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching holdings:', err);
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

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Prepare chart data for holdings using backend data
  const chartData = {
    labels: holdings.map(holding => holding.symbol || 'Unknown'),
    datasets: [
      {
        label: "Current Holdings Value",
        data: holdings.map(holding => {
          return parseFloat(holding.currentValue || 0);
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 20, 147, 0.7)",
          "rgba(0, 255, 127, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 20, 147, 1)",
          "rgba(0, 255, 127, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Calculate portfolio value using backend current values
  const portfolioValue = holdings.reduce((total, holding) => {
    return total + parseFloat(holding.currentValue || 0);
  }, 0);

  const renderContent = () => {
    switch(activeTab) {
      case 'watchlist':
        return <WatchList />;
      case 'holdings':
        return <Holdings />;
      case 'positions':
        return <Positions />;
      default:
        return (
          <div className="row">
            <div className="col-md-8">
              <Holdings />
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5>Quick Stats</h5>
                </div>
                <div className="card-body">
                  <div className="row text-center">
                    <div className="col-12 mb-3">
                      <h6 className="text-success">Portfolio Value</h6>
                      <h4>${portfolioValue.toFixed(2)}</h4>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Total Holdings</small>
                      <h6 className="text-info">{holdings.length}</h6>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Total Shares</small>
                      <h6 className="text-info">{holdings.reduce((total, holding) => total + (holding.quantity || 0), 0)}</h6>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card mt-3">
                <div className="card-header">
                  <h5>Market Status</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Market Status:</span>
                    <span className="badge bg-success">Open</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span>Last Updated:</span>
                    <small className="text-muted">{new Date().toLocaleTimeString()}</small>
                  </div>
                </div>
              </div>

              {/* Portfolio Chart */}
              <div className="card mt-3">
                <div className="card-header">
                  <h5>Portfolio Distribution</h5>
                </div>
                <div className="card-body">
                  {holdings.length > 0 ? (
                    <DoughnutChart data={chartData} />
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted">No holdings yet</p>
                      <p className="text-muted">Buy some stocks to see your portfolio distribution!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid mt-3">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
              <div>
                <h3 className="mb-0">Zerodha Trading Dashboard</h3>
                <small>Welcome back, {user?.username || user?.name}!</small>
              </div>
              <button 
                className="btn btn-outline-light"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="row mb-3">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'watchlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('watchlist')}
              >
                Watchlist
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'holdings' ? 'active' : ''}`}
                onClick={() => setActiveTab('holdings')}
              >
                Holdings
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'positions' ? 'active' : ''}`}
                onClick={() => setActiveTab('positions')}
              >
                Positions
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Content Area */}
      <div className="row">
        <div className="col-12">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default TradingDashboard;