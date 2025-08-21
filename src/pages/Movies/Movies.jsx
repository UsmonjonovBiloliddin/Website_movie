import React, { useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase";
import { loginUser, logoutUser } from "../../features/auth/authSlice";
const Movies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
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
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);
  return (
    <div className="mt-[100px]">
      <Slider
        title={"Popular Top 10 In Genres"}
        info={""}
        margin={30}
        id={0}
        url={"movie/upcoming"}
      />
      <Slider
        title={"Trending Now"}
        info={""}
        margin={30}
        id={1}
        url={"movie/now_playing"}
      />
      <Slider
        title={"Must - Watch Movies"}
        info={""}
        margin={30}
        id={3}
        url={"movie/top_rated"}
      />
      <Slider
        title={"New Releases"}
        info={""}
        margin={30}
        id={2}
        url={"movie/popular"}
      />
    </div>
  );
};

export default Movies;
