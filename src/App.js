import './App.css';
import ExpenseTracker from './ExpenseTracker';
import ViewExpense from './ViewExpense';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <h1 style={{ color: "#363636" }}>Expense Tracker Application</h1>
          <nav>
            <Link to="/"><button className='btn btn-success'>Home</button></Link> |
            <Link to="/addExpense"><button className='btn btn-success'>Add Expense</button></Link> |
            <Link to="/viewExpense"><button className='btn btn-success'>View Expenses</button></Link>
          </nav>
          <br />
          <Routes>
            <Route path="/addExpense" element={<ExpenseTracker expenses={expenses} setExpenses={setExpenses} />} />
            <Route path="/viewExpense" element={<ViewExpense expenses={expenses} setExpenses={setExpenses} />} />
            <Route path="/" element={<div>Welcome to Expense Tracker</div>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
