import React from "react";
import { logoSM } from "../assets/images";
import "../css/component.style.scss"

const Loader = () => {
  return (
    <div className="spinner-wrapper">
      <img src={logoSM} alt="spinner"/>
    </div>
  );
};

export default Loader;
