import React, { useState } from "react";
import { Button, Col, FormFeedback, Input, Label, Row } from "reactstrap";

const PasswordInput = ({ validation, isConfirmPasswordHide, hintsHide }) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confrimPasswordShow, setConfrimPasswordShow] = useState(false);

  return (
    <React.Fragment>
      <div className="mt-0">
        <div className="mb-2">
          <Label className="form-label" htmlFor="password-input">
            Password <span className="text-danger">*</span>
          </Label>
          <div className="position-relative auth-pass-inputgroup">
            <Input
              type={passwordShow ? "text" : "password"}
              className={`form-control pe-5 password-input ${
                validation.errors.password && validation.touched.password
                  ? "border-danger"
                  : ""
              }`}
              placeholder="Enter password"
              id="password-input"
              name="password"
              value={validation.values.password}
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
            />
            {validation.errors.password && validation.touched.password ? (
              <FormFeedback type="invalid" style={{ display: "block" }}>
                {validation.errors.password}
              </FormFeedback>
            ) : null}
            <Button
              color="link"
              onClick={() => setPasswordShow(!passwordShow)}
              className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
              id="password-addon"
            >
              {passwordShow ? (
                <i className="ri-eye-off-fill"></i>
              ) : (
                <i className="ri-eye-fill align-middle"></i>
              )}
            </Button>
          </div>
        </div>

        {!isConfirmPasswordHide && (
          <div className="mb-3">
            <Label className="form-label" htmlFor="confirm-password-input">
              Confirm Password <span className="text-danger">*</span>
            </Label>
            <div className="position-relative auth-pass-inputgroup mb-3">
              <Input
                type={confrimPasswordShow ? "text" : "password"}
                className={`form-control pe-5 password-input ${
                  validation.errors.confirmPassword &&
                  validation.touched.confirmPassword
                    ? "border-danger"
                    : ""
                }`}
                placeholder="Confirm password"
                id="confirm-password-input"
                name="confirmPassword"
                value={validation.values.confirmPassword}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
              />
              {validation.errors.confirmPassword &&
              validation.touched.confirmPassword ? (
                <FormFeedback type="invalid" style={{ display: "block" }}>
                  {validation.errors.confirmPassword}
                </FormFeedback>
              ) : null}
              <Button
                color="link"
                onClick={() => setConfrimPasswordShow(!confrimPasswordShow)}
                className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
              >
                {confrimPasswordShow ? (
                  <i className="ri-eye-off-fill"></i>
                ) : (
                  <i className="ri-eye-fill align-middle"></i>
                )}
              </Button>
            </div>
          </div>
        )}

        {!hintsHide && (
          <Row className="p-3 bg-light mb-2 rounded">
            <h5 className="fs-13">Password must contain:</h5>
            <Col>
              <p id="pass-length" className="valid fs-12 mb-2">
                Minimum <b>8 characters</b>
              </p>
              <p id="pass-lower" className="valid fs-12 mb-2">
                Atleast <b>one lowercase</b> letter (a-z)
              </p>
            </Col>
            <Col>
              <p id="pass-upper" className="valid fs-12 mb-2">
                Atleast <b>one uppercase</b> letter(A-Z)
              </p>
              <p id="pass-number" className="valid fs-12 mb-2">
                Atleast <b>one number</b> (0-9)
              </p>
            </Col>
          </Row>
        )}
      </div>
    </React.Fragment>
  );
};

export default PasswordInput;
