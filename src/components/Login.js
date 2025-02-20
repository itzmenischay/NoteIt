import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../styles/Login.css";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://noteit-backend-m2h5.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("userName", json.name); // Store username
      window.dispatchEvent(new Event("storage")); // Trigger event for Navbar
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>NoteIt - Login</title>
      </Helmet>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Login to NoteIt</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                value={credentials.email}
                onChange={onChange}
                id="email"
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                value={credentials.password}
                onChange={onChange}
                id="password"
                name="password"
                required
              />
            </div>
            <button type="submit" className="login-button btn-primary">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
