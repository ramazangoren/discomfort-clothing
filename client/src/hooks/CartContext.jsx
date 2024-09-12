import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (currentUser?._id) {
  //     fetchLists();
  //   }
  // }, [currentUser?._id]);

  const fetchLists = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/cart/get`, {
        params: { userId: currentUser._id },
      });
      if (response.data.success) {
        setCartData(response.data.cartItems);
      } else {
        toast.error("Failed to fetch cart data.");
      }
    } catch (error) {
      toast.error("Error fetching cart data.");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      fetchLists();
    }
  }, [currentUser]);

  // if (cartData.length > 0) {
  //   useEffect(() => {
  //     if (currentUser?._id) {
  //       fetchLists();
  //     }
  //   }, [currentUser]);
  // }

  const calcTotalPrice = () => {
    return cartData.reduce((total, item) => {
      const price = item.newPrice || item.oldPrice;
      return total + price * item.quantity;
    }, 0);
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/cart/remove`, {
        data: { userId: currentUser._id, itemId },
      });
      fetchLists(); // Refresh the cart data after removal
    } catch (error) {
      toast.error("Failed to remove item from cart.");
      console.error(error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        fetchLists,
        handleRemoveFromCart,
        cartData,
        loading,
        currentUser,
        calcTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
