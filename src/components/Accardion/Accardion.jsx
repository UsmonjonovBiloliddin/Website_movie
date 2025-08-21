import React, { useState } from "react";

const Accardion = () => {
  const data = [
    {
      id: 1,
      title: "What is StreamVibe?",
      info: "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
      id: 2,
      title: "How do I sign up for StreamVibe?",
      info: "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
      id: 3,
      title: "What is the StreamVibe free trial?",
      info: "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
      id: 4,
      title: "How much does StreamVibe cost?",
      info: "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
  ];
  const secondData = [
    {
      id: 5,
      title: "How do I contact StreamVibe customer support?",
      info: "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
      id: 6,
      title: "What content is available on StreamVibe?",
      info: "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
      id: 7,
      title: "What are the StreamVibe payment methods?",
      info: "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
      id: 8,
      title: "How can I watch StreamVibe?",
      info: "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
  ];
  const [activeItem, setActiveItem] = useState(0);
  return (
    <>
      <div className="accardion mt-[120px]">
        <div className="container accardion-top flex justify-between items-end mb-[60px]">
          <div>
            <h2 className="accardion-title mb-[10px]">
              Frequently Asked Questions
            </h2>
            <p className="accardion-info">
              Got questions? We've got answers! Check out our FAQ section to
              find answers to the most common questions about StreamVibe.
            </p>
          </div>
          <button className="btn ml-[15px]">Ask a Question</button>
        </div>
        <div className="container">
          <div className="accardion-bottom flex flex-wrap justify-around">
            <div>
              {data.map((item) => {
                return (
                  <div
                    className="accardion-fit max-w-[620px] mb-[24px]"
                    key={item.id}
                  >
                    <div className="flex gap-[16px] mb-[24px]">
                      <div className="h-fit">
                        <button
                          className="accardion-btn"
                          onClick={() => {
                            if (item.id == activeItem) {
                              setActiveItem("");
                            } else {
                              setActiveItem(item.id);
                            }
                          }}
                        >
                          0{item.id}
                        </button>
                      </div>
                      <div
                        className={`accardion-right  ${
                          activeItem == item.id
                            ? "h-fit transition"
                            : "h-[50px] transition"
                        }`}
                      >
                        <h3
                          className="accardion-name mb-[14px]"
                          onClick={() => {
                            if (item.id == activeItem) {
                              setActiveItem("");
                            } else {
                              setActiveItem(item.id);
                            }
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={
                            activeItem == item.id
                              ? "accardion-info active"
                              : "accardion-info"
                          }
                        >
                          {item.info}
                        </p>
                      </div>
                      <img
                        src={
                          activeItem == item.id
                            ? "/images/svg/accardion/minus.svg"
                            : "/images/svg/accardion/plus.svg"
                        }
                        alt=""
                        onClick={() => {
                          if (item.id == activeItem) {
                            setActiveItem("");
                          } else {
                            setActiveItem(item.id);
                          }
                        }}
                      />
                    </div>
                    <div className="accardion-line"></div>
                  </div>
                );
              })}
            </div>
            <div>
              {secondData.map((item) => {
                return (
                  <div
                    className="accardion-fit max-w-[620px] mb-[24px]"
                    key={item.id}
                  >
                    <div className="flex gap-[16px] mb-[24px]">
                      <div className="h-fit">
                        <button
                          className="accardion-btn"
                          onClick={() => {
                            if (item.id == activeItem) {
                              setActiveItem("");
                            } else {
                              setActiveItem(item.id);
                            }
                          }}
                        >
                          0{item.id}
                        </button>
                      </div>
                      <div
                        className={`accardion-right  ${
                          activeItem == item.id
                            ? "h-fit transition"
                            : "h-[50px] transition"
                        }`}
                      >
                        <h3
                          className="accardion-name mb-[14px]"
                          onClick={() => {
                            if (item.id == activeItem) {
                              setActiveItem("");
                            } else {
                              setActiveItem(item.id);
                            }
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={
                            activeItem == item.id
                              ? "accardion-info active"
                              : "accardion-info"
                          }
                        >
                          {item.info}
                        </p>
                      </div>
                      <img
                        src={
                          activeItem == item.id
                            ? "/images/svg/accardion/minus.svg"
                            : "/images/svg/accardion/plus.svg"
                        }
                        alt=""
                        onClick={() => {
                          if (item.id == activeItem) {
                            setActiveItem("");
                          } else {
                            setActiveItem(item.id);
                          }
                        }}
                      />
                    </div>
                    <div className="accardion-line"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accardion;
