import React, { useState } from "react";

const Plan = () => {
  const [data, setData] = useState([
    {
      title: "Basic Plan",
      info: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
      price: 9.99,
      plan: "month",
    },
    {
      title: "Standard Plan",
      info: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      price: 12.99,
      plan: "month",
    },
    {
      title: "Premium Plan",
      info: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
      price: 14.99,
      plan: "month",
    },
  ]);
  const [open, setOpen] = useState("left");
  return (
    <>
      <div className="palan mt-[30px]">
        <div className="container plan-container">
          <div className="plan-top flex items-center justify-between mb-[50px]">
            <div>
              <h2 className="plan-title mb-[14px]">
                Choose the plan that's right for you
              </h2>
              <p className="plan-info">
                Join StreamVibe and select from our flexible subscription
                options tailored to suit your viewing preferences. Get ready for
                non-stop entertainment!
              </p>
            </div>
            <nav className="sitenav h-[79px]">
              <ul className="sitenav-list flex gap-[24px] items-center">
                <li className="li sitenav-item" onClick={() => setOpen("left")}>
                  <button
                    className={`sitenav-link plan-link ${
                      open == "left" ? "open rounded-[8px]" : ""
                    }`}
                    onClick={() => {
                      setData([
                        {
                          title: "Basic Plan",
                          info: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
                          price: 9.99,
                          plan: "month",
                        },
                        {
                          title: "Standard Plan",
                          info: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
                          price: 12.99,
                          plan: "month",
                        },
                        {
                          title: "Premium Plan",
                          info: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
                          price: 14.99,
                          plan: "month",
                        },
                      ]);
                    }}
                  >
                    Monthly
                  </button>
                </li>
                <li
                  className="li sitenav-item"
                  onClick={() => setOpen("right")}
                >
                  <button
                    className={`sitenav-link plan-link ${
                      open == "right" ? "open rounded-[8px]" : ""
                    }`}
                    onClick={() => {
                      setData([
                        {
                          title: "Basic Plan",
                          info: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
                          price: 90.99,
                          plan: "year",
                        },
                        {
                          title: "Standard Plan",
                          info: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
                          price: 120.99,
                          plan: "year",
                        },
                        {
                          title: "Premium Plan",
                          info: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
                          price: 140.99,
                          plan: "year",
                        },
                      ]);
                    }}
                  >
                    Yearly
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="plan-bottom flex justify-around items-center flex-wrap gap-[25px]">
            {data.map((item) => {
              return (
                <div key={item.price} className="plan-card">
                  <h3 className="plan-name mb-[16px]">{item.title}</h3>
                  <p className="plan-info mb-[25px]">{item.info}</p>
                  <h2 className="plan-price mb-[25px]">
                    {item.price}
                    <span className="time">/{item.plan}</span>
                  </h2>
                  <div className="flex items-center justify-around flex-wrap gap-[15px] max-w-[345px]">
                    <button className="grey-btn">Start Free Trial</button>
                    <button className="red-btn">Choose Plan</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;
