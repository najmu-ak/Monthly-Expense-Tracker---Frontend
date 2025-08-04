import './App.css';
import React, { useState } from 'react';
import AddExpense from './AddExpense';
import ViewExpense from './ViewExpense';
import MonthlySavings from './MonthlySavings';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [expenses, setExpenses] = useState([]);

  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar text-white p-3">
          <h2 className="text-center mb-4">Expense Tracker</h2>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/" className="nav-link text-white">
                <i className="bi bi-house-door me-2"></i> DashBoard
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/addExpense" className="nav-link text-white">
                <i className="bi bi-plus-circle me-2"></i> Add Expense
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/viewExpense" className="nav-link text-white">
                <i className="bi bi-card-list me-2"></i> View Expenses
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link to="/monthlySavings" className="nav-link text-white">
                <i className="bi bi-wallet2 me-2"></i> Savings
              </Link>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="content flex-grow-1 p-4">
          <div className="topbar bg-light p-3 mb-4 shadow-sm rounded">
            <h3 className="mb-0">Welcome to Expense Tracker</h3>
          </div>

          <Routes>
            <Route path="/addExpense" element={<AddExpense expenses={expenses} setExpenses={setExpenses} />} />
            <Route path="/viewExpense" element={<ViewExpense />} />
            <Route path="/" />
            <Route path="/monthlySavings" element={<MonthlySavings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
