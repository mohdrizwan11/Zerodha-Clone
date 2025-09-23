const express = require('express');
const router = express.Router();
const marketStackService = require('../services/marketStackService');
const { protect } = require('../middleware/authMiddleware');
const { UserWatchlistModel } = require('../models/UserWatchlistModel');
const { UserHoldingModel } = require('../models/UserHoldingModel');

// Get user's personal watchlist with real market data
router.get('/user-watchlist', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's watchlist symbols
    const userWatchlist = await UserWatchlistModel.find({ userId });
    
    if (userWatchlist.length === 0) {
      // Return empty array for new users - let them add their own stocks
      return res.json({ 
        success: true, 
        data: [],
        count: 0,
        message: 'No stocks in watchlist. Add some stocks to get started!' 
      });
    }
    
    // Get market data for user's watchlist symbols
    const symbols = userWatchlist.map(item => item.symbol);
    const marketData = await marketStackService.getEndOfDayData(symbols);
    
    // Merge user preferences with market data
    const enrichedData = marketData.map(stock => {
      const userStock = userWatchlist.find(item => item.symbol === stock.symbol);
      return {
        ...stock,
        alertPrice: userStock?.alertPrice,
        notes: userStock?.notes,
        addedAt: userStock?.addedAt
      };
    });
    
    res.json({ 
      success: true, 
      data: enrichedData,
      count: enrichedData.length 
    });
  } catch (error) {
    console.error('Error fetching user watchlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch user watchlist',
      error: error.message 
    });
  }
});

// Add stock to user's watchlist
router.post('/user-watchlist', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { symbol, alertPrice, notes } = req.body;
    
    if (!symbol) {
      return res.status(400).json({ 
        success: false, 
        message: 'Symbol is required' 
      });
    }
    
    // Check if symbol already exists in user's watchlist
    const existingItem = await UserWatchlistModel.findOne({ userId, symbol: symbol.toUpperCase() });
    if (existingItem) {
      return res.status(400).json({ 
        success: false, 
        message: 'Stock already in watchlist' 
      });
    }
    
    const watchlistItem = new UserWatchlistModel({
      userId,
      symbol: symbol.toUpperCase(),
      alertPrice,
      notes
    });
    
    await watchlistItem.save();
    
    res.status(201).json({ 
      success: true, 
      data: watchlistItem,
      message: 'Stock added to watchlist' 
    });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add stock to watchlist',
      error: error.message 
    });
  }
});

// Remove stock from user's watchlist
router.delete('/user-watchlist/:symbol', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { symbol } = req.params;
    
    const result = await UserWatchlistModel.findOneAndDelete({ 
      userId, 
      symbol: symbol.toUpperCase() 
    });
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: 'Stock not found in watchlist' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Stock removed from watchlist' 
    });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to remove stock from watchlist',
      error: error.message 
    });
  }
});

// Get user's holdings with real market data
router.get('/user-holdings', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's holdings
    const userHoldings = await UserHoldingModel.find({ userId });
    
    if (userHoldings.length === 0) {
      return res.json({ 
        success: true, 
        data: [],
        count: 0,
        message: 'No holdings found' 
      });
    }
    
    // Get current market data for holdings
    const symbols = userHoldings.map(holding => holding.symbol);
    const marketData = await marketStackService.getEndOfDayData(symbols);
    
    // Calculate P&L and enrich data
    const enrichedHoldings = userHoldings.map(holding => {
      const currentStock = marketData.find(stock => stock.symbol === holding.symbol);
      const currentPrice = currentStock ? parseFloat(currentStock.price) : holding.averagePrice;
      const currentValue = currentPrice * holding.quantity;
      const investment = holding.averagePrice * holding.quantity;
      const pnl = currentValue - investment;
      const pnlPercentage = investment > 0 ? (pnl / investment * 100).toFixed(2) : 0;
      
      return {
        _id: holding._id,
        symbol: holding.symbol,
        quantity: holding.quantity,
        averagePrice: holding.averagePrice,
        currentPrice: currentPrice,
        currentValue: currentValue.toFixed(2),
        pnl: pnl.toFixed(2),
        pnlPercentage: pnlPercentage,
        notes: holding.notes,
        // Keep backward compatibility
        name: holding.symbol,
        qty: holding.quantity,
        avg: holding.averagePrice,
        price: currentPrice
      };
    });
    
    res.json({ 
      success: true, 
      data: enrichedHoldings,
      count: enrichedHoldings.length 
    });
  } catch (error) {
    console.error('Error fetching user holdings:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch user holdings',
      error: error.message 
    });
  }
});

// Add holding to user's portfolio
router.post('/user-holdings', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { symbol, quantity, averagePrice, notes } = req.body;
    
    if (!symbol || !quantity || !averagePrice) {
      return res.status(400).json({ 
        success: false, 
        message: 'Symbol, quantity, and average price are required' 
      });
    }
    
    const holding = new UserHoldingModel({
      userId,
      symbol: symbol.toUpperCase(),
      quantity: parseFloat(quantity),
      averagePrice: parseFloat(averagePrice),
      notes
    });
    
    await holding.save();
    
    res.status(201).json({ 
      success: true, 
      data: holding,
      message: 'Holding added successfully' 
    });
  } catch (error) {
    console.error('Error adding holding:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add holding',
      error: error.message 
    });
  }
});

// Update watchlist item
router.put('/user-watchlist/:symbol', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { symbol } = req.params;
    const { alertPrice, notes } = req.body;
    
    const updatedItem = await UserWatchlistModel.findOneAndUpdate(
      { userId, symbol: symbol.toUpperCase() },
      { alertPrice, notes },
      { new: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Stock not found in watchlist' 
      });
    }
    
    res.json({ 
      success: true, 
      data: updatedItem,
      message: 'Watchlist item updated successfully' 
    });
  } catch (error) {
    console.error('Error updating watchlist item:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update watchlist item',
      error: error.message 
    });
  }
});

// Delete holding from user's portfolio
router.delete('/user-holdings/:id', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    
    const result = await UserHoldingModel.findOneAndDelete({ 
      _id: id, 
      userId 
    });
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: 'Holding not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Holding deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting holding:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete holding',
      error: error.message 
    });
  }
});

// Update holding
router.put('/user-holdings/:id', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { quantity, averagePrice, notes } = req.body;
    
    const updatedHolding = await UserHoldingModel.findOneAndUpdate(
      { _id: id, userId },
      { quantity, averagePrice, notes },
      { new: true }
    );
    
    if (!updatedHolding) {
      return res.status(404).json({ 
        success: false, 
        message: 'Holding not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: updatedHolding,
      message: 'Holding updated successfully' 
    });
  } catch (error) {
    console.error('Error updating holding:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update holding',
      error: error.message 
    });
  }
});

// Fallback routes for general market data (non-user specific)
router.get('/watchlist', async (req, res) => {
  try {
    const watchlistData = await marketStackService.getWatchlistData();
    res.json({ 
      success: true, 
      data: watchlistData,
      count: watchlistData.length 
    });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch watchlist data',
      error: error.message 
    });
  }
});

// Get holdings data with real market prices
router.get('/market-holdings', async (req, res) => {
  try {
    const holdingsData = await marketStackService.getHoldingsData();
    res.json({ 
      success: true, 
      data: holdingsData 
    });
  } catch (error) {
    console.error('Error fetching holdings:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch holdings data',
      error: error.message 
    });
  }
});

// Get positions data with real market prices
router.get('/market-positions', async (req, res) => {
  try {
    const positionsData = await marketStackService.getPositionsData();
    res.json({ 
      success: true, 
      data: positionsData 
    });
  } catch (error) {
    console.error('Error fetching positions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch positions data',
      error: error.message 
    });
  }
});

// Get specific stock data
router.get('/stock/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const stockData = await marketStackService.getEndOfDayData([symbol.toUpperCase()]);
    
    if (stockData && stockData.length > 0) {
      res.json({ 
        success: true, 
        data: stockData[0] 
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Stock not found' 
      });
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch stock data',
      error: error.message 
    });
  }
});

// Get intraday data for a stock
router.get('/intraday/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const intradayData = await marketStackService.getIntradayData([symbol.toUpperCase()]);
    
    res.json({ 
      success: true, 
      data: intradayData 
    });
  } catch (error) {
    console.error('Error fetching intraday data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch intraday data',
      error: error.message 
    });
  }
});

// Test endpoint to verify API connectivity
router.get('/test-connection', async (req, res) => {
  try {
    const testData = await marketStackService.getEndOfDayData(['AAPL']);
    res.json({ 
      success: true, 
      message: 'MarketStack API connection successful',
      data: testData 
    });
  } catch (error) {
    console.error('API connection test failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'MarketStack API connection failed',
      error: error.message 
    });
  }
});

module.exports = router;