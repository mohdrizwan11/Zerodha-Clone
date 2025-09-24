# Zirodha Trading Platform

A comprehensive trading platform inspired by Zerodha, featuring a complete trading ecosystem with frontend and backend applications.

## 🏗️ Project Structure

```
Zirodha/
├── frontend/          # Main website with landing pages and trading interface
├── backend/           # API server with authentication and data management
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## 📱 Applications Overview

### 1. Frontend (`/frontend`)
- **Technology**: React.js
- **Purpose**: Main website with landing pages, authentication, and trading dashboard
- **Features**:
  - Landing pages (Home, About, Pricing, Products, Support)
  - User authentication (Login/Signup)
  - Protected routes
  - Integrated trading dashboard functionality
  - Portfolio overview and management
  - Holdings and positions tracking
  - Order placement and management
  - Market watchlist
  - Responsive design with Font Awesome icons

### 2. Backend (`/backend`)
- **Technology**: Node.js with Express
- **Purpose**: API server providing authentication and data services
- **Features**:
  - User authentication with JWT
  - RESTful API endpoints
  - Database models for users, holdings, positions, orders
  - Market data integration
  - Middleware for authentication
  - API testing collection (Thunder Client)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd Zirodha
   ```

2. **Install Dependencies**
   
   For Frontend:
   ```bash
   cd frontend
   npm install
   ```
   
   For Backend:
   ```bash
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   PORT=3001
   JWT_SECRET=your_jwt_secret_here
   MONGODB_URI=your_mongodb_connection_string
   MARKET_STACK_API_KEY=your_market_stack_api_key
   ```

4. **Run the Applications**
   
   Start Backend (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   
   Start Frontend (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

## 🔧 Development Workflow

### Making Changes
1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test them

3. Stage and commit your changes:
   ```bash
   git add .
   git commit -m "Add: your feature description"
   ```

4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

### Useful Git Commands
- Check status: `git status`
- View commit history: `git log --oneline`
- See changes: `git diff`
- Undo changes: `git checkout -- filename`
- Create branch: `git checkout -b branch-name`
- Switch branch: `git checkout branch-name`

## 📂 Detailed File Structure

### Frontend Structure
```
frontend/
├── public/
│   ├── index.html
│   ├── font-awesome/     # Icon library
│   └── media/images/     # Static images
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── ProtectedRoute.js
│   │   ├── TradingDashboard.js
│   │   └── trading/      # Trading-specific components
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── landing_page/
│   │   ├── home/
│   │   ├── about/
│   │   ├── pricing/
│   │   ├── products/
│   │   ├── login/
│   │   ├── signup/
│   │   └── support/
│   ├── index.js
│   └── index.css
└── package.json
```

### Backend Structure
```
backend/
├── controllers/
│   └── AuthController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── UserModel.js
│   ├── HoldingsModel.js
│   ├── PositionsModel.js
│   ├── OrdersModels.js
│   ├── UserHoldingModel.js
│   └── UserWatchlistModel.js
├── routes/
│   ├── authRoutes.js
│   ├── dataRoutes.js
│   └── marketRoutes.js
├── schemas/
│   ├── HoldingsSchema.js
│   ├── OrdersSchema.js
│   └── PositionsSchema.js
├── services/
│   └── marketStackService.js
├── util/
│   └── SecretToken.js
├── index.js
└── package.json
```



## 🛡️ Security Notes

- Environment variables are properly excluded from Git
- JWT tokens are used for authentication
- Sensitive data is not committed to the repository
- API keys and database credentials should be kept in `.env` files

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 API Documentation

The backend provides the following main endpoints:
- `/auth/*` - Authentication routes
- `/data/*` - Data management routes  
- `/market/*` - Market data routes

Detailed API documentation can be found in the Thunder Client collection file.

## 🐛 Troubleshooting

### Common Issues
1. **Port conflicts**: Make sure ports 3000 and 3001 are available
2. **Dependencies**: Run `npm install` in each directory if modules are missing
3. **Environment variables**: Ensure `.env` file is properly configured in backend

### Getting Help
- Check the console for error messages
- Verify all services are running
- Ensure database connections are working
- Check network connectivity for API calls

## 📄 License

This project is for educational and development purposes.

---

**Created with ❤️ for learning full-stack development**