import React from "react";
import Accardion from "../../components/Accardion/Accardion";
import Plan from "../../components/Plan/Plan";
import Slider from "../../components/Slider/Slider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Marque from "../../components/Marquee/Marque";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  
  React.useEffect(() => {
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
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="hero">
        <div className="slider flex flex-col gap-[10px] w-full">
          <Marque url={`/movie/top_rated`} />
          <Marque url={`/movie/popular`} />
          <Marque url={`/movie/upcoming`} />
        </div>
        <img
          src="/images/png/Abstract Design.png"
          alt=""
          className="logo-hero mx-[auto] mt-[160px]"
        />
        <div className="container text-center mt-[50px]">
          <h1 className="title mb-[10px]">
            Hello {user && user.email.slice(0, user.email.indexOf("@"))}!
          </h1>
          <p className="hero-info">
            StreamVibe is the best streaming experience for watching your
            favorite movies and shows on demand, anytime, anywhere. With
            StreamVibe, you can enjoy a wide variety of content, including the
            latest blockbusters, classic movies, popular TV shows, and more. You
            can also create your own watchlists, so you can easily find the
            content you want to watch.
          </p>
        </div>
      </div>
      <Slider
        title={"Explore our wide variety of categories"}
        info={
          "Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new"
        }
        margin={35}
        url={"/movie/top_rated"}
      />
      <Accardion />
      <Plan />
    </>
  );
};

export default Home;
