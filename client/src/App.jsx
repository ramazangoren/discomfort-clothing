import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

import MyList from "./pages/MyList/MyList";
import Catalogue from "./pages/Catalogue/Catalogue";
import Contact from "./pages/Contact/Contact";

import ProductDetails from "./pages/Products/ProductDetails";
import AddClothes from "./pages/AddClothes/AddClothes";
import Profile from "./pages/Profile/Profile";

import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";
import Cart from "./pages/Cart/Cart";

import CustomerOrders from "./pages/CustomerOrders/CustomerOrders";
import MyOrders from "./pages/MyOrders/MyOrders";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";

import Verify from "./pages/Verify/Verify";

import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./hooks/AuthContext";
// axios.defaults.baseURL = "https://discomfort-clothing.onrender.com";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/register" || location.pathname === "/login";
  return (
    <div>
      <ToastContainer />
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Catalogue />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:name/:tshirtId" element={<ProductDetails />} />
        <Route path="/add-clothes" element={<AddClothes />} />
        <Route path="/list" element={<MyList />} />
        <Route path="/profile/:userName/:id" element={<Profile />}></Route>
        <Route path="/update-product/:id" element={<UpdateProduct />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/customer-orders" element={<CustomerOrders />}></Route>
        <Route path="/my-orders" element={<MyOrders />}></Route>
        <Route path="/order" element={<PlaceOrder />}></Route>
        <Route path="/verify" element={<Verify />}></Route>
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default App;
