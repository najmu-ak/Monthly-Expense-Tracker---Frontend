import { useState } from "react";
import axios from "axios";
import './ExpenseTracker.js';
import './App.js';
function ExpenseTracker() {
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [note, setNote] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const expenseData = { date, amount, category, note };  // <-- Changed name

        axios.post("http://localhost:8080/api/expense/add", expenseData)
            .then(() => {
                alert("Expense added successfully");
                setDate("");
                setAmount("");
                setCategory("");
                setNote("");
            })
            .catch(() => {
                alert("Error adding expense");
            });
    }

    return (
        <div className="expense-tracker">
            <form onSubmit={handleSubmit}>
                <h3>Monthly Expense Tracker </h3>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" />
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
                <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" />
                <br />
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
}

export default ExpenseTracker;
