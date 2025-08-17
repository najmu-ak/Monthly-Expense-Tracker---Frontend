import { useState } from "react";
import axios from "axios";


function AddExpense({ expenses, setExpenses }) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const expenseData = { date, amount, category, note };  // <-- Changed name

    axios.post("http://localhost:8080/api/expense/add", expenseData)
      .then(response => {
        setExpenses([response.data, ...expenses]);
        alert("Expense added successfully");
        setDate(""); setAmount(""); setCategory(""); setNote(""); // Reset form
      })
      .catch(() => alert("Error adding expense"));
  }

  return (
    <div className="container">
      <div className="card p-4 shadow">
        <h3 className="text-center">Daily Expense Tracker</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="dd-mm-yyyy" required />
          <input className="form-control mb-3" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
          <input className="form-control mb-3" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
          <input className="form-control mb-3" type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" />
          
          <button className="btn btn-dark w-100">Add Expense</button>
        </form>
      </div>
    </div>

  );
}

export default AddExpense;
