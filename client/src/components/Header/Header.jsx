import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext.jsx";
import Drawer from "./Drawer";
import { CiSearch, CiShoppingBasket } from "react-icons/ci";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./Header.css";
import logo from "../../assets/log-.png";
import { CartContext } from "../../hooks/CartContext.jsx";

const Header = () => {
  const { currentUser, signout } = useContext(AuthContext);
  const { cartData } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    signout();
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const urlParams = new URLSearchParams(location.search); // Use location.search
  //   urlParams.set("searchTerm", searchTerm);
  //   navigate(`/collections?${urlParams.toString()}`);
  // };

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const searchTermFromUrl = urlParams.get("searchTerm");
  //   if (searchTermFromUrl) {
  //     setSearchTerm(searchTermFromUrl);
  //   }
  // }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting search with term:', searchTerm);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    navigate(`/collections?${urlParams.toString()}`, { replace: true });
  };
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      console.log('Updating search term from URL:', searchTermFromUrl);
      setSearchTerm(searchTermFromUrl);
    } else {
      setSearchTerm("");
    }
  }, [location.search]);
  

  const [searchOpen, setSearchOpen] = useState(false);
  const userName = `${currentUser?.name || "User"}-${
    currentUser?.lastname || ""
  }`;

  return (
    <div className="main-header">
      <div className="container-header">
        <div className="header">
          <Link to="/" className="header-logo">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="header-icons">
            <CiSearch
              className="icons-header"
              onClick={() => setSearchOpen(true)}
            />
            <Link to="/cart">
              <CiShoppingBasket className="icons-header" />
              <span className={cartData?.length > 0 ? "dot" : ""}></span>
            </Link>
            {currentUser ? (
              <div className="user-avatar-container">
                <LazyLoadImage src={currentUser?.avatar} alt="User Avatar" />
                <div className="hover-content">
                  <NavLink onClick={handleSignOut}>Logout</NavLink>
                  <NavLink to={`/profile/${userName}/${currentUser._id}`}>
                    Profile
                  </NavLink>
                  <NavLink to="/my-orders">My Orders</NavLink>
                  {currentUser.isAdmin && (
                    <>
                      <NavLink to="/add-clothes">Add Clothes</NavLink>
                      <NavLink to="/list">My List</NavLink>
                      <NavLink to="/customer-orders">Customer Orders</NavLink>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="Sign-in">
                <NavLink to="/login">Sign in</NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="navLinks">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/collections"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Catalogue
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
      </div>
      {searchOpen && (
        <Drawer
          setSearchOpen={setSearchOpen}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Header;
