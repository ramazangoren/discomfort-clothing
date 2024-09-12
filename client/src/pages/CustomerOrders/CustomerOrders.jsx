import { useEffect, useContext } from "react";
import "./CustomerOrders.css";
import parcel from "../../assets/parcel.png";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { OrderContext } from "../../hooks/OrderContext";

const CustomerOrders = () => {
  const {
    fetchAllOrders,
    customerOrders,
    setCustomerOrders,
    statusHandler,
    loading,
  } = useContext(OrderContext);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="CustomerOrders add">
      <h3>Customer Order Page</h3>
      <div className="CustomerOrders-list">
        {customerOrders.length > 0 &&
          customerOrders.map((order, index) => (
            <div className="CustomerOrders-item" key={index}>
              <img src={parcel} alt="Parcel Icon" />
              <div>
                <p className="CustomerOrders-item-food">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx < order.items.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="CustomerOrders-item-name">
                  {`${order.address.firstName} ${order.address.lastName}`}
                </p>
                <div>
                  <p>{order.address.street},</p>
                  <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
                </div>
                <p className="CustomerOrders-item-phone">
                  {order.address.phone}
                </p>
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomerOrders;
