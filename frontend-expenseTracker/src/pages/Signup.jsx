import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import BASE_URL from "../config";
import "../styles/main.css";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [credentials, setCredentials] = useState({
    name: "", email: "", password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, credentials);
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="brand-name">spend<span className="dot">wise</span> <span>/ track smarter</span></p>
        <h1 className="form-title">Create account</h1>
        <p className="form-sub">Start tracking your expenses today.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Full name</label>
            <input type="text" placeholder="Nikhil Tayde" name="name"
              value={credentials.name}
              onChange={(e) => setCredentials({...credentials, [e.target.name]: e.target.value})} />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="nikhil@gmail.com" name="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, [e.target.name]: e.target.value})} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" name="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, [e.target.name]: e.target.value})} />
          </div>
          {message && <p style={{fontSize:"13px", color:"#e24b4a", margin:"8px 0"}}>{message}</p>}
          <button className="btn-primary" type="submit">Create account</button>
        </form>
        <p className="link-row">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
};

export default Signup;