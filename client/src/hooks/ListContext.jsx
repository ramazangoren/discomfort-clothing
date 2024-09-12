import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [tshirts, setTshirts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 13; // Number of items per page
  const [loadingSpinner, setLoadingSpinner] = useState(false);


  // const getAllTshirtDetails = async (name, tshirtId) => {
  //   try {
  //     const res = axios
  //     .get(`/api/tshirt/all-tshirts?page=${currentPage}&limit=${pageSize}`)
  //     setTshirts(res.data.tShirts);
  //     setTotalPages(Math.ceil(res.data.total / pageSize));
  //       setLoadingSpinner(true);
  //   } catch (error) {
  //     console.error("Error fetching t-shirt data:", error.message);
  //   }
  // };

  // useEffect(() => {
  //   axios
  //     .get(`/api/tshirt/all-tshirts?page=${currentPage}&limit=${pageSize}`)
  //     .then(({ data }) => {
  //       setTshirts(data.tShirts);
  //       setTotalPages(Math.ceil(data.total / pageSize));
  //       setLoadingSpinner(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching t-shirt data:", error.message);
  //     });
  // }, [currentPage]);

  // const fetchTShirts = async (numberOfTshirtsToBeShown) => {
  //   try {
  //     const { data } = await axios.get(
  //       `/api/tshirt/all-tshirts?page=${currentPage}&limit=${pageSize}`
  //     );
  //     setTshirts(data.tShirts.slice(0, numberOfTshirtsToBeShown));
  //     setTotalPages(Math.ceil(data.total / pageSize));
  //     setLoadingSpinner(true);
  //   } catch (error) {
  //     console.error("Error fetching t-shirt data:", error.message);
  //   }
  // };

  const fetchTShirts = async (numberOfTshirtsToBeShown) => {
    try {
      const { data } = await axios.get(
        `/api/tshirt/all-tshirts?page=${currentPage}&limit=${pageSize}`
      );
      
      // Shuffle the T-shirts array to make it random
      const shuffledTShirts = data.tShirts.sort(() => 0.5 - Math.random());
  
      // Slice to only show the specified number of random T-shirts
      setTshirts(shuffledTShirts.slice(0, numberOfTshirtsToBeShown));
      
      setTotalPages(Math.ceil(data.total / pageSize));
      setLoadingSpinner(true);
    } catch (error) {
      console.error("Error fetching t-shirt data:", error.message);
    }
  };
  

  // useEffect(() => {
  //   fetchTShirts();
  // }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`/api/tshirt/list/${id}`);
      setTshirts(tshirts.filter((tshirt) => tshirt._id !== id)); // Remove the deleted item from state
      toast.success("Item deleted successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete item.");
    }
  };

  return (
    <ListContext.Provider
      value={{
        tshirts,
        currentPage,
        totalPages,
        loadingSpinner,
        handlePageChange,
        deleteItem,
        fetchTShirts
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
