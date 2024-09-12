import { useContext } from "react";
import { CatalogueContext } from "../../hooks/CatalogueContext";
import Filters from "./Filters";
import PaginationCatalogue from "./PaginationCatalogue";
import TShirtCart from "./TShirtCart";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./Catalogue.css";

const Catalogue = () => {
  const {
    tshirts,
    totalTshirts,
    currentPage,
    totalPages,
    loading,
    handlePageChange,
    handleFilterChange,
    handleSortChange,
    sidebardata,
  } = useContext(CatalogueContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="new-arrivals">
        <p>
          <span>NEW</span> ARRIVALS
        </p>
      </div>
      <Filters
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        totalTshirts={totalTshirts}
        currentSort={sidebardata.sort}
      />
      {tshirts.length > 0 ? (
        <TShirtCart tshirts={tshirts} />
      ) : (
        <div className="not-found-container">
          <div className="not-found-content">
            <img
              src="https://example.com/not-found-icon.png"
              alt="Not Found"
              className="not-found-icon"
            />
            <p className="not-found-text">Nothing t-shirts Found</p>
          </div>
        </div>
      )}
      <PaginationCatalogue
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Catalogue;
