import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({});
  const { signup, loading, error } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="login-register-card-background">
      <p>Register</p>
      <form onSubmit={handleSubmit} className="login-register-input-tag-styles">
        <input
          type="text"
          id="name"
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          id="lastname"
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          id="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <button disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
        <div>
          Already have an account?
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
