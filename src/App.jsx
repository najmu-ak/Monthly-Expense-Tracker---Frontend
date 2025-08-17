import './App.css';
import React, { useState } from 'react';
import AddExpense from './AddExpense';
import ViewExpense from './ViewExpense';
import CreateNewFile from './CreateNewFile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [expenses, setExpenses] = useState([]);

  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar text-white p-3 bg-dark" style={{ width: "250px" }}>
          <h2 className="text-center mb-4">Expense Tracker</h2>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/" className="nav-link text-white">
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link to="/CreateNewFile" className="nav-link text-white">
                <i className="bi bi-plus-circle me-2"></i> Create New Expense
              </Link>
            </li>

            {/* Dropdown for New Expense */}
            <li className="nav-item dropdown mb-2">
              <button
                className="btn btn-dark dropdown-toggle w-100 text-start"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
               Add Expense
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/addExpense" className="dropdown-item">
                    Add New Expense
                  </Link>
                </li>
              </ul>
            </li>


                        {/* Dropdown for View Expenses */}
            <li className="nav-item dropdown mb-2">
              <button
                className="btn btn-dark dropdown-toggle w-100 text-start"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                View Expenses
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/viewExpense" className="dropdown-item">
                    Monthly Expenses
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="content flex-grow-1 p-4">
          <div className="topbar bg-light p-3 mb-4 shadow-sm rounded">
            <h3 className="mb-0">Welcome to Expense Tracker</h3>
          </div>

          <Routes>
            <Route
              path="/addExpense"
              element={<AddExpense expenses={expenses} setExpenses={setExpenses} />}
            />
            <Route path="/viewExpense" element={<ViewExpense />} />
            <Route path="/" element={<h4>Dashboard Overview</h4>} />
            <Route path="/CreateNewFile" element={<CreateNewFile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
