import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import "../Catalogue/Pagination.css";

const PaginationMyList = ({totalPages, handlePageChange,currentPage}) => {
    return (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <IoIosArrowBack />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={index + 1 === currentPage ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <IoIosArrowForward />
          </button>
        </div>
      );
}

export default PaginationMyList
