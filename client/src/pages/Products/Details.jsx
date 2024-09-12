import "./Details.css";

const Details = ({ tshirtDetails, addToCart }) => {
  
  return (
    <div className="tshirst-details">
      <p className="name">{tshirtDetails.tshirtName}</p>
      <p className="tshirt-details-price">
        {tshirtDetails.oldPrice && (
          <span
            className={
              tshirtDetails.newPrice
                ? "tshirt-details-oldPrice"
                : "newPriceDontExists"
            }
          >
            {tshirtDetails.oldPrice} TL
          </span>
        )}
        {tshirtDetails.newPrice && <span>{tshirtDetails.newPrice} TL</span>}
      </p>

      <div className="tshirst-details-sizes">
        <p>SIZES:</p>
        {tshirtDetails.sizes && tshirtDetails.sizes.length > 0
          ? tshirtDetails.sizes[0].split(",").map((size, index) => (
              <span
                key={index}
                className={size.trim() === "M" ? "size-color" : ""}
              >
                {size.trim()}
              </span>
            ))
          : ""}
      </div>
      <div className="tshirst-details-tshirst-color">
        <p>Color:</p>
        <p>{tshirtDetails.color}</p>
      </div>
      <div className="tshirst-details-quantity">
        <p>Quantity:</p>
        <p>
          <span>-</span>
          <span>1</span>
          <span>+</span>
        </p>
      </div>
      <div className="tshirst-details-btns">
        <button onClick={() => addToCart(tshirtDetails._id)}>
          Add to Cart
        </button>
        <button>Buy it now</button>
      </div>
      <div className="tshirst-details-details">
        {tshirtDetails.details && tshirtDetails.details.length > 0 ? (
          tshirtDetails.details[0]
            .split("\n")
            .map((detail, index) => <p key={index}>{detail}</p>)
        ) : (
          <p>No details available.</p>
        )}
      </div>
    </div>
  );
};

export default Details;
