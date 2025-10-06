// Login.jsx
import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [choose, setChoose] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [loginError, setLoginError] = useState("");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const auth = getAuth(app);

  // Tekshirish: foydalanuvchi auth holati
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) navigate("/");
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  // Register
  const handleRegister = async () => {
    setRegError("");
    if (!email || !password) {
      setRegError("Email va parolni kiriting!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Ro‘yxatdan o‘tish muvaffaqiyatli!");
      setChoose("Login");
    } catch (error) {
      setRegError(error.message);
    }
  };

  // Login
  const handleLogin = async () => {
    setLoginError("");
    if (!email || !password) {
      setLoginError("Email va parolni kiriting!");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
    } catch (error) {
      setLoginError(error.message);
    }
  };

  // Google
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Github
  const handleGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login mt-[100px]">
      <div className="container login-container">
        {choose === "Login" ? (
          <div className="login-form flex justify-between">
            <img
              src="/images/png/support-img.png"
              alt=""
              className="login-img w-[400px] h-[450px]"
            />
            <div className="login-right flex flex-col max-w-[700px] w-full gap-[15px]">
              <h1 className="text-center">Please login to use our app</h1>
              <h3 className="support-name">Email</h3>
              <input
                type="email"
                className="support-input"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
              />
              <h3 className="support-name">Password</h3>
              <input
                type="password"
                className="support-input mb-[25px]"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
              />
              <button className="btn" onClick={handleLogin}>
                Login
              </button>
              {loginError && <p className="text-red-500">{loginError}</p>}
              <h3
                className="support-name login-dont"
                onClick={() => setChoose("Register")}
              >
                Don't have an account?
              </h3>
              <div className="logins-wrp flex items-center gap-[10px]">
                <button
                  className="google-btn flex items-center gap-[3px]"
                  onClick={handleGoogle}
                >
                  <img src="/images/svg/login/devicon_google.svg" alt="" />
                  Login with Google
                </button>
                <button
                  className="google-btn flex items-center gap-[3px]"
                  onClick={handleGithub}
                >
                  <img src="/images/svg/login/Vector (1).svg" alt="" />
                  Login with Github
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="login-form flex justify-between">
            <img
              src="/images/png/support-img.png"
              alt=""
              className="login-img w-[400px] h-[450px]"
            />
            <div className="login-right flex flex-col max-w-[700px] w-full gap-[15px]">
              <h3 className="support-name">Nickname</h3>
              <input
                type="text"
                className="support-input"
                placeholder="Nickname"
              />
              <h3 className="support-name">Email</h3>
              <input
                type="email"
                className="support-input"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
              />
              <h3 className="support-name">Password</h3>
              <input
                type="password"
                className="support-input mb-[25px]"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
              />
              <button className="btn" onClick={handleRegister}>
                Register
              </button>
              {regError && <p className="text-red-500">{regError}</p>}
              <h3
                className="support-name login-dont"
                onClick={() => setChoose("Login")}
              >
                Have an account?
              </h3>
              <div className="registers-wrp flex items-center gap-[10px]">
                <button
                  className="google-btn flex items-center gap-[3px]"
                  onClick={handleGoogle}
                >
                  <img src="/images/svg/login/devicon_google.svg" alt="" />
                  Register with Google
                </button>
                <button
                  className="google-btn flex items-center gap-[3px]"
                  onClick={handleGithub}
                >
                  <img src="/images/svg/login/Vector (1).svg" alt="" />
                  Register with Github
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
