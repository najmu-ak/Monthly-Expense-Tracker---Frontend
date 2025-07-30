import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './App.css';
function ViewExpense() {
    const [expenses, setExpenses] = useState([]);

useEffect(() => {
    axios.get(`http://localhost:8080/api/expense/all`)
        .then(response => {
            const sorted = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setExpenses(sorted);
        })
        .catch(() => alert("Error fetching expenses"));
}, []);

    return (
        // <Frangment className= "view-expense">
        <div className="view-expense">
            <h2 style={{ color: 'black' }}>Expense History</h2>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Note</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr style={{ backgroundColor: "#f2f2f2" }} key={index}>
                            <td>{expense.date}</td>
                            <td>Rs.{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>{expense.note}</td>
                            <td>
                                <i class="bi bi-pencil-fill me-2" onClick={() => {
                                    const updatedExpense = {
                                        date: prompt("Enter new date", expense.date),
                                        amount: prompt("Enter new amount", expense.amount),
                                        category: prompt("Enter new category", expense.category),
                                        note: prompt("Enter new note", expense.note)
                                    };

                                    axios.put(`http://localhost:8080/api/expense/update/${expense.id}`, updatedExpense)
                                        .then(() => {
                                            setExpenses(expenses.map((exp, i) => i === index ? updatedExpense : exp));
                                            alert("Updated successfully");
                                        })
                                        .catch(() => alert("Error updating expense"));
                                }}></i>

                                <i class="bi bi-trash3 me-2" onClick={() => {
                                    axios.delete(`http://localhost:8080/api/expense/delete/${expense.id}`)
                                        .then(() => {
                                            setExpenses(expenses.filter((_, i) => i !== index));
                                            alert("deleted successfully");
                                        })
                                        .catch(() => alert("Error deleting expense"));
                                }}></i>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        // </Frangment>
    );

}

export default ViewExpense;