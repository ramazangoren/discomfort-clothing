import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "./CartContext";
import { AuthContext } from "./AuthContext";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

    // this is to place the order
  const { cartData, calcTotalPrice, fetchLists } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const [orderData, setOrderData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const totalPrice = calcTotalPrice().toFixed(2);

  const updateAddress = (name, value) => {
    setOrderData((prevState) => ({ ...prevState, [name]: value }));
  };

  const placeOrder = async () => {
    const data = {
      userId: currentUser._id,
      address: orderData,
      items: cartData,
      amount: parseFloat(totalPrice) + 2, // Add delivery charge
    };

    try {
      const response = await axios.post(`/api/order/place`, data);
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        throw new Error("Error placing the order");
      }
    } catch (error) {
      console.error(
        "Failed to place order:",
        error.response?.data || error.message
      );
      alert(error.response?.data.message || error.message);
    }
  };

  // this is to get user's orders
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.post("/api/order/userorders");
      setMyOrders(response.data.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };



  //   this is to get customer orders
  const [customerOrders, setCustomerOrders] = useState([]);
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`/api/order/list`);
      if (response.data.data) {
        setCustomerOrders(response.data.data);
          setLoading(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders. Please try again later.");
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`/api/order/status`, {
        orderId,
        status: e.target.value,
      });
      setLoading(true);

      if (response.data.success) {
        await fetchAllOrders();
        setLoading(false);
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      toast.error("Failed to update order status. Please try again later.");
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orderData,
        totalPrice,
        updateAddress,
        placeOrder,
        fetchLists,

        // to get user orders
        fetchOrders,
        loading,
        myOrders,

        //   this is to get customer orders
        fetchAllOrders,
        customerOrders,
        setCustomerOrders,
        statusHandler,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
