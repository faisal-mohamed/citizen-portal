import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Form,
  Input,
  Spinner,
  FormFeedback,
} from "reactstrap";

import AuthSlider from "./AuthCarousel";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../Components/PasswordInput";
import { forgotPasswordSubmit } from "../models/cognito";
import { Failure } from "../Utilities/helpers";

const TwoStepVerify = () => {

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.email) navigate("/login");
  }, [state]);

  const getInputElement = (index) => {
    return document.getElementById("digit" + index + "-input");
  };

  const moveToNext = (index) => {
    if (getInputElement(index).value.length === 1) {
      if (index !== 6) {
        getInputElement(index + 1).focus();
      } else {
        getInputElement(index).blur();
        // Submit code
        console.log("submit code");
      }
    }
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      num1: "",
      num2: "",
      num3: "",
      num4: "",
      num5: "",
      num6: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      num1: Yup.string().required("Please fill out missing fields"),
      num2: Yup.string().required("Please fill out missing fields"),
      num3: Yup.string().required("Please fill out missing fields"),
      num4: Yup.string().required("Please fill out missing fields"),
      num5: Yup.string().required("Please fill out missing fields"),
      num6: Yup.string().required("Please fill out missing fields"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(RegExp("(.*[a-z].*)"), "Atleast one lowercase letter")
        .matches(RegExp("(.*[A-Z].*)"), "Atleast one uppercase letter")
        .matches(RegExp("(.*[0-9].*)"), "Atleast one number")
        .required("This field is required"),
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
    onSubmit: (values) => {
      const otp = Object.entries(values)
        .filter(([key]) => key !== "password" && key !== "confirmPassword")
        .map(([, value]) => value)
        .join("");
      forgotPasswordSubmit(state.email, otp, values.password)
        .then((res) => navigate('/login'))
        .catch((err) => {
           Failure(err)
        });
    },
  });
  const hasNumFieldError = Object.values(validation.errors)
  .filter((errorValue) => errorValue === 'Please fill out missing fields')
  .some(Boolean);

  console.log('hasN',hasNumFieldError)
  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden">
                  <Row className="justify-content-center g-0">
                    <AuthSlider />
                    <Col lg={6}>
                      <div className="p-lg-5 p-4">
                        <h5 className="text-primary">Create new password</h5>
                        <div className="">
                          <p>
                            Please enter the 6 digit code sent to &nbsp;
                            <span className="fw-semibold">{state?.email}</span>
                          </p>
                        </div>

                        <div className="mt-1">
                          <Form
                            onSubmit={validation.handleSubmit}
                          >
                            <Row>
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                <Col className="col-2">
                                  <div className="mb-1">
                                    <label
                                      htmlFor="digit1-input"
                                      className="visually-hidden"
                                    >
                                      {`Digit ${num}`}
                                    </label>
                                    <Input
                                      type="number"
                                      name={`num${num}`}
                                      className={`form-control form-control-lg bg-light ${
                                        validation.errors[`num${num}`]
                                          ? "border-success"
                                          : "border-light"
                                      } text-center`}
                                      maxLength="1"
                                      id={`digit${num}-input`}
                                      onKeyUp={() => moveToNext(num)}
                                      onBlur={validation.handleBlur}
                                      onChange={validation.handleChange}
                                      autoComplete="off"
                                    />
                                  </div>
                                </Col>
                              ))}
                            </Row>
                            {hasNumFieldError && (
                              <FormFeedback
                                type="invalid"
                                style={{ display: "block" }}
                              >
                                please fill out missing fields!
                              </FormFeedback>
                            )}
                            <PasswordInput validation={validation} />

                            <div className="mt-2">
                              <Button
                                color="success"
                                className="w-100"
                                type="submit"
                                disabled={validation.isSubmitting}
                              >
                                {validation.isSubmitting ? (
                                  <Spinner
                                    size="sm"
                                    className="flex-shrink-0"
                                  />
                                ) : (
                                  " Reset Password"
                                )}
                              </Button>
                            </div>
                          </Form>
                        </div>
                        <Row>
                          <Col>
                            <p className="mb-0 mt-2">
                              Didn't receive a code ?
                              <Link
                                to="/forgot-password"
                                className="fw-semibold text-primary text-decoration-underline"
                              >
                                Resend
                              </Link>
                            </p>
                          </Col>
                          <Col>
                            <p className="mb-0 mt-2">
                              remembered password?
                              <Link
                                to="/login"
                                className="fw-semibold text-primary text-decoration-underline"
                              >
                                Click here
                              </Link>
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TwoStepVerify;
