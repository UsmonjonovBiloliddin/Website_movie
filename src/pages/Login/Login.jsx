import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Login = () => {
  const [choose, setChoose] = useState("Login");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const handleRegister = async () => {
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setChoose("Login");
    } catch (error) {
      setRegError(true);
    }
  };
  const handleLogin = async () => {
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.code, error.message);
    }
  };
  const handleGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleGithub = async () => {
    const auth = getAuth(app);
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const githubUser = result.user;
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      navigate("/");
    }
    
  }, [user]);
  return (
    <>
      <div className="login mt-[100px]">
        <div className="container login-container">
          {choose == "Login" ? (
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
                  onInput={(e) => {
                    setEmail(e.target.value.trim().toLowerCase());
                  }}
                />
                <h3 className="support-name">Password</h3>
                <input
                  type="password"
                  className="support-input mb-[25px]"
                  placeholder="password"
                  onInput={(e) => {
                    setPassword(e.target.value.trim());
                  }}
                />
                <button className="btn" onClick={handleLogin}>
                  Login
                </button>
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
                  onInput={(e) => {
                    setEmail(e.target.value.trim().toLowerCase());
                  }}
                />
                <h3 className="support-name">Password</h3>
                <input
                  type="password"
                  className="support-input mb-[25px]"
                  placeholder="password"
                  onInput={(e) => {
                    setPassword(e.target.value.trim());
                  }}
                />
                <button className="btn" onClick={handleRegister}>
                  Register
                </button>
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
    </>
  );
};

export default Login;
