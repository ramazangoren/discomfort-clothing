import "./YouMayAlsoLike.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ListContext } from "../../hooks/ListContext";

const YouMayAlsoLike = () => {
  const { fetchTShirts, currentPage, tshirts } = useContext(ListContext);

  useEffect(() => {
    fetchTShirts(4);
  }, [currentPage]);

  return (
    <div className="you-may-also-like-container">
      <p className="you-may-also-like">You may also like</p>
      <div className="YouMayAlsoLike-container-for-cart">
        {tshirts?.length > 0 &&
          tshirts?.map((tshirt, index) => (
            <Link
              to={`/product/${tshirt.tshirtName}/${tshirt._id}`}
              className="YouMayAlsoLike-cart-container"
              key={index}
            >
              <div className="YouMayAlsoLike-image">
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
                  {tshirt.imageUrls.map((url, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={url}
                        alt={`T-shirt ${index} - Image ${i}`}
                        className="YouMayAlsoLike-imaages-featured"
                      />
                    </SwiperSlide>
                  ))}
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </SwiperComponent>
              </div>
              <p className="YouMayAlsoLike-status">{tshirt.saleSold}</p>
              <p className="YouMayAlsoLike-name">{tshirt.tshirtName}</p>
              <p className="YouMayAlsoLike-rating">⭐⭐⭐⭐⭐</p>
              <div className="YouMayAlsoLike-price">
                {tshirt.newPrice ? (
                  <>
                    <p className="YouMayAlsoLike-oldPrice">
                      {tshirt.oldPrice} TL
                    </p>
                    <p className="YouMayAlsoLike-newPrice">
                      {tshirt.newPrice} TL
                    </p>
                  </>
                ) : (
                  <p>{tshirt.oldPrice} TL</p>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default YouMayAlsoLike;
