import React, { useState, useContext } from "react"; // ✅ added React + useState
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // ✅ useState now imported
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ POST to backend for login
      const res = await api.post("/users/login", { email, password });

      // ✅ Save user & token globally
      login(res.data.user, res.data.token);

      alert("Login successful!");
      navigate("/"); // redirect to upload page
    } catch (err) {
      console.error("❌ Login error:", err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="bx bxs-user"></i>
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>

        <div className="forgot-link">
          <Link to="#">Forgot Password?</Link>
        </div>

        <button type="submit" className="btn">
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
