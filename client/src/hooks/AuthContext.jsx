import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load the current user from cookies or local storage
    const loadUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        setCurrentUser(res.data);
      } catch (err) {
        setCurrentUser(null);
      }
    };
    loadUser();
  }, []);

  const signup = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", formData);
      if (res.data.success) {
        setLoading(false);
        setError(null);
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        setLoading(false);
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast.error(error.message);
    }
  };

  const signin = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signin", formData);
      if (res.data.success) {
        setLoading(false);
        setCurrentUser(res.data.user); // Access user data
        setError(null);
        toast.success("Login successful!");
        navigate("/"); // Redirect to home page
      } else {
        setLoading(false);
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast.error(error.message);
    }
  };

  const signout = async () => {
    try {
      const response = await axios.post(
        "/api/auth/signout",
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        setCurrentUser(null);
        toast.success("Logged out successfully!");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error.message);
      toast.error("Failed to log out.");
    }
  };

  const googleSignupSignin = async (formData) => {
    try {
      const res = await axios.post("/api/auth/google", formData);
      if (res.data.success) {
        setCurrentUser(res.data);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        signup,
        signin,
        signout,
        googleSignupSignin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
