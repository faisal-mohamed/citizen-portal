import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./home";
import Discover from "./Discover";
import ReactGA from "react-ga";
import isEmpty  from "lodash/isEmpty";

const Index = () => {
  
  document.title = "Designars";
  const { auth } = useSelector((state) => state);

  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    const element = document.getElementById("back-to-top");
    if (element) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  };

  const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <React.Fragment>
      {isEmpty(auth.loginUser) && <Home />}
      <Discover />
      <button
        onClick={() => toTop()}
        className="btn btn-danger btn-icon landing-back-top"
        id="back-to-top"
      >
        <i className="ri-arrow-up-line"></i>
      </button>
    </React.Fragment>
  );
};

export default memo(Index);
