import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import Api_Service from "../../Service/api_service";

import Slider from "../../components/Slider/Slider";

const Actor = () => {
  const { id } = useParams();
  const [actor, setActor] = useState();
  const [images, setImages] = useState();
  const [filtredImages, setFiltred] = useState();
  const getApi = async () => {
    const getActor = await Api_Service.getData(
      `https://api.themoviedb.org/3/person/${id}`
    );
    setActor(getActor);
    const getImages = await Api_Service.getData(
      `https://api.themoviedb.org/3/person/${id}/movie_credits`
    );
    setImages(getImages.cast);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
    getApi();
  }, []);
  useEffect(
    (item) => {
      const filtred = images && images.filter((e) => e.backdrop_path);
      setFiltred(filtred);
    },
    [images]
  );
  return (
    <div className="actor mt-[150px]">
      <div className="container actor-container flex justify-between gap-[30px]">
        <img
          src={`https://image.tmdb.org/t/p/w500/${actor && actor.profile_path}`}
          alt=""
          className="actor-img w-[300px] h-[450px] rounded-[12px]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://dummyimage.com/300x450/000/fff&text=${
              actor && actor.name.replace(" ", "+")
            }`;
          }}
        />
        <div className="actor-right max-w-[950px] w-full">
          <h2 className="actor-name mb-[20px]">{actor && actor.name}</h2>
          <h4 className="actor-bio film-box-title mb-[15px]">Biography</h4>
          <p className="actor-info mb-[10px]">
            {actor && actor.biography.slice(0, 750)}
          </p>
        </div>
      </div>
      {actor && (
        <Slider
          title={`${actor.name}'s Filmography`}
          info={""}
          margin={0}
          url={`person/${id}/movie_credits`}
          init={1}
          loop={true}
        />
      )}
    </div>
  );
};

export default Actor;
