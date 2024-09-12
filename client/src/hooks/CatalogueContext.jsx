// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const CatalogueContext = createContext();

// export const CatalogueProvider = ({ children }) => {
//   const [tshirts, setTshirts] = useState([]);
//   const [totalTshirts, setTotalTshirts] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [sidebardata, setSidebardata] = useState({
//     searchTerm: "",
//     sort: "a-z",
//     filter: "in-stock",
//   });

//   const pageSize = 13;

//   const fetchTShirts = async (
//     searchTerm = "",
//     sort = "a-z",
//     filter = "in-stock"
//   ) => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/tshirt/all-tshirts`, {
//         params: {
//           page: currentPage,
//           limit: pageSize,
//           searchTerm,
//           sort,
//           filter,
//         },
//       });
//       setTshirts(data.tShirts);
//       setTotalPages(Math.ceil(data.total / pageSize));
//       setTotalTshirts(data.total);
//     } catch (error) {
//       console.error("Error fetching t-shirt data:", error.message);
//       toast.error("Failed to fetch T-shirts.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTShirts(sidebardata.searchTerm, sidebardata.sort, sidebardata.filter);
//   }, [currentPage, sidebardata]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // const handleFilterChange = (filter) => {
//   //   setSidebardata((prevData) => ({ ...prevData, filter }));
//   // };

//   const handleFilterChange = (filter) => {
//     setSidebardata((prevData) => ({ ...prevData, filter }));
//     navigate(
//       `?searchTerm=${sidebardata.searchTerm}&sort=${sidebardata.sort}&filter=${filter}`
//     );
//   };

//   const handleSortChange = (sort) => {
//     setSidebardata((prevData) => ({ ...prevData, sort }));
//   };

//   return (
//     <CatalogueContext.Provider
//       value={{
//         tshirts,
//         totalTshirts,
//         currentPage,
//         totalPages,
//         loading,
//         handlePageChange,
//         handleFilterChange,
//         handleSortChange,
//         sidebardata,
//       }}
//     >
//       {children}
//     </CatalogueContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CatalogueContext = createContext();

export const CatalogueProvider = ({ children }) => {
  const [tshirts, setTshirts] = useState([]);
  const [totalTshirts, setTotalTshirts] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    sort: "a-z",
    filter: "in-stock",
  });

  const pageSize = 13;

  const fetchTShirts = async (
    searchTerm = "",
    sort = "a-z",
    filter = "in-stock"
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/tshirt/all-tshirts`, {
        params: {
          page: currentPage,
          limit: pageSize,
          searchTerm,
          sort,
          filter,
        },
      });
      setTshirts(data.tShirts);
      setTotalPages(Math.ceil(data.total / pageSize));
      setTotalTshirts(data.total);
    } catch (error) {
      console.error("Error fetching t-shirt data:", error.message);
      toast.error("Failed to fetch T-shirts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTShirts(sidebardata.searchTerm, sidebardata.sort, sidebardata.filter);
  }, [currentPage, sidebardata]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (filter) => {
    setSidebardata((prevData) => ({ ...prevData, filter }));
    fetchTShirts(sidebardata.searchTerm, sidebardata.sort, filter);
  };

  const handleSortChange = (sort) => {
    setSidebardata((prevData) => ({ ...prevData, sort }));
    fetchTShirts(sidebardata.searchTerm, sort, sidebardata.filter);
  };

  return (
    <CatalogueContext.Provider
      value={{
        tshirts,
        totalTshirts,
        currentPage,
        totalPages,
        loading,
        handlePageChange,
        handleFilterChange,
        handleSortChange,
        sidebardata
      }}
    >
      {children}
    </CatalogueContext.Provider>
  );
};

