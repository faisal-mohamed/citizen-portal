import React from "react";
import { Spinner } from "reactstrap";
import "../css/component.style.scss";

const SiteLoader = () => {
  return (
    <div className="site-spin">
      <Spinner size="sm" color="primary" />{" "}
    </div>
  );
};

export default SiteLoader;
