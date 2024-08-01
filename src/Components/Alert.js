import React from "react";
import { Alert as AlertComponent, Col } from "reactstrap";

const Alert = ({ message, color, show, toggle }) => {
  return (
    <Col xl={8}>
      <AlertComponent
        color={color}
        isOpen={show}
        className="alert-border-left"
        toggle={toggle}
      >
        {color === "warning" && (
          <>
            <i className="ri-alert-line me-3 align-middle fs-16"></i>
            <strong>Warning</strong>
          </>
        )}
        {color === "danger" && (
          <>
            <i className="ri-error-warning-line me-3 align-middle fs-16"></i>
            <strong>Error</strong>
          </>
        )}
        {color === "success" && (
          <>
            <i className="ri-check-double-line me-3 align-middle fs-16"></i>
            <strong>Success</strong>
          </>
        )}
        - {message}
      </AlertComponent>
    </Col>
  );
};

export default Alert;
