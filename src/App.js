import './App.css';
import ExpenseTracker from './ExpenseTracker';
import viewExpense from './ViewExpense';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ExpenseTracker />
        <viewExpense />

      </header>
    </div>
  );
}

export default App;
