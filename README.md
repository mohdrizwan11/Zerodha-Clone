# 🚀 Zerodha Clone - Full Stack Trading Platform

A comprehensive full-stack trading platform inspired by Zerodha, featuring complete trading functionality with user authentication, portfolio management, and real-time market data integration.

## 🌐 Live Demo
- **Frontend (React)**: https://zirodha-eleven.vercel.app/
- **Backend API (Node.js)**: https://zerodha-backend-g85e.onrender.com/

## ✨ Key Features

### 🔐 Authentication System
- User registration and login
- JWT-based secure authentication
- Protected routes and middleware
- Session management

### 📊 Trading Dashboard
- Real-time portfolio overview
- Holdings and positions tracking
- Interactive watchlist management
- Buy/Sell order placement
- Profit/Loss calculations

### 🎨 User Interface
- Responsive design for all devices
- Modern Material-UI components
- Interactive charts and graphs
- Intuitive navigation and UX
- Font Awesome icons integration

### 🔗 API Integration
- RESTful API architecture
- MongoDB database integration
- Market data services
- Real-time data updates
- Error handling and validation

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

## � Deployment

This project is deployed using modern cloud platforms:

### Backend Deployment (Render)
- **Platform**: Render.com
- **Database**: MongoDB Atlas
- **Environment**: Node.js production environment
- **Live URL**: https://zerodha-backend-g85e.onrender.com/

### Frontend Deployment (Vercel)
- **Platform**: Vercel
- **Build**: Optimized React production build
- **CDN**: Global edge network for fast loading
- **Live URL**: https://zirodha-eleven.vercel.app/

### Environment Variables
The application uses environment variables for secure configuration:
- `MONGO_URL`: MongoDB Atlas connection string
- `JWT_SECRET`: JSON Web Token secret key
- `SESSION_SECRET`: Session management secret
- `REACT_APP_API_URL`: Frontend API base URL

## Thanks to Apna College 

## 🤝 Connect & Contact

**K Mohammad Rizwan**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mohdrizwan11)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mohdrizwan11/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kmohammadrizwan11@gmail.com)

- **GitHub**: https://github.com/mohdrizwan11
- **LinkedIn**: https://www.linkedin.com/in/mohdrizwan11/  
- **Email**: kmohammadrizwan11@gmail.com

Feel free to reach out for collaboration, feedback, or any questions about this project!

## ⭐ Show Your Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!

## �📄 License

This project is for educational and development purposes. Built with ❤️ by K Mohammad Rizwan.

---

**Created with ❤️ for learning full-stack development**