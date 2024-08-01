import React, { useState } from "react";
import {
  Button,
  Col,
  FormFeedback,
  Input,
  Label,
  Row,
  Form,
  Spinner,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { userChangePassword } from "../../models/cognito";
import { Failure, Success } from "../../Utilities/helpers";

const ChangePassword = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confrimPasswordShow, setConfrimPasswordShow] = useState(false);
  const [oldPasswordShow, setOldPasswordShow] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(8, "password must be at least 8 characters")
        .matches(RegExp("(.*[a-z].*)"), "Atleast one lowercase letter")
        .matches(RegExp("(.*[A-Z].*)"), "Atleast one uppercase letter")
        .matches(RegExp("(.*[0-9].*)"), "Atleast one number")
        .required("old password shouldn't be empty"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(RegExp("(.*[a-z].*)"), "Atleast one lowercase letter")
        .matches(RegExp("(.*[A-Z].*)"), "Atleast one uppercase letter")
        .matches(RegExp("(.*[0-9].*)"), "Atleast one number")
        .required("current password shouldn't be empty"),
      confirmPassword: Yup.string()
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: () =>
            Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be the same"
            ),
        })
        .required("Confirm Password Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await userChangePassword(
          values.oldPassword,
          values.password
        );
        Success("Password Changed Successfully!");
        validation.resetForm()
        console.log("res", res);
      } catch (error) {
        console.log("res", error);
        if (error === "Incorrect username or password.") {
          Failure("Incorrect Password!");
          return;
        }
        Failure("Oops!. Change Password failed. try agin later!");
      }
    },
  });

  return (
    <React.Fragment>
      <Form onSubmit={validation.handleSubmit}>
        <Row className="mt-0">
          <Col lg={4}>
            <Col>
              <div className="mb-2">
                <Label className="form-label" htmlFor="password-input">
                  Old Password
                </Label>
                <div className="position-relative auth-pass-inputgroup">
                  <Input
                    type={oldPasswordShow ? "text" : "password"}
                    className={`form-control pe-5 password-input ${
                      validation.errors.oldPassword &&
                      validation.touched.oldPassword
                        ? "border-danger"
                        : ""
                    }`}
                    placeholder="Enter old password"
                    id="password-input"
                    name="oldPassword"
                    value={validation.values.oldPassword}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                  />
                  {validation.errors.oldPassword &&
                  validation.touched.oldPassword ? (
                    <FormFeedback type="invalid" style={{ display: "block" }}>
                      {validation.errors.oldPassword}
                    </FormFeedback>
                  ) : null}
                  <Button
                    color="link"
                    onClick={() => setOldPasswordShow(!oldPasswordShow)}
                    className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                    id="password-addon"
                  >
                    {oldPasswordShow ? (
                      <i className="ri-eye-off-fill"></i>
                    ) : (
                      <i className="ri-eye-fill align-middle"></i>
                    )}
                  </Button>
                </div>
              </div>
            </Col>
            <Col>
              <div className="mb-2">
                <Label className="form-label" htmlFor="password-input">
                  Password
                </Label>
                <div className="position-relative auth-pass-inputgroup">
                  <Input
                    type={passwordShow ? "text" : "password"}
                    className={`form-control pe-5 password-input ${
                      validation.errors.password && validation.touched.password
                        ? "border-danger"
                        : ""
                    }`}
                    placeholder="Enter current password"
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
            </Col>

            <Col>
              <Label className="form-label" htmlFor="confirm-password-input">
                Confirm Password
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
            </Col>
          </Col>

          <Col
            lg={8}
            className="p3 d-flex flex-column justify-content-lg-evenly bg-light  rounded"
          >
            <h5 className="fs-13">Password must contain:</h5>

            <p id="pass-length" className="valid fs-12 mb-2">
              Minimum <b>8 characters</b>
            </p>
            <p id="pass-lower" className="valid fs-12 mb-2">
              Atleast <b>one lowercase</b> letter (a-z)
            </p>

            <p id="pass-upper" className="valid fs-12 mb-2">
              Atleast <b>one uppercase</b> letter(A-Z)
            </p>
            <p id="pass-number" className="valid fs-12 mb-2">
              Atleast <b>one number</b> (0-9)
            </p>
          </Col>
          <Col
            lg={4}
            className="d-flex flex-row gap-3 align-items-center justify-content-between"
          >
            <div className="">
              <Link
                to="/forgot-password"
                className="link-primary text-decoration-underline"
              >
                Forgot Password ?
              </Link>
            </div>
            <div className="">
              <Button
                type="submit"
                color="success"
                disabled={validation.isSubmitting}
              >
                {validation.isSubmitting ? (
                  <Spinner size="sm" className="flex-shrink-0" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default ChangePassword;
