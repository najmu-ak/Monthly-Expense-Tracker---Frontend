import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function ViewExpense() {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/expense/all`)
            .then(response => {
                const sorted = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setExpenses(sorted);
            })
            .catch(() => alert("Error fetching expenses"));
    }, []);

    const handleFilter = () => {
        let url = "http://localhost:8080/api/expense/filter?";
        if (category) url += `category=${category}&`;
        if (date) url += `date=${date}`;
        // url = url.endsWith("&") ? url.slice(0, -1) : url; // Remove last &

        axios.get(url)
            .then((response) => {
                const sorted = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setExpenses(sorted);
            })
            .catch(() => alert("Error filtering expenses"));
    };

    return (
        <div className="view-expense">
            <h2 style={{ color: "black" }}>Expense History</h2>
            {/* Filter Section */}
            <div className="mb-3 d-flex" style={{ gap: "10px" }}>
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Filter by category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleFilter}>
                    Filter
                </button>
            </div>

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
                        <tr style={{ backgroundColor: "#f2f2f2" }} key={expense.id || index}>
                            <td>{expense.date}</td>
                            <td>Rs.{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>{expense.note}</td>
                            <td>
                                {/* Edit Icon */}
                                <i
                                    className="bi bi-pencil-fill btn btn-success btn-sm me-2"
                                    onClick={() => {
                                        const updatedExpense = {
                                            ...expense, // keep id
                                            date: prompt("Enter new date", expense.date),
                                            amount: prompt("Enter new amount", expense.amount),
                                            category: prompt("Enter new category", expense.category),
                                            note: prompt("Enter new note", expense.note),
                                        };

                                        axios.put(
                                            `http://localhost:8080/api/expense/update/${expense.id}`,
                                            updatedExpense
                                        )
                                            .then(() => {
                                                setExpenses(expenses.map((exp, i) => i === index ? updatedExpense : exp));
                                                alert("Updated successfully");
                                            })
                                            .catch(() => alert("Error updating expense"));
                                    }}
                                ></i>

                                {/* Delete Icon */}
                                <i
                                    className="btn btn-danger btn-sm bi bi-trash"
                                    onClick={() => {
                                        axios.delete(`http://localhost:8080/api/expense/delete/${expense.id}`)
                                            .then(() => {
                                                setExpenses(expenses.filter((_, i) => i !== index));
                                                alert("Deleted successfully");
                                            })
                                            .catch(() => alert("Error deleting expense"));
                                    }}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewExpense;
