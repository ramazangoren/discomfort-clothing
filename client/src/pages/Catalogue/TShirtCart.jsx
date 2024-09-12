import "./Catalogue.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const TShirtCart = ({ tshirts }) => {
  console.log(tshirts);

  return (
    <div className="Catalogue-container-for-cart">
      {tshirts?.length > 0 &&
        tshirts?.map((tshirt, index) => (
          <Link
            to={`/product/${tshirt.tshirtName}/${tshirt._id}`}
            className="Catalogue-cart-container"
            key={index}
          >
            <div className="Catalogue-image">
              <SwiperComponent
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
                navigation
              >
                {tshirt.imageUrls.map((url, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={url}
                      alt=""
                      className="Catalogue-imaages-featured"
                    />
                  </SwiperSlide>
                ))}
              </SwiperComponent>
            </div>
            <p className="Catalogue-status">{tshirt.saleSold}</p>
            <p className="Catalogue-name">{tshirt.tshirtName}</p>
            <p className="Catalogue-rating">⭐⭐⭐⭐⭐</p>
            <div className="Catalogue-price">
              {tshirt.newPrice ? (
                <>
                  <p className="Catalogue-oldPrice">{tshirt.oldPrice} TL</p>
                  <p className="Catalogue-newPrice">{tshirt.newPrice} TL</p>
                </>
              ) : (
                <p>{tshirt.oldPrice} TL</p>
              )}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default TShirtCart;
