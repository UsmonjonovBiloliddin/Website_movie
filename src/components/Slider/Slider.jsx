import React, { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import Api_Service from "../../Service/api_service";

const Slider = ({ title, info, margin, id, url }) => {
  const [images, setImages] = useState();
  const getApi = async () => {
    let request = await Api_Service.getData(url);
    if ("cast" in request) {
      setImages(request.cast.slice(0, 20));
    } else {
      setImages(request.results);
    }
  };
  useEffect(() => {
    getApi();
  }, []);
  return (
    <>
      <div className="sm:mt-20 mt-[100px] ">
        <div className="container accardion-top flex justify-between items-end mb-[-50px]">
          <div>
            <h2 className={`accardion-title mt-[${margin}px]`}>{title}</h2>
            <p className="accardion-info">{info}</p>
          </div>
          <div className="nav-wrp flex items-center gap-[16px]">
            <button className={`nav-btn prev-btn prev-btn-${id}`}>
              <img src="/images/svg/Icon (3).svg" alt="" />
            </button>
            <button className={`nav-btn next-btn next-btn-${id}`}>
              <img src="/images/svg/Icon (3).svg" alt="" />
            </button>
          </div>
        </div>
        <div className="py-16 relative z-[0] h-[280px] ">
          <div className="container overflow-hidden mt-[80px] swiper">
            <Swiper
              className="w-[100%]"
              loop={true}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              autoplay={{ duration: 1000, disableOnInteraction: false }}
              spaceBetween={20}
              navigation={{
                nextEl: `.next-btn-${id}`,
                prevEl: `.prev-btn-${id}`,
              }}
              pagination={{ el: `.my-pagination-${id}`, clickable: true }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },

                500: {
                  slidesPerView: 2,
                },

                900: {
                  slidesPerView: 3,
                },
                1300: {
                  slidesPerView: 5,
                },
              }}
            >
              {images &&
                images.map((item) => {
                  return (
                    <SwiperSlide
                      key={item.id}
                      className="rounded-[12px] "
                    >
                      <div className="swiperSlide">
                        <Link
                          to={`/film/${item.id}`}
                          className="slider-img-wrapper"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                            alt=""
                            className="slider-img w-full object-cover rounded-[12px] mb-[15px]"
                          />
                        </Link>
                        <h5 className="slide-name">
                          {item.title.slice(0, 20)}
                        </h5>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
