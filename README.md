# Expense Tracker

A full-stack expense tracking application built with React, GraphQL, Apollo Client, Express, and MongoDB.

## Features

- **User Authentication**: Sign up, login, and logout functionality
- **Transaction Management**: Create, read, update, and delete transactions
- **Categorization**: Categorize transactions as income or expense
- **Payment Types**: Track payments made via cash or card
- **Visual Analytics**: View transaction data in a doughnut chart
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React
- Apollo Client for GraphQL
- React Router for navigation
- Chart.js for data visualization
- Tailwind CSS for styling

### Backend
- Node.js
- Express
- GraphQL with Apollo Server
- MongoDB with Mongoose
- Passport.js for authentication
- Express Session for session management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies for both client and server
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

4. Start the development servers
```bash
# Start the server (from the server directory)
npm run dev

# Start the client (from the client directory)
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## API Documentation

### GraphQL Queries

- `GetAuthenticatedUser`: Get the currently authenticated user
- `GetTransactions`: Get all transactions for the authenticated user
- `GetTransaction`: Get a specific transaction by ID
- `GetCategoryStatistics`: Get statistics for transaction categories

### GraphQL Mutations

- `SignUp`: Create a new user account
- `Login`: Authenticate a user
- `Logout`: End the user's session
- `CreateTransaction`: Create a new transaction
- `UpdateTransaction`: Update an existing transaction
- `DeleteTransaction`: Delete a transaction

## Acknowledgments

- [Apollo GraphQL](https://www.apollographql.com/)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/) 
