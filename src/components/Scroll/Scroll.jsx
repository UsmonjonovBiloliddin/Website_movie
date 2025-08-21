import React, { useState, useEffect } from "react";

const Scroll = () => {
  const [scrolled, setScrolled] = useState(false);
  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
  };
  useEffect(() => {
    const siteScroll = () => {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", siteScroll);
    return () => window.removeEventListener("scroll", siteScroll);
  }, []);

  return (
    <button
      className={`scroll ${scrolled == true ? "site-scrolled" : ""}`}
      onClick={scrollTop}
    >
      <img src="/images/svg/Icon (3).svg" alt="" className="scroll-img" />
    </button>
  );
};

export default Scroll;
