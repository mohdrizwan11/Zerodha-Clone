const axios = require('axios');

const MARKETSTACK_API_KEY = '0ad71c23a85e1d4edec0eee5b1a8baff';
const MARKETSTACK_BASE_URL = 'https://api.marketstack.com/v2';

class MarketStackService {
  constructor() {
    this.apiKey = MARKETSTACK_API_KEY;
    this.baseUrl = MARKETSTACK_BASE_URL;
  }

  // Get end-of-day data for multiple symbols
  async getEndOfDayData(symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN']) {
    try {
      const symbolsString = symbols.join(',');
      const response = await axios.get(`${this.baseUrl}/eod`, {
        params: {
          access_key: this.apiKey,
          symbols: symbolsString,
          limit: 1, // Get latest data only
        }
      });

      if (response.data && response.data.data) {
        return this.formatMarketData(response.data.data);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching market data:', error.response?.data || error.message);
      return this.getFallbackData(symbols);
    }
  }

  // Get real-time/intraday data (if available on your plan)
  async getIntradayData(symbols = ['AAPL']) {
    try {
      const symbolsString = symbols.join(',');
      const response = await axios.get(`${this.baseUrl}/intraday`, {
        params: {
          access_key: this.apiKey,
          symbols: symbolsString,
          interval: '1min',
          limit: 1,
        }
      });

      if (response.data && response.data.data) {
        return this.formatMarketData(response.data.data);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching intraday data:', error.response?.data || error.message);
      // Fallback to end-of-day data
      return this.getEndOfDayData(symbols);
    }
  }

  // Format market data to match your dashboard structure
  formatMarketData(data) {
    return data.map(stock => {
      const changePercent = ((stock.close - stock.open) / stock.open * 100).toFixed(2);
      const isDown = parseFloat(changePercent) < 0;
      
      return {
        symbol: stock.symbol,  // Keep original symbol
        name: stock.symbol,    // Also set name for backward compatibility
        price: stock.close,
        percent: `${changePercent}%`,
        isDown: isDown,
        open: stock.open,
        high: stock.high,
        low: stock.low,
        volume: stock.volume,
        date: stock.date
      };
    });
  }

  // Fallback data when API fails
  getFallbackData(symbols) {
    return symbols.map(symbol => ({
      symbol: symbol,        // Keep original symbol
      name: symbol,          // Also set name for backward compatibility
      price: (Math.random() * 1000 + 100).toFixed(2),
      percent: `${(Math.random() * 10 - 5).toFixed(2)}%`,
      isDown: Math.random() < 0.5,
      open: (Math.random() * 1000 + 100).toFixed(2),
      high: (Math.random() * 1000 + 100).toFixed(2),
      low: (Math.random() * 1000 + 100).toFixed(2),
      volume: Math.floor(Math.random() * 1000000),
      date: new Date().toISOString().split('T')[0]
    }));
  }

  // Get market data for Indian stocks (if available) or US stocks as default
  async getWatchlistData() {
    // Indian stock symbols (if supported by marketstack)
    const indianSymbols = ['INFY', 'TCS', 'RELIANCE', 'WIPRO', 'HDFCBANK'];
    
    // US stock symbols as fallback
    const usSymbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN', 'META', 'NFLX', 'NVDA'];
    
    try {
      // Try Indian symbols first
      let data = await this.getEndOfDayData(indianSymbols);
      
      // If Indian data is not available, use US symbols
      if (!data || data.length === 0) {
        data = await this.getEndOfDayData(usSymbols);
      }
      
      return data;
    } catch (error) {
      console.error('Error in getWatchlistData:', error);
      return this.getFallbackData(usSymbols);
    }
  }

  // Get holdings data with calculated P&L
  async getHoldingsData() {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN'];
    const marketData = await this.getEndOfDayData(symbols);
    
    return marketData.map((stock, index) => {
      const qty = Math.floor(Math.random() * 10) + 1;
      const avgPrice = parseFloat(stock.price) * (0.8 + Math.random() * 0.4); // Random avg price
      const currentPrice = parseFloat(stock.price);
      const netChange = ((currentPrice - avgPrice) / avgPrice * 100).toFixed(2);
      
      return {
        name: stock.name,
        qty: qty,
        avg: avgPrice.toFixed(2),
        price: currentPrice,
        net: `${netChange}%`,
        day: stock.percent,
        isLoss: parseFloat(netChange) < 0
      };
    });
  }

  // Get positions data
  async getPositionsData() {
    const symbols = ['AAPL', 'MSFT'];
    const marketData = await this.getEndOfDayData(symbols);
    
    return marketData.map((stock, index) => {
      const qty = Math.floor(Math.random() * 5) + 1;
      const avgPrice = parseFloat(stock.price) * (0.9 + Math.random() * 0.2);
      const currentPrice = parseFloat(stock.price);
      const netChange = ((currentPrice - avgPrice) / avgPrice * 100).toFixed(2);
      
      return {
        product: 'CNC',
        name: stock.name,
        qty: qty,
        avg: avgPrice.toFixed(2),
        price: currentPrice,
        net: `${netChange}%`,
        day: stock.percent,
        isLoss: parseFloat(netChange) < 0
      };
    });
  }
}

module.exports = new MarketStackService();