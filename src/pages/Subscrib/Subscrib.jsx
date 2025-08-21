import React from "react";
import Plan from "../../components/Plan/Plan";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase";
import { loginUser, logoutUser } from "../../features/auth/authSlice";
const Subscrib = () => {
  const dispatch = useDispatch();
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
      <div className="mt-[150px]"></div>
      <Plan />
    </>
  );
};

export default Subscrib;
