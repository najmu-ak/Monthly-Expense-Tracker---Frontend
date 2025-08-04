import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function ViewExpense() {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");

    // **1. Load Current Month Expenses on Page Load**
    useEffect(() => {
        axios.get("http://localhost:8080/api/expense/current-month")
            .then(response => {
                const sorted = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setExpenses(sorted);
            })
            .catch(() => setExpenses([]));
    }, []);

    // **2. Filter by Month**
    const handleMonthFilter = (selectedMonth) => {
        setMonth(selectedMonth);
        if (!selectedMonth) {
            // if month is cleared, load current month again
            axios.get("http://localhost:8080/api/expense/current-month")
                .then(response => {
                    const sorted = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setExpenses(sorted);
                })
                .catch(() => setExpenses([]));
            return;
        }

        axios.get(`http://localhost:8080/api/expense/month/${selectedMonth}`)
            .then(response => {
                const sorted = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setExpenses(sorted);
            })
            .catch(() => setExpenses([]));
    };

    // **3. Category & Date Filter**
    const handleFilter = () => {
        let url = "http://localhost:8080/api/expense/filter?";
        if (category) url += `category=${category}&`;
        if (date) url += `date=${date}`;
        axios.get(url)
            .then((response) => {
                const sorted = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setExpenses(sorted);
            })
            .catch(() => setExpenses([]));
    };

    // **4. Calculate Total**
    const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);

    return (
        <div className="view-expense">
            <h2 style={{ color: "black" }}>Expense History</h2>
            <h4 className="text-start mt-3">
                Total: <span className="text-success">Rs.{totalAmount}</span>
            </h4>

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
                <select
                    className="form-control me-2"
                    value={month}
                    onChange={(e) => handleMonthFilter(e.target.value)}
                >
                    <option value="">Filter by Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
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
                    {expenses.length > 0 ? (
                        expenses.map((expense, index) => (
                            <tr style={{ backgroundColor: "#f2f2f2" }} key={index}>
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
                                                ...expense,
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                No records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ViewExpense;
