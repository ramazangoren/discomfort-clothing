import { Link } from "react-router-dom";
import "./FeaturedProducts.css";
import { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { ListContext } from "../../hooks/ListContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturedProducts = () => {
  const { fetchTShirts, currentPage, tshirts, loadingSpinner } =
    useContext(ListContext);

  useEffect(() => {
    fetchTShirts(10);
  }, [currentPage]);

  if (!loadingSpinner) {
    return <LoadingSpinner />;
  }

  return (
    <div className="FeaturedProducts-container">
      <p className="FeaturedProducts">Featured Products</p>
      <div className="FeaturedProducts-container-for-cart">
        {tshirts?.length > 0 &&
          tshirts?.map((tshirt, index) => (
            <Link
              to={`/product/${tshirt.tshirtName}/${tshirt._id}`}
              className="cart-container"
              key={index}
            >
              <div className="image">
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
                      <LazyLoadImage
                        alt={`T-shirt ${index} - Image ${i}`}
                        className="imaages-featured"
                        effect="blur"
                        // wrapperProps={{
                        //   style: { transitionDelay: "1s" },
                        // }}
                        src={url}
                      />
                    </SwiperSlide>
                  ))}
                </SwiperComponent>
              </div>
              <p className="status">{tshirt.saleSold}</p>
              <p className="name">{tshirt.tshirtName}</p>
              <p className="rating">⭐⭐⭐⭐⭐</p>
              <div className="price">
                {tshirt.newPrice ? (
                  <>
                    <p className="oldPrice">{tshirt.oldPrice} TL</p>
                    <p className="newPrice">{tshirt.newPrice} TL</p>
                  </>
                ) : (
                  <p>{tshirt.oldPrice} TL</p>
                )}
              </div>
            </Link>
          ))}
      </div>
      <Link className="viewAll" to={"/collections"}>
        View All
      </Link>
    </div>
  );
};

export default FeaturedProducts;
