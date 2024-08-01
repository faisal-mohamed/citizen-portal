import React from "react";
import "../css/component.style.scss";
import { Spinner } from "reactstrap";

const Button = ({
  text,
  onClick,
  className,
  type,
  activity,
  disabled,
  id,
  activityMsg,
}) => {
  return (
    <>
      {activity ? (
        <button id={id} disabled={true} className={`action-btn ${className}`}>
          <Spinner size="sm" className="flex-shrink-0"/>
          {" "}{activityMsg}
        </button>
      ) : (
        <button
          id={id}
          className={`action-btn ${className}`}
          onClick={onClick}
          disabled={disabled}
          type={type || "button"}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
