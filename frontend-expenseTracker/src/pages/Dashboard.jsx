import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";
import "../styles/main.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [userName, setUserName] = useState("");
  console.log(userName)
  const [form, setForm] = useState({
    title: "", amount: "", category: "food"
  });

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expenses`, { headers });
      setExpenses(response.data.expenses);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/profile`, { headers });
      setUserName(response.data.user.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchProfile();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/expenses`, form, { headers });
      setForm({ title: "", amount: "", category: "food" });
      fetchExpenses();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/expenses/${id}`, { headers });
      fetchExpenses();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div>
          <h2 className="dash-title">Dashboard</h2>
          <p className="dash-user">Welcome back, {userName}</p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      <div className="metrics">
        <div className="metric">
          <p className="metric-label">Total spent</p>
          <p className="metric-value">₹{total}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Expenses</p>
          <p className="metric-value">{expenses.length}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Latest</p>
          <p className="metric-value" style={{fontSize:"14px", paddingTop:"4px"}}>
            {expenses[0]?.title || "—"}
          </p>
        </div>
      </div>

      <div className="dash-grid">
        <div className="card">
          <p className="card-title">Add expense</p>
          <form onSubmit={handleAdd}>
            <div className="field">
              <label>Title</label>
              <input type="text" placeholder="e.g. Groceries" value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})} />
            </div>
            <div className="field">
              <label>Amount (₹)</label>
              <input type="number" placeholder="500" value={form.amount}
                onChange={(e) => setForm({...form, amount: e.target.value})} />
            </div>
            <div className="field">
              <label>Category</label>
              <select value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}>
                <option value="food">Food</option>
                <option value="entertainment">Entertainment</option>
                <option value="grocery">Grocery</option>
                <option value="electricity bill">Electricity bill</option>
                <option value="outing">Outing</option>
                <option value="shopping">Shopping</option>
              </select>
            </div>
            <button className="btn-primary" type="submit">Add expense</button>
          </form>
        </div>

        <div className="card">
          <p className="card-title">Recent expenses</p>
          {expenses.length === 0 && (
            <p style={{fontSize:"13px", color:"#888"}}>No expenses yet. Add one!</p>
          )}
          {expenses.map((expense) => (
            <div className="expense-row" key={expense._id}>
              <div className="expense-info">
                <span className="expense-name">{expense.title}</span>
                <span className="expense-cat">{expense.category}</span>
              </div>
              <div className="expense-right">
                <span className="expense-amt">₹{expense.amount}</span>
                <button className="btn-del" onClick={() => handleDelete(expense._id)}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;