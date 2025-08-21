import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-top mb-[50px] flex justify-around flex-wrap gap-[15px]">
            <div className="footer-sections flex flex-col gap-[14px]">
              <h3 className="footer-title mb-[10px]">Home</h3>
              <a href="#" className="footer-link">
                Categories
              </a>
              <a href="#" className="footer-link">
                Devices
              </a>
              <a href="#" className="footer-link">
                Pricing
              </a>
              <a href="#" className="footer-link">
                FAQ
              </a>
            </div>
            <div className="footer-sections flex flex-col gap-[14px]">
              <h3 className="footer-title mb-[10px]">Movies</h3>
              <a href="#" className="footer-link">
                Gernes
              </a>
              <a href="#" className="footer-link">
                Trending
              </a>
              <a href="#" className="footer-link">
                New Release
              </a>
              <a href="#" className="footer-link">
                Popular
              </a>
            </div>
            <div className="footer-sections flex flex-col gap-[14px]">
              <h3 className="footer-title mb-[10px]">Shows</h3>
              <a href="#" className="footer-link">
                Gernes
              </a>
              <a href="#" className="footer-link">
                Trending
              </a>
              <a href="#" className="footer-link">
                New Release
              </a>
              <a href="#" className="footer-link">
                Popular
              </a>
            </div>
            <div className="footer-sections flex flex-col gap-[14px]">
              <h3 className="footer-title mb-[10px]">Support</h3>
              <a href="#" className="footer-link">
                Contact Us
              </a>
            </div>
            <div className="footer-sections flex flex-col gap-[14px]">
              <h3 className="footer-title mb-[10px]">Subscription</h3>
              <a href="#" className="footer-link">
                Plans
              </a>
              <a href="#" className="footer-link">
                Features
              </a>
            </div>
            <div className="footer-sections flex flex-col gap-[14px]">
              <h3 className="footer-title mb-[10px]">Connect With Us</h3>
              <div className="flex items-center gap-[14px]">
                <button className="footer-btn">
                  <img
                    width={24}
                    height={24}
                    src="/images/svg/footer-icons/facebook.svg"
                    alt=""
                  />
                </button>
                <button className="footer-btn">
                  <img
                    width={24}
                    height={24}
                    src="/images/svg/footer-icons/twitter.svg"
                    alt=""
                  />
                </button>
                <button className="footer-btn">
                  <img
                    width={24}
                    height={24}
                    src="/images/svg/footer-icons/linkedin.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#262626]"></div>
          <div className="footer-bottom flex items-center justify-between mt-[24px]">
            <p className="footer-bottom-text">
              @2023 streamvib, All Rights Reserved
            </p>
            <div className="footer-right flex gap-[20px] items-center">
              <p className="footer-bottom-text">Terms of Use</p>
              <div className="footer-line"></div>
              <p className="footer-bottom-text">Privacy Policy</p>
              <div className="footer-line"></div>
              <p className="footer-bottom-text">Cookie Policy</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
