import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import YouMayAlsoLike from "../../components/YouMayAlsoLike/YouMayAlsoLike";
import ProductDetailsPopUp from "./ProductDetailsPopUp";
import Details from "./Details";
import Images from "./Images";
import Share from "./Share";
import Review from "./Review/Review";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { ProductDetailsContext } from "../../hooks/ProductDetailsContext";

const ProductDetails = () => {
  const { name, tshirtId } = useParams();
  const {
    tshirtDetails,
    imagesPopup,
    dataLoading,
    setImagesPopup,
    getTshirtDetails,
    addToCart,
  } = useContext(ProductDetailsContext);

  useEffect(() => {
    getTshirtDetails(name, tshirtId);
  }, [name, tshirtId]);

  if (dataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="details">
      <div className="details-container">
        <Images tshirtDetails={tshirtDetails} setImagesPopup={setImagesPopup} />
        <div className="tshirst-details-container">
          <p>DISCOMFORT</p>
          <Details tshirtDetails={tshirtDetails} addToCart={addToCart} />
          <Share />
          <Review tshirtId={tshirtId} />
        </div>
      </div>
      <YouMayAlsoLike />
      {imagesPopup && (
        <ProductDetailsPopUp
          imagesPopup={imagesPopup}
          setImagesPopup={setImagesPopup}
          tshirtDetails={tshirtDetails}
        />
      )}
    </div>
  );
};

export default ProductDetails;
