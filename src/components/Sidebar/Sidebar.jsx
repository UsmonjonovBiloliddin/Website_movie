import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebase";
import { logoutUser } from "../../features/auth/authSlice";

const Sidebar = ({ isOpen, onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth).then(() => {
      dispatch(logoutUser());
      onClose();
      navigate("/");
    });
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="sidebar-close" onClick={onClose}>
          ❌
        </button>
        <ul className="sidebar-list">
          <li>
            <NavLink to="/" className="sidebar-link" onClick={onClose}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className="sidebar-link" onClick={onClose}>
              Movies & Shows
            </NavLink>
          </li>
          <li>
            <NavLink to="/support" className="sidebar-link" onClick={onClose}>
              Support
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className="sidebar-link" onClick={onClose}>
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subscriptions"
              className="sidebar-link"
              onClick={onClose}
            >
              Subscriptions
            </NavLink>
          </li>
          <li>
            {user ? (
              <button
                className="sidebar-link logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="sidebar-link" onClick={onClose}>
                Sign in
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
