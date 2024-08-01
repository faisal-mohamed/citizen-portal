import React from "react";
import ContentLoader from "react-content-loader";

const ContainerLoader = (props) => (
  <div className="d-flex flex-column align-content-center justify-content-center ">
    <ContentLoader viewBox="0 0 700 250" {...props}>
      <circle cx="159" cy="31" r="15" />
      <rect x="190" y="18" rx="2" ry="2" width="140" height="10" />
      <rect x="190" y="34" rx="2" ry="2" width="140" height="10" />
      <rect x="150" y="60" rx="2" ry="2" width="400" height="220" />
    </ContentLoader>
  </div>
);

export default ContainerLoader;
