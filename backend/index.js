require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/zirodha';

const { HoldingsModel } = require('./models/HoldingsModel');
const { PositionsModel } = require('./models/PositionsModel');
const { UserWatchlistModel } = require('./models/UserWatchlistModel');
const { UserHoldingModel } = require('./models/UserHoldingModel');
const User = require('./models/UserModel');

// Import routes
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const marketRoutes = require('./routes/marketRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000', 
      'http://localhost:3001',
      'https://zirodha-eleven.vercel.app',
      'https://zirodha-one.vercel.app'
    ];
    
    console.log('CORS check - Request origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('CORS - No origin, allowing request');
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      console.log('CORS - Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200,
  preflightContinue: false
}));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// Explicit OPTIONS handler for preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Test endpoint to verify CORS is working
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'CORS is working!', 
    timestamp: new Date().toISOString(),
    origin: req.headers.origin 
  });
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/market', marketRoutes);

// Check if dataRoutes exist, otherwise use current data endpoints
try {
  app.use('/api', dataRoutes);
} catch (error) {
  console.log('dataRoutes not found, using inline endpoints');
}

app.get('/addHoldings', async (req, res)  => {
    let tempHoldings = [
    {
        name: "BHARTIARTL",
        qty: 2,
        avg: 538.05,
        price: 541.15,
        net: "+0.58%",
        day: "+2.99%",
    },
    {
        name: "HDFCBANK",
        qty: 2,
        avg: 1383.4,
        price: 1522.35,
        net: "+10.04%",
        day: "+0.11%",
    },
    {
        name: "HINDUNILVR",
        qty: 1,
        avg: 2335.85,
        price: 2417.4,
        net: "+3.49%",
        day: "+0.21%",
    },
    {
        name: "INFY",
        qty: 1,
        avg: 1350.5,
        price: 1555.45,
        net: "+15.18%",
        day: "-1.60%",
        isLoss: true,
    },
    {
        name: "ITC",
        qty: 5,
        avg: 202.0,
        price: 207.9,
        net: "+2.92%",
        day: "+0.80%",
    },
    {
        name: "KPITTECH",
        qty: 5,
        avg: 250.3,
        price: 266.45,
        net: "+6.45%",
        day: "+3.54%",
    },
    {
        name: "M&M",
        qty: 2,
        avg: 809.9,
        price: 779.8,
        net: "-3.72%",
        day: "-0.01%",
        isLoss: true,
    },
    {
        name: "RELIANCE",
        qty: 1,
        avg: 2193.7,
        price: 2112.4,
        net: "-3.71%",
        day: "+1.44%",
    },
    {
        name: "SBIN",
        qty: 4,
        avg: 324.35,
        price: 430.2,
        net: "+32.63%",
        day: "-0.34%",
        isLoss: true,
    },
    {
        name: "SGBMAY29",
        qty: 2,
        avg: 4727.0,
        price: 4719.0,
        net: "-0.17%",
        day: "+0.15%",
    },
    {
        name: "TATAPOWER",
        qty: 5,
        avg: 104.2,
        price: 124.15,
        net: "+19.15%",
        day: "-0.24%",
        isLoss: true,
    },
    {
        name: "TCS",
        qty: 1,
        avg: 3041.7,
        price: 3194.8,
        net: "+5.03%",
        day: "-0.25%",
        isLoss: true,
    },
    {
        name: "WIPRO",
        qty: 4,
        avg: 489.3,
        price: 577.75,
        net: "+18.08%",
        day: "+0.32%",
    },
];

    tempHoldings.forEach((item) => {
        let newHolding = new HoldingsModel({
            name: item.name,
            qty: item.qty,
            avg: item.avg,
            price: item.price,
            net: item.net,
            day: item.day,
        });
        newHolding.save();
    }); 
    res.send("Done");
});

app.get('/addPositions', async (req, res)  => {
    let tempPositions = [
    {
            product: "CNC",
            name: "EVEREADY",
            qty: 2,
            avg: 316.27,
            price: 312.35,
            net: "+0.58%",
            day: "-1.24%",
            isLoss: true,
        },
        {
            product: "CNC",
            name: "JUBLFOOD",
            qty: 1,
            avg: 3124.75,
            price: 3082.65,
            net: "+10.04%",
            day: "-1.35%",
            isLoss: true,
        },
    ];

    tempPositions.forEach((item) => {
        let newPosition = new PositionsModel({
            product: item.product,
            name: item.name,
            qty: item.qty,
            avg: item.avg,
            price: item.price,
            net: item.net,
            day: item.day,
            isLoss: item.isLoss,
        });
        newPosition.save();
    });
    res.send("Done!");
});

app.get('/addUsers', async (req, res) => {
    let tempUsers = [
        {
            email: "kmohammadrizwan11@gmail.com",
            username: "mohrizwan",
            password: "password123", // Will be hashed automatically by UserModel
            name: "K Mohammad Rizwan",
            phone: "8008619681"
        },
        {
            email: "demo@zerodha.com",
            username: "demo_user",
            password: "demo123",
            name: "Demo User",
            phone: "9876543210"
        },
        {
            email: "trader@example.com",
            username: "trader01",
            password: "trader123",
            name: "Active Trader",
            phone: "8765432109"
        },
        {
            email: "investor@example.com",
            username: "investor",
            password: "invest123",
            name: "Long Term Investor",
            phone: "7654321098"
        }
    ];

    try {
        // Clear existing users first (optional - remove if you want to keep existing)
        // await User.deleteMany({});

        for (const item of tempUsers) {
            try {
                // Check if user already exists
                const existingUser = await User.findOne({ email: item.email });
                if (!existingUser) {
                    let newUser = new User({
                        email: item.email,
                        username: item.username,
                        password: item.password,
                        name: item.name,
                        phone: item.phone
                    });
                    await newUser.save();
                    console.log(`User ${item.email} added successfully`);
                } else {
                    console.log(`User ${item.email} already exists`);
                }
            } catch (error) {
                console.log(`Error saving user ${item.email}:`, error.message);
            }
        }
        res.send("Sample users added!");
    } catch (error) {
        console.error('Error in addUsers:', error);
        res.status(500).send("Error adding users");
    }
});


app.get('/allHoldings' , async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});


app.get('/allPositions' , async (req, res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});

app.get('/allUsers' , async (req, res) => {
    let allUsers = await User.find({}).select('-password'); // Exclude password for security
    res.json(allUsers);
});

// Add sample watchlist data for a user
app.get('/addSampleWatchlist', async (req, res) => {
    try {
        // Get the first user to add watchlist data
        const user = await User.findOne({});
        if (!user) {
            return res.status(404).send("No users found. Please add users first using /addUsers");
        }

        const sampleWatchlist = [
            { symbol: "AAPL", alertPrice: 150.00, notes: "Apple Inc." },
            { symbol: "MSFT", alertPrice: 280.00, notes: "Microsoft Corporation" },
            { symbol: "GOOGL", alertPrice: 120.00, notes: "Alphabet Inc." },
            { symbol: "TSLA", alertPrice: 200.00, notes: "Tesla Inc." },
            { symbol: "AMZN", alertPrice: 130.00, notes: "Amazon.com Inc." },
            { symbol: "META", alertPrice: 300.00, notes: "Meta Platforms Inc." },
            { symbol: "NFLX", alertPrice: 400.00, notes: "Netflix Inc." },
            { symbol: "NVDA", alertPrice: 450.00, notes: "NVIDIA Corporation" },
            { symbol: "CRM", alertPrice: 200.00, notes: "Salesforce Inc." },
            { symbol: "ORCL", alertPrice: 100.00, notes: "Oracle Corporation" }
        ];

        let addedCount = 0;
        for (const item of sampleWatchlist) {
            try {
                // Check if already exists
                const existing = await UserWatchlistModel.findOne({ 
                    userId: user._id, 
                    symbol: item.symbol 
                });
                
                if (!existing) {
                    await UserWatchlistModel.create({
                        userId: user._id,
                        symbol: item.symbol,
                        alertPrice: item.alertPrice,
                        notes: item.notes
                    });
                    addedCount++;
                }
            } catch (error) {
                console.log(`Error adding ${item.symbol}:`, error.message);
            }
        }

        res.send(`Sample watchlist added! ${addedCount} new stocks added for user ${user.email}`);
    } catch (error) {
        console.error('Error adding sample watchlist:', error);
        res.status(500).send("Error adding sample watchlist");
    }
});

// Add sample holdings data for a user
app.get('/addSampleHoldings', async (req, res) => {
    try {
        // Get the first user to add holdings data
        const user = await User.findOne({});
        if (!user) {
            return res.status(404).send("No users found. Please add users first using /addUsers");
        }

        const sampleHoldings = [
            { symbol: "AAPL", quantity: 10, averagePrice: 145.00, notes: "Apple Holdings" },
            { symbol: "MSFT", quantity: 5, averagePrice: 275.00, notes: "Microsoft Holdings" },
            { symbol: "GOOGL", quantity: 3, averagePrice: 115.00, notes: "Google Holdings" },
            { symbol: "TSLA", quantity: 2, averagePrice: 195.00, notes: "Tesla Holdings" },
            { symbol: "AMZN", quantity: 4, averagePrice: 125.00, notes: "Amazon Holdings" }
        ];

        let addedCount = 0;
        for (const item of sampleHoldings) {
            try {
                // Check if already exists
                const existing = await UserHoldingModel.findOne({ 
                    userId: user._id, 
                    symbol: item.symbol 
                });
                
                if (!existing) {
                    await UserHoldingModel.create({
                        userId: user._id,
                        symbol: item.symbol,
                        quantity: item.quantity,
                        averagePrice: item.averagePrice,
                        notes: item.notes
                    });
                    addedCount++;
                }
            } catch (error) {
                console.log(`Error adding ${item.symbol}:`, error.message);
            }
        }

        res.send(`Sample holdings added! ${addedCount} new holdings added for user ${user.email}`);
    } catch (error) {
        console.error('Error adding sample holdings:', error);
        res.status(500).send("Error adding sample holdings");
    }
});

// Get all user watchlist data
app.get('/allUserWatchlist', async (req, res) => {
    try {
        let allWatchlist = await UserWatchlistModel.find({}).populate('userId', 'email username');
        res.json(allWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all user holdings data
app.get('/allUserHoldings', async (req, res) => {
    try {
        let allHoldings = await UserHoldingModel.find({}).populate('userId', 'email username');
        res.json(allHoldings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    port: PORT
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    mongoConnected: mongoose.connection.readyState === 1
  });
});

// Simple test endpoint for debugging
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    cors: req.headers.origin,
    userAgent: req.headers['user-agent']
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`App is started on port ${PORT}`);
      console.log('Environment:', process.env.NODE_ENV);
      console.log('MongoDB URL configured:', !!MONGO_URL);
      console.log('JWT Secret configured:', !!(process.env.TOKEN_KEY || process.env.JWT_SECRET));
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });