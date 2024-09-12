import { useContext, useEffect } from "react";
import "./PlaceOrder.css";
import { OrderContext} from "../../hooks/OrderContext";
import AddressInfo from "./AddressInfo";

const PlaceOrder = () => {
  const { orderData, totalPrice, updateAddress, placeOrder, fetchLists } = useContext(OrderContext);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const onChangeHandler = (e) => {
    updateAddress(e.target.name, e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    placeOrder();
  };

  return (
    <form className="place-order" onSubmit={onSubmitHandler}>
      <AddressInfo onChangeHandler={onChangeHandler} data={orderData} />
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${parseFloat(totalPrice) === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${parseFloat(totalPrice) === 0 ? 0 : (parseFloat(totalPrice) + 2).toFixed(2)}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

