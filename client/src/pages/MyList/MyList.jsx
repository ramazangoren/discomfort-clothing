import "./MyList.css";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import PaginationMyList from "./PaginationMyList";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { ListContext } from "../../hooks/ListContext";

const MyList = () => {
  const {
    fetchTShirts,
    tshirts,
    loadingSpinner,
    currentPage,
    totalPages,
    handlePageChange,
    deleteItem,
  } = useContext(ListContext);

  useEffect(() => {
    fetchTShirts(1000);
  }, [currentPage]);

  if (!loadingSpinner) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="list-container">
        <div>
          {tshirts?.length > 0 &&
            tshirts?.map((tshirt) => (
              <div className="list-item" key={tshirt._id}>
                <Link to={`/product/${tshirt.tshirtName}/${tshirt._id}`}>
                  <div className="list-image">
                    <LazyLoadImage
                      alt={tshirt.tshirtName}
                      className="list-image-featured"
                      effect="black-and-white"
                      src={tshirt.imageUrls[0]}
                      wrapperProps={{
                        style: { transitionDelay: "1s" },
                      }}
                    />
                  </div>
                  <div className="list-item-details">
                    <p className="name">{tshirt.tshirtName}</p>
                    <div className="list-price">
                      {tshirt.newPrice ? (
                        <>
                          <p className="list-oldPrice">{tshirt.oldPrice} TL</p>
                          <p className="list-newPrice">{tshirt.newPrice} TL</p>
                        </>
                      ) : (
                        <p>{tshirt.oldPrice} TL</p>
                      )}
                    </div>
                    <p>{tshirt.saleSold}</p>
                  </div>
                </Link>
                <div className="list-item-buttons">
                  <button onClick={() => deleteItem(tshirt._id)}>
                    <MdDelete />
                  </button>
                  <button>
                    <Link to={`/update-product/${tshirt._id}`}>
                      <BsPencilSquare />
                    </Link>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <PaginationMyList
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default MyList;
