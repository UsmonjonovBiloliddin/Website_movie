import React from "react";

const Freetrial = () => {
  return (
    <>
      <div className="freetrial mt-[150px] mb-[120px]">
        <div className="container freetrial-container">
          <div className="freetrial-wrp flex justify-between items-center gap-[20px] rounded-[12px]">
            <div>
              <h1 className="freetrial-title mb-[14px]">
                Start your free trial today!
              </h1>
              <p className="freetrial-info">
                This is a clear and concise call to action that encourages users
                to sign up for a free trial of StreamVibe.
              </p>
            </div>
            <button className="btn">Start a Free Trail</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Freetrial;
