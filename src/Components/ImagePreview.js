import React, { Fragment } from "react";
import "../css/component.style.scss";

const ImagePreview = ({
  name,
  preview,
  height,
  width,
  className,
  closeBtn,
  onCloseClick,
  closeBtnClass,
  onClick,
}) => {
  return (
    <Fragment>
      <div className="img-preview">
        {closeBtn && (
          <div
            className={closeBtnClass ? "close line-24" : "close"}
            onClick={(e) => onCloseClick(preview, "remove", e)}
          ></div>
        )}
        <img
          key={name}
          data-dz-thumbnail=""
          height={height}
          width={width}
          className={`rounded ${className}`}
          alt={name}
          src={preview}
          onClick={onClick}
        />
      </div>
    </Fragment>
  );
};

export default ImagePreview;
