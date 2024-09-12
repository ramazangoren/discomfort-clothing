import { useContext, useEffect} from "react";
import "./MyOrders.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { OrderContext } from "../../hooks/OrderContext";

const MyOrders = () => {

  const {fetchOrders, loading, myOrders} = useContext(OrderContext)

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;

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
                            <img
                              src={url}
                              alt={item.tshirtName}
                              className="myOrders-img"
                            />
                          </SwiperSlide>
                        ))}
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                      </SwiperComponent>
                    </div>
                    <div>
                      <p>{item.tshirtName}</p>
                      <p>Qty:{item.quantity}</p>
                      <p> $ {item.newPrice ? item.newPrice : item.oldPrice}</p>
                      <p> {item.color}</p>
                      <p> {item.sizes.join(", ")}</p>
                    </div>
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
