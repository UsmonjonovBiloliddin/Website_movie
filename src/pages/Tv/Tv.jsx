import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Api_Service from "../../Service/api_service";

const reviews = [
  {
    id: 1,
    name: "Emily Johnson",
    from: "Canada",
    text: "This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so couldn't watch it.",
  },
  {
    id: 2,
    name: "Rajiv Kumar",
    from: "India",
    text: "This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so couldn't watch it.",
  },
  {
    id: 3,
    name: "Sara Ali",
    from: "UAE",
    text: "This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so couldn't watch it.",
  },
  {
    id: 4,
    name: "Luca Bianchi",
    from: "Italy",
    text: "This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so couldn't watch it.",
  },
  {
    id: 5,
    name: "Chen Wei",
    from: "China",
    text: "This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so couldn't watch it.",
  },
  {
    id: 6,
    name: "Mamadou Diallo",
    from: "Senegal",
    text: "This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so couldn't watch it.",
  },
  {
    id: 7,
    name: "Anna Müller",
    from: "Germany",
    text: "This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so couldn't watch it.",
  },
  {
    id: 8,
    name: "Diego Fernández",
    from: "Argentina",
    text: "This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so couldn't watch it.",
  },
];

const Tv = () => {
  const [tvShow, setTvShow] = useState();
  const [trailer, setTrailer] = useState();
  const [actors, setActors] = useState();
  const [genres, setGenres] = useState();
  const { id } = useParams();
  const [director, setDirector] = useState();
  const [composer, setComposer] = useState();
  const [isPlaying, setPlaying] = useState(false);

  const getApi = async () => {
    const getTvShow = await Api_Service.getData(
      `https://api.themoviedb.org/3/tv/${id}`
    );
    setTvShow(getTvShow);

    const getTrailer = await Api_Service.getData(
      `https://api.themoviedb.org/3/tv/${id}/videos`
    );
    const filteredTrailer = getTrailer.results.find(
      (e) => e.type == "Trailer" && e.site == "YouTube"
    );
    setTrailer(filteredTrailer?.key);

    const getActors = await Api_Service.getData(
      `https://api.themoviedb.org/3/tv/${id}/credits`
    );
    setActors(getActors.cast);

    const filtrDirector = getActors.crew.find((e) => e.job == "Director");
    setDirector(filtrDirector);

    const getComposer = await Api_Service.getData(
      `https://api.themoviedb.org/3/tv/${id}/credits`
    );
    setComposer(
      getComposer.crew.find((e) => e.job == "Original Music Composer")
    );
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getApi();
  }, []);

  return (
    <div className="film mt-[100px]">
      <div className="container film-container mb-[80px]">
        {!isPlaying && (
          <div
            className="film-top mb-[25px] bg-cover bg-center w-full h-[530px]"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${
                tvShow && tvShow.backdrop_path
              })`,
            }}
          >
            <h1 className="film-title text-center mb-[4px]">
              {tvShow && tvShow.name}
            </h1>
            <p className="film-info mx-auto max-w-[1190px] text-center mb-[30px]">
              {tvShow && tvShow.overview}
            </p>
            <button
              className="btn flex items-center gap-[4px] mx-auto"
              onClick={() => setPlaying(true)}
            >
              <img src="/images/svg/Icon (4).svg" alt="" />
              Play Now
            </button>
          </div>
        )}

        {isPlaying && (
          <div className="trailer-wrp">
            <iframe
              src={`https://www.youtube.com/embed/${
                trailer && trailer
              }?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-[530px] rounded-[12px]"
            ></iframe>
            <button
              className="btn trailer-close mt-[20px]"
              onClick={() => setPlaying(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
      <div className="film-bottom">
        <div className="container flex justify-around flex-wrap gap-[25px]">
          <div className="film-left flex flex-col max-w-[850px] w-full gap-[20px] media-1238">
            <div className="film-box">
              <h3 className="film-box-title mb-[10px]">Description</h3>
              <p className="film-box-desc">{tvShow && tvShow.overview}</p>
            </div>
            <div className="film-box">
              <div className="flex items-center justify-between mb-[10px]">
                <h3 className="film-box-title">Cast</h3>
                <div className="flex gap-[8px]">
                  <button className="prev-actor film-navigation ">
                    <img src="/images/svg/film-icon.svg" alt="" />
                  </button>
                  <button className="next-actor film-navigation">
                    <img src="/images/svg/film-icon.svg" alt="" />
                  </button>
                </div>
              </div>
              <div className="film-box-slider">
                <Swiper
                  modules={[Navigation]}
                  navigation={{ nextEl: ".next-actor", prevEl: ".prev-actor" }}
                  spaceBetween={10}
                  loop={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 3,
                    },
                    480: {
                      slidesPerView: 4,
                    },
                    640: {
                      slidesPerView: 5,
                    },
                    768: {
                      slidesPerView: 6,
                    },
                    1024: {
                      slidesPerView: 7,
                    },
                    1280: {
                      slidesPerView: 8,
                    },
                  }}
                >
                  {actors &&
                    actors.map((actor) => {
                      return (
                        <SwiperSlide
                          key={actor.id}
                          className="w-[87px] h-[89px] cursor-pointer"
                        >
                          <Link to={`/actor/${actor.id}`}>
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                              alt={actor.original_name}
                              className="w-[87px] h-[89px] rounded-[10px]"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://dummyimage.com/87x89/000/fff&text=${actor.original_name.replace(
                                  " ",
                                  "+"
                                )}`;
                              }}
                            />
                          </Link>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div className="film-box">
              <div className="flex items-center justify-between gap-[20px] flex-wrap mb-[40px]">
                <h3 className="film-box-title">Reviews</h3>
                <button className="flex item-center gap-[4px] film-add-review">
                  <img src="/images/svg/film-plus.svg" alt="" />
                  Add Your Review
                </button>
              </div>
              <div className="film-review-slider mb-[40px]">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation={{
                    nextEl: ".next-review",
                    prevEl: ".prev-review",
                  }}
                  pagination={{ el: ".my-pagination", clickable: true }}
                  spaceBetween={20}
                  loop={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      slidesPerGroup: 1,
                    },
                    640: {
                      slidesPerView: 1,
                      slidesPerGroup: 1,
                    },
                    768: {
                      slidesPerView: 2,
                      slidesPerGroup: 2,
                    },
                    1024: {
                      slidesPerView: 2,
                      slidesPerGroup: 2,
                    },
                  }}
                >
                  {reviews.map((review) => {
                    return (
                      <SwiperSlide key={review.id}>
                        <div className="film-review-card">
                          <div className="flex justify-between items-center flex-wrap gap-[20px] mb-[16px]">
                            <div className="flex flex-col">
                              <h4 className="film-review-name">
                                {review.name}
                              </h4>
                              <h3 className="film-box-title">
                                From {review.from}
                              </h3>
                            </div>
                            <div className="review-stars-wrp flex items-center gap-[3px]">
                              <img src="/images/svg/Shape (1).svg" alt="" />
                              <img src="/images/svg/Shape (1).svg" alt="" />
                              <img src="/images/svg/Shape (1).svg" alt="" />
                              <img src="/images/svg/Shape (1).svg" alt="" />
                              <img src="/images/svg/Shape (1).svg" alt="" />
                              <h4 className="review-rate">5</h4>
                            </div>
                          </div>
                          <p className="review-info">{review.text}</p>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="flex gap-[10px] justify-center">
                <button className="prev-review film-navigation ">
                  <img src="/images/svg/film-icon.svg" alt="" />
                </button>
                <div className="my-pagination max-w-[95px]"></div>
                <button className="next-review film-navigation">
                  <img src="/images/svg/film-icon.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="film-right max-w-[416px] w-full media-1238">
            <div className="film-box">
              <div className="film-right-wrp flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[10px]">
                  <h3 className="film-box-title flex items-center gap-[2px]">
                    <img src="/images/svg/film/Icon.svg" alt="" />
                    Released Year
                  </h3>
                  <h3 className="film-realised">
                    {tvShow && tvShow.first_air_date}
                  </h3>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <h3 className="film-box-title flex items-center gap-[2px]">
                    <img src="/images/svg/film/Icon (1).svg" alt="" />
                    Available Languages
                  </h3>
                  <div className="flex flex-wrap gap-[10px]">
                    {tvShow &&
                      tvShow.spoken_languages.map((lang) => (
                        <h4 key={lang.english_name} className="film-language">
                          {lang.english_name}
                        </h4>
                      ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <h3 className="film-box-title flex items-center gap-[2px]">
                    <img src="/images/svg/film/Icon (2).svg" alt="" />
                    Ratings
                  </h3>
                  <div className="flex  flex-wrap gap-[10px]">
                    <div className="rating">
                      <h3 className="rating-title mb-[4px]">IMDb</h3>
                      <div className="flex items-center gap-[1.5px]">
                        <img src="/images/svg/Shape.svg" alt="" />
                        <img src="/images/svg/Shape.svg" alt="" />
                        <img src="/images/svg/Shape.svg" alt="" />
                        <img src="/images/svg/Shape.svg" alt="" />
                        <img src="/images/svg/Shape.svg" alt="" />
                        <h4 className="rating-num">5</h4>
                      </div>
                    </div>
                    <div className="rating">
                      <h3 className="rating-title mb-[4px]">Streamvibe</h3>
                      <div className="flex items-center gap-[1.5px]">
                        <img src="/images/svg/Shape.svg" alt="" />
                        <img src="/images/svg/Shape.svg" alt="" />
                        <img src="/images/svg/Shape.svg" alt="" />
                        <img src="/images/svg/Shape.svg" alt="" />
                        <img src="/images/svg/Shape.svg" alt="" />
                        <h4 className="rating-num">5</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <h3 className="film-box-title flex items-center gap-[2px]">
                    <img src="/images/svg/film/Icon (3).svg" alt="" />
                    Gernes
                  </h3>
                  <div className="flex flex-wrap gap-[10px]">
                    {tvShow &&
                      tvShow.genres.map((item) => (
                        <h4 key={item.id} className="film-language">
                          {item.name}
                        </h4>
                      ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <h3 className="film-box-title">{director && director.job}</h3>
                  <Link to={`/actor/${director && director.id}`}>
                    <div className="staff flex items-center gap-[8px]">
                      <img
                        src={
                          director &&
                          `https://image.tmdb.org/t/p/w500/${director.profile_path}`
                        }
                        alt=""
                        className="staff-img w-[47px] h-[50px] rounded-[6px]"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                        }}
                      />
                      <div className="">
                        <h3 className="staff-name">
                          {director && director.name}
                        </h3>
                        <h4 className="staff-from">
                          {director && director.original_name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <h3 className="film-box-title">{composer && composer.job}</h3>
                  <Link to={`/actor/${composer && composer.id}`}>
                    <div className="staff flex items-center gap-[8px]">
                      <img
                        src={
                          composer &&
                          `https://image.tmdb.org/t/p/w500/${composer.profile_path}`
                        }
                        alt=""
                        className="staff-img w-[47px] h-[50px] rounded-[6px]"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                        }}
                      />
                      <div className="">
                        <h3 className="staff-name">
                          {composer && composer.name}
                        </h3>
                        <h4 className="staff-from">
                          {composer && composer.original_name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tv;
