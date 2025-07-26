import './App.css';
import ExpenseTracker from './ExpenseTracker';
import ViewExpense from './ViewExpense';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
      <div className="App">
      <header className="App-header">
    <Router>
      <nav>
        <Link to="/addExpense"><button>Add Expense</button></Link> | <Link to="/ViewExpense"><button>View Expenses</button></Link>
      </nav>
    <Routes>
      <Route path="/addExpense" element={<ExpenseTracker />} />
      <Route path="/viewExpense" element={<ViewExpense />} />
    </Routes>
    </Router>
    </header>
    </div>
    
  );
}

export default App;
