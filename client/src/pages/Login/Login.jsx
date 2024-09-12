import "./Login.css";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signin, loading, error } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(formData);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="login-register-card-background">
      <p>Log in</p>
      <form onSubmit={handleSubmit} className="login-register-input-tag-styles">
        <input
          type="email"
          id="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type={isPasswordVisible ? "text" : "password"}
          id="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <div className="eyeIcon" onClick={togglePasswordVisibility}>
          <span>{isPasswordVisible ? <FaEyeSlash /> : <FaEye />}</span>
        </div>
        <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>
        <div>
          Don't have an account?
          <Link to={"/register"}>Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
