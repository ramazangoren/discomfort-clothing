import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ProductDetailsContext = createContext();

export const ProductDetailsProvider = ({ children }) => {
  const [tshirtDetails, setTshirtDetails] = useState([]);
  const [imagesPopup, setImagesPopup] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const { currentUser } = useContext(AuthContext);

  const getTshirtDetails = async (name, tshirtId) => {
    try {
      const res = await axios.get(`/api/tshirt/product/${name}/${tshirtId}`);
      setTshirtDetails(res.data.tShirt);
    } catch (error) {
      console.log(error.message);
    } finally {
      setDataLoading(false);
    }
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    let userId = currentUser?._id;
    if (userId) {
      try {
        await axios.post(`/api/cart/add`, { itemId, userId });
        console.log("Added to cart");
      } catch (error) {
        console.error("Error adding to cart", error);
      }
    }
  };

  return (
    <ProductDetailsContext.Provider
      value={{
        tshirtDetails,
        imagesPopup,
        dataLoading,
        cartItems,
        setImagesPopup,
        getTshirtDetails,
        addToCart,
      }}
    >
      {children}
    </ProductDetailsContext.Provider>
  );
};
