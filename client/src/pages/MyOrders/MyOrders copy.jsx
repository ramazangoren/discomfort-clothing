import { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post("/api/order/userorders");
        setMyOrders(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;
  // if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="orders-container">
      <h1 className="title">My Orders</h1>
      {myOrders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <ul className="orders-list">
          {myOrders.map((order) => (
            <li key={order._id} className="order-item">
              <div className="order-header">
                <div>
                  <p>Estimated Delivery time:</p>
                  <p>
                    {new Date(
                      new Date(order.date).setDate(
                        new Date(order.date).getDate() + 3
                      )
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p>Shipping BY:</p>
                  <p>Ramazan goren | 05346024345</p>
                </div>
                <div>
                  <p>Status:</p>
                  <p>{order.status}</p>
                </div>

                <div>
                  <p>Tracking id:</p>
                  <p>{order._id}</p>
                </div>
                <div>
                  <p>Amount: </p>
                  <p>${order.amount}</p>
                </div>
                <div>
                  <p>Date:</p>
                  <p>{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p>Payment Status:</p>
                  <p>{order.payment ? "Paid" : "Unpaid"}</p>
                </div>
              </div>
              <p className="order-items-title">Items:</p>
              <ul className="items-list">
                {order.items.map((item) => (
                  <li key={item._id} className="item">
                    <div className="item-image">
                      {/* <img src={item.imageUrls[0]} alt={item.tshirtName} /> */}
                      <SwiperComponent
                        modules={[Navigation, Pagination]}
                        spaceBetween={10}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop={true}
                        navigation={{
                          nextEl: ".swiper-button-next",
                          prevEl: ".swiper-button-prev",
                        }}
                      >
                        {item.imageUrls.map((url, i) => (
                          <SwiperSlide key={i}>
                            <img src={url} alt={item.tshirtName} className="myOrders-img" />
                          </SwiperSlide>
                        ))}
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                      </SwiperComponent>
                    </div>
                    <p>{item.tshirtName}</p>
                    <p>Qty:{item.quantity}</p>
                    <p> $ {item.newPrice ? item.newPrice : item.oldPrice}</p>
                    <p> {item.color}</p>
                    <p> {item.sizes.join(", ")}</p>
                  </li>
                ))}
              </ul>
              <div className="order-address">
                <p>
                  Address:
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.zipcode},{" "}
                  {order.address.country}
                </p>
                <p>Email: {order.address.email}</p>
                <p>Phone: {order.address.phone}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
