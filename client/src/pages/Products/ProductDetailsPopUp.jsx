import "./ProductDetailsPopUp.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductDetailsPopUp = ({ imagesPopup, setImagesPopup, tshirtDetails }) => {
  return (
    <div className={`popup-overlay ${imagesPopup ? "active" : ""}`}>
      <div className="popup">
        <div className="ProductDetailsPopUp-images">
          {tshirtDetails.imageUrls?.map((url, index) => (
            <div
              key={index}
              className="ProductDetailsPopUp-image-container"
              onClick={() => setImagesPopup(false)} // Close popup on image click
            >
              <LazyLoadImage
                src={url}
                effect="blur"
                className="ProductDetailsPopUp-images"
              />
            </div>
          ))}
        </div>
        <p onClick={() => setImagesPopup(false)} className="close-popup">
          X
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsPopUp;
