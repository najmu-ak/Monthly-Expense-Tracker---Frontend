import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function ViewExpense() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/expense/all")
            .then(response => setExpenses(response.data))
            .catch(() => alert("Error fetching expenses"));
    }, []);

    return (
        <div className="view-expense">
            <h2 style={{ color: 'black' }}>Expense History</h2>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr style={{ backgroundColor: "#f2f2f2" }} key={index}>
                            <td>{expense.date}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>{expense.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default ViewExpense;