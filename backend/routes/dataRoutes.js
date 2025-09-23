// backend/routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const { HoldingsModel } = require('../models/HoldingsModel');
const { PositionsModel } = require('../models/PositionsModel');
const { UserHoldingModel } = require('../models/UserHoldingModel');

// Example: get all holdings (protected)
router.get('/holdings', protect, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find(); // you might want to filter by user
    res.json({ success: true, data: holdings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// create a holding (protected) - optionally associate with req.user._id
router.post('/holdings', protect, async (req, res) => {
  try {
    const newHolding = new HoldingsModel({
      ...req.body,
      // owner: req.user._id  // uncomment if you add owner field to schema
    });
    await newHolding.save();
    res.status(201).json({ success: true, data: newHolding });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: 'Bad request' });
  }
});

router.get('/positions', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's holdings and treat them as positions
    const userHoldings = await UserHoldingModel.find({ userId });
    
    // Transform holdings to positions format
    const positions = userHoldings.map(holding => ({
      _id: holding._id,
      product: 'CNC', // Cash and Carry
      name: holding.symbol,
      qty: holding.quantity,
      avg: holding.averagePrice,
      price: holding.averagePrice, // Current price (would be updated with real market data)
      net: '0.00%', // P&L percentage (would be calculated with real market data)
      day: '0.00%', // Day change (would be updated with real market data)
      isLoss: false
    }));
    
    res.json({ 
      success: true, 
      data: positions,
      count: positions.length,
      message: positions.length === 0 ? 'No positions found. Buy some stocks to see them here.' : undefined
    });
  } catch (err) {
    console.error('Error fetching positions:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch positions' });
  }
});

module.exports = router;