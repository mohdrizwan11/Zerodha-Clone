import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import WatchList from './trading/WatchList';
import Holdings from './trading/Holdings';
import Positions from './trading/Positions';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

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
              <WatchList />
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
                      <h4>$12,456.78</h4>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Today's P&L</small>
                      <h6 className="text-success">+$234.56</h6>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Total P&L</small>
                      <h6 className="text-success">+$1,456.78</h6>
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

export default Dashboard;