import "./Cart.css";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useContext } from "react";
import { CartContext } from "../../hooks/CartContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Cart() {
  const { handleRemoveFromCart, cartData, loading, calcTotalPrice } =
    useContext(CartContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="Cart-container">
      {cartData && cartData.length > 0 ? (
        <>
          <div className="CartData-container">
            {cartData.map((item, index) => (
              <div key={index} className="Cart-Card">
                <Link to={`/product/${item.tshirtName}/${item._id}`}>
                  <div className="CartData-img">
                    <LazyLoadImage
                      alt={item.tshirtName}
                      effect="black-and-white"
                      src={item.imageUrls[0]}
                      wrapperProps={{
                        style: { transitionDelay: "1s" },
                      }}
                    />
                  </div>
                  <div className="CartData-details">
                    <p>{item.tshirtName}</p>
                    <p>Price: {item.newPrice || item.oldPrice}$</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </Link>
                <div className="delete-icon">
                  <MdDelete
                    className="MdDelete"
                    onClick={() => handleRemoveFromCart(item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="Checkout-container">
            <p>Total Price: {calcTotalPrice().toFixed(2)}$</p>
            <Link to="/order">Check Out</Link>
          </div>
        </>
      ) : (
        <div className="empty-cart-message">
          <p>Your cart is empty</p>
          <Link to="/collections">Go back to shopping</Link>
        </div>
      )}
    </div>
  );
}

