const mongoose = require('mongoose');

const UserWatchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  alertPrice: {
    type: Number,
    default: null
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

// Compound index to ensure a user can't add the same symbol twice
UserWatchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });

const UserWatchlistModel = mongoose.model('UserWatchlist', UserWatchlistSchema);

module.exports = { UserWatchlistModel };