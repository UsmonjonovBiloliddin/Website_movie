import React, { useEffect, useState } from "react";
import Accardion from "../../components/Accardion/Accardion";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import app from "../../firebase";
import { loginUser, logoutUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Support = () => {
  const url = "https://restcountries.com/v3.1/all?fields=flags,idd,name";
  const [name, setName] = useState("uzbekistan");
  const [allCountries, setCountries] = useState();
  const [country, setCountry] = useState();
  const [isOpen, setOpen] = useState(false);
  const [prefixe, setPrefixe] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
   
  useEffect(() => {
    axios.get(url).then((res) => {
      setCountries(res.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fields=flags,idd,name`)
      .then((res) => {
        setCountry(res.data);
        setPrefixe(`${res.data[0].idd.root}${res.data[0].idd.suffixes[0]}`);
      });
  }, [name]);
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
      <div className="support mt-[150px]">
        <div className="container support-container flex justify-between gap-[15px]">
          <div className="support-left max-w-[533px]">
            <h1 className="support-title mb-[14px]">
              Welcome to our support page!
            </h1>
            <p className="support-info mb-[50px]">
              We're here to help you with any problems you may be having with
              our product.
            </p>
            <img
              src="/images/png/support-img.png"
              alt=""
              className="support-img"
            />
          </div>
          <div className="support-right flex flex-col gap-[50px]">
            <div className="support-mid flex justify-between gap-[20px]">
              <div className="flex flex-col w-full">
                <h3 className="support-name">First Name</h3>
                <input
                  className="support-input support-last"
                  type="text"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="flex flex-col w-full">
                <h3 className="support-name">Last Name</h3>
                <input
                  className="support-input support-last"
                  type="text"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>
            <div className="support-mid flex justify-between gap-[20px]">
              <div className="flex flex-col w-full">
                <h3 className="support-name">Email</h3>
                <input
                  className="support-input support-last"
                  type="text"
                  placeholder="Enter your Email"
                />
              </div>
              <div className="flex flex-col w-full">
                <h3 className="support-name">Phone Number</h3>
                <div className="flex gap-[12px]">
                  <button
                    className="change-countie flex items-center gap-[4px]"
                    onClick={() => setOpen(!isOpen)}
                  >
                    {country &&
                      country.map((item) => (
                        <img
                          key={item.flags.alt}
                          src={item.flags.png}
                          alt={item.flags.alt}
                          className="selected-country"
                        />
                      ))}

                    <img
                      src="/images/svg/change-arrow.svg"
                      alt=""
                      className={`change-arrow ${
                        isOpen == true ? "rotated" : ""
                      }`}
                    />
                  </button>
                  <input
                    className="support-input support-last w-full"
                    type="text"
                    placeholder="Enter Phone Number"
                    defaultValue={prefixe}
                    onChange={(e) => {
                      e.target.value = `${prefixe}${e.target.value.replace(
                        prefixe,
                        ""
                      )}`;
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={`select-country ${isOpen == true ? "show" : ""}`}>
              {allCountries &&
                allCountries.map((item) => (
                  <div
                    key={item.flags.svg}
                    className="country flex flex-col text-center items-center gap-[5px] min-w-[38px]"
                    onClick={() => {
                      setName(item.name.common.toLowerCase());
                    }}
                  >
                    <img
                      src={item.flags.png}
                      alt={item.flags.alt}
                      className="selected-country"
                    />
                    <h5 className="country-idd">
                      {item.idd.root}
                      {item.idd.suffixes[0]}
                    </h5>
                  </div>
                ))}
            </div>

            <div className="flex flex-col">
              <h3 className="support-name">Message</h3>
              <input
                className="support-input support-message"
                type="text"
                placeholder="Enter your Message"
              />
            </div>
            <div className="support-checkbox-wrp flex justify-between items-center gap-[15px]">
              <div className="flex items-center gap-[10px]">
                <label className="support-checkbox-label flex gap-[10px] items-center">
                  <input type="checkbox" className="support-checkbox" />
                  <span className="custom-checkbox"></span>
                  <p className="support-info">
                    I agree with Terms of Use and Privacy Policy
                  </p>
                </label>
              </div>
              <button className="btn">Send Message</button>
            </div>
          </div>
        </div>
      </div>
      <Accardion />
    </>
  );
};

export default Support;
