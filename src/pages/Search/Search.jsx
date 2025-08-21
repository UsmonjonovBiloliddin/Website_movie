import React, { useEffect, useState } from "react";
import Api_Service from "../../Service/api_service";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import app from "../../firebase";
import { loginUser, logoutUser } from "../../features/auth/authSlice";

const Search = () => {
  const [choose, setChoose] = useState("multi");
  const [isPlaying, setPlaying] = useState(null);
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const [isActor, setActor] = useState(false);
  const [actorData, setActorData] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [effect, setEffect] = useState(911430);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        setError(null);
        const request = await Api_Service.getData(
          `https://api.themoviedb.org/3/movie/${effect}/videos`
        );

        if (request?.results) {
          const filteredTrailer = request.results.find(
            (e) => e.type === "Trailer" && e.site === "YouTube"
          );
          setTrailer(filteredTrailer?.key || null);
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
        setTrailer(null);
      }
    };

    if (effect) {
      fetchTrailer();
    }
     const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          loginUser({
            email: currentUser.email,
            uid: currentUser.uid,
          })
        );
      } else {
        dispatch(logoutUser());
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [effect]);

  const getData = async () => {
    if (!choose) {
      alert("Please choose what you want to search");
      return;
    }

    if (!text.trim()) {
      alert("Please enter text to search");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const request = await Api_Service.getData(
        `search/${choose}?query=${encodeURIComponent(text.trim())}`
      );

      if (request?.results) {
        if (isActor) {
          setActorData(request.results);
          setData(null);
        } else {
          setData(request.results);
          setActorData(null);
        }
      } else {
        setData(null);
        setActorData(null);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category, isActorCategory) => {
    setChoose(category);
    setActor(isActorCategory);
    setData(null);
    setActorData(null);
    setError(null);
  };

  const handleMovieHover = (movieId) => {
    setPlaying(movieId);
    setEffect(movieId);
  };

  const handleImageError = (e, item) => {
    e.target.onerror = null;
    const title = item.title || item.name || "No Title";
    e.target.src = `https://dummyimage.com/350x200/000/fff&text=${encodeURIComponent(
      title
    )}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getData();
    }
  };

  return (
    <div className="search mt-[100px]">
      <div className="container search-container flex flex-col">
        <div className="search-wrp flex justify-center items-center mb-[25px]">
          <input
            type="text"
            placeholder="Search for movies, TV shows, or actors..."
            className="support-input w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button
            className="btn-search"
            onClick={getData}
            disabled={loading || !text.trim()}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="choose flex items-center gap-[25px] flex-wrap justify-center">
          <button
            className={choose === "movie" ? "red-btn" : "grey-btn"}
            onClick={() => handleCategorySelect("movie", false)}
          >
            Movies
          </button>
          <button
            className={choose === "tv" ? "red-btn" : "grey-btn"}
            onClick={() => handleCategorySelect("tv", false)}
          >
            TV Series
          </button>
          <button
            className={choose === "person" ? "red-btn" : "grey-btn"}
            onClick={() => handleCategorySelect("person", true)}
          >
            Actors
          </button>
          <button
            className={choose === "multi" ? "red-btn" : "grey-btn"}
            onClick={() => handleCategorySelect("multi", false)}
          >
            All
          </button>
        </div>

        {error && (
          <div className="error-message mt-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-[20px] mt-[35px]">
          {loading && (
            <div className="text-center py-8">
              <p>Loading...</p>
            </div>
          )}

          {/* Movie/TV Series Results */}
          {data &&
            !isActor &&
            data.length > 0 &&
            data.map((item) => {
              const linkPath =
                item.media_type === "tv" || choose === "tv"
                  ? `/tv/${item.id}`
                  : `/film/${item.id}`;

              return (
                <Link
                  key={item.id}
                  to={linkPath}
                  onMouseEnter={() => handleMovieHover(item.id)}
                  onMouseLeave={() => setPlaying(null)}
                >
                  <div className="search-result-card flex gap-[15px]">
                    {trailer && isPlaying === item.id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-[350px] h-[200px] rounded-[12px] object-cover"
                        style={{ aspectRatio: "16/9" }}
                      />
                    ) : (
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${
                          item.backdrop_path || item.poster_path
                        }`}
                        alt={item.title || item.name}
                        className="!w-[350px] !h-[200px] rounded-[12px] object-cover"
                        onError={(e) => handleImageError(e, item)}
                      />
                    )}
                    <div className="flex flex-col justify-center">
                      <h3 className="search-title">
                        {item.title || item.name}
                      </h3>
                      {item.release_date && (
                        <p className="grey">
                          {new Date(item.release_date).getFullYear()}
                        </p>
                      )}
                      {item.overview && (
                        <p className="text-sm white mt-2 line-clamp-3">
                          {item.overview}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}

          {/* Actor Results */}
          {actorData &&
            isActor &&
            actorData.length > 0 &&
            actorData.map((actor) => (
              <div
                className="search-result-card no-result flex gap-[25px]"
                key={actor.id}
              >
                <Link to={`/actor/${actor.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                    className="w-[350px] h-[400px] rounded-[12px] object-cover"
                    onError={(e) => handleImageError(e, { title: actor.name })}
                  />
                </Link>
                <div className="flex flex-col justify-center">
                  <h3 className="search-title">{actor.name}</h3>
                  {actor.known_for_department && (
                    <p className="text-gray-600">
                      {actor.known_for_department}
                    </p>
                  )}
                  {actor.known_for && actor.known_for.length > 0 && (
                    <p className="text-sm text-gray-700 mt-2">
                      Known for:{" "}
                      {actor.known_for
                        .slice(0, 3)
                        .map((item) => item.title || item.name)
                        .join(", ")}
                    </p>
                  )}
                </div>
              </div>
            ))}

          {/* No Results Message */}
          {((data && data.length === 0) ||
            (actorData && actorData.length === 0)) &&
            !loading && (
              <div className="text-center py-8">
                <p>No results found. Try different search terms.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Search;
