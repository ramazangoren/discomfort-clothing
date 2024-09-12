import { useState } from "react";
import "./Images.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Images = ({ tshirtDetails, setImagesPopup }) => {
  const [selectedImage, setSelectedImage] = useState("front");
  console.log(tshirtDetails);

  return (
    <div className="image-gallery-container">
      <div className="image-gallery">
        {tshirtDetails?.imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImage === index ? "selected" : ""}`}
            onClick={() => setSelectedImage(index)}
          >
            <LazyLoadImage
              src={imageUrl}
              alt={`Thumbnail ${index + 1}`}
              effect="blur"
              wrapperProps={{
                style: { transitionDelay: "1s" },
              }}
            />
            {/* <img src={imageUrl} alt={`Thumbnail ${index + 1}`} /> */}
          </div>
        ))}
      </div>

      <div className="main-image" onClick={() => setImagesPopup(true)}>
        {/* <img
          src={
            tshirtDetails?.imageUrls[selectedImage] ||
            tshirtDetails?.imageUrls[0]
          }
          alt="Selected Product view"
        /> */}

        <LazyLoadImage
          src={
            tshirtDetails?.imageUrls[selectedImage] ||
            tshirtDetails?.imageUrls[0]
          }
          alt="Selected Product view"
          effect="blur"
          wrapperProps={{
            style: { transitionDelay: "1s" },
          }}
        />
      </div>
    </div>
  );
};

export default Images;
