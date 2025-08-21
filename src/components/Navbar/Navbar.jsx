import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebase";
import { logoutUser } from "../../features/auth/authSlice";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [imageSrc, setImageSrc] = useState("/images/svg/sitelogo/phone.svg");
  const [scrolled, setScrolled] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth).then(() => {
      dispatch(logoutUser());
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 390) {
        setImageSrc("/images/svg/sitelogo/phone.svg");
      } else if (window.innerWidth <= 1440 && window.innerWidth > 390) {
        setImageSrc("/images/svg/sitelogo/laptop.svg");
      } else {
        setImageSrc("/images/svg/sitelogo/large.svg");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [innerWidth]);

  return (
    <div className={`navbar ${scrolled == true ? "scrolled" : " "}`}>
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <div
        className={`container navbar-container flex justify-between items-center mx-auto ${
          scrolled == true ? "scrolled" : " "
        }`}
      >
        <Link className="logo-link" to={"/"}>
          <img src={imageSrc} alt="Site Logo" />
        </Link>
        <nav className="sitenav">
          <ul className="sitenav-list flex gap-[30px] items-center">
            <li className="sitenav-item">
              <NavLink className="sitenav-link" to={"/"}>
                Home
              </NavLink>
            </li>
            <li className="sitenav-item">
              <NavLink className="sitenav-link" to={"/movies"}>
                Movies & Shows
              </NavLink>
            </li>
            <li className="sitenav-item">
              <NavLink className="sitenav-link" to={"/support"}>
                Support
              </NavLink>
            </li>
            <li className="sitenav-item">
              <NavLink className="sitenav-link" to={"/subscriptions"}>
                Subscriptions
              </NavLink>
            </li>
            <li className="sitenav-item">
              {user ? (
                <button
                  className="btn"
                  onClick={() => {
                    handleLogout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              ) : (
                <NavLink className="sitenav-link" to="/login">
                  Sign in
                </NavLink>
              )}
            </li>
          </ul>
        </nav>

        <div className="search-wrp flex gap-[14px] items-center">
          <a href="#">
            <img
              src="/images/svg/Icon-1.svg"
              alt="Icon 1"
              className="search-img"
            />
          </a>
          <Link to={"/search"}>
            <img
              src="/images/svg/Icon.svg"
              alt="Icon 2"
              className="search-img"
            />
          </Link>
          <button className="burger-btn" onClick={() => setIsOpen(true)}>
            <img src="/images/svg/burger.svg" alt="" className="burger-img" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
