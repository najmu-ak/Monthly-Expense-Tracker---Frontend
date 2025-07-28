import './App.css';
import ExpenseTracker from './ExpenseTracker';
import ViewExpense from './ViewExpense';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
      <div className="App">
      <header className="App-header">
    <Router>
      <h1 style={{color: "#363636"}}>Expense Tracker Application</h1>
      <nav>
        <Link to="/addExpense"><button>Add Expense</button></Link> <b style={{color:"#363636"}}>|</b> <Link to="/ViewExpense"><button>View Expenses</button></Link>
      </nav>
      <br />
      
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
