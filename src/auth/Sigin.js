import React, { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Spinner,
  FormFeedback,
  Form,
} from "reactstrap";
import AuthSlider from "./AuthCarousel";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { setAuthData } from "../store/reducers/authSlice";
import { signin } from "../models/cognito";
import User from "../models/UserModel";
import { Failure } from "../Utilities/helpers";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../Components/PasswordInput";
import { useSelector } from "react-redux";

const Login = () => {
  document.title = "SignIn";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginUser } = useSelector((state) => state.auth);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
      passwordShow: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invaild Email Id")
        .required("Email shouldn't be empty"),
      password: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { attributes } = await signin(values.email, values.password);
        const {
          listUsers: {
            items: [firstItem],
          },
        } = await User.checkUserExist(attributes.sub);
        const { id, firstName, image, followingCount, followersCount, role } =
          firstItem;
        dispatch(
          setAuthData(loginUser, {
            id,
            userName: firstName,
            profileImage: image,
            followingCount,
            followersCount,
            role,
            signInMethod: attributes.identities
              ? "external provider"
              : "cognito",
          })
        );
        navigate("/");
      } catch (err) {
        console.log("err", err);
        switch (err) {
          case "Incorrect username or password.":
            Failure("Incorrect email or password.");
            break;
          case "User does not exist.":
            Failure("User does not exist. Please sign up.");
            break;
          case "User is not confirmed.":
            Failure(
              "Email is not verified. Please verify the email sent by designars."
            );
            break;
          default:
            Failure("failed to login.Please try agin later!");
            break;
        }
      }
    },
  });

  const googleLogin = () => {
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  };

  const facebookLogin = () => {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Facebook,
    });
  };
  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden">
                  <Row className="g-0">
                    <AuthSlider />

                    <Col lg={6}>
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p className="text-muted">Sign in to continue.</p>
                        </div>
                        <Form onSubmit={validation.handleSubmit}>
                          <div className="mt-4">
                            <div className="mb-3">
                              <Label htmlFor="username" className="form-label">
                                Email <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                name="email"
                                placeholder="Enter email"
                                value={validation.values.email}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                invalid={
                                  validation.errors.email &&
                                  validation.touched.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.errors.email &&
                                validation.touched.email && (
                                  <FormFeedback type="invalid">
                                    {validation.errors.email}
                                  </FormFeedback>
                                )}
                            </div>

                            <div className="mb-3">
                              <div className="float-end">
                                <Link
                                  to="/forgot-password"
                                  className="text-muted"
                                >
                                  Forgot password?
                                </Link>
                              </div>
                              <PasswordInput
                                validation={validation}
                                isConfirmPasswordHide
                                hintsHide
                              />
                            </div>

                            <div className="form-check">
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="auth-remember-check"
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="auth-remember-check"
                              >
                                Remember me
                              </Label>
                            </div>

                            <div className="mt-4">
                              <Button
                                type="submit"
                                color="success"
                                className="w-100"
                                disabled={validation.isSubmitting}
                              >
                                {validation.isSubmitting ? (
                                  <Spinner
                                    size="sm"
                                    className="flex-shrink-0"
                                  />
                                ) : (
                                  "Sign In"
                                )}
                              </Button>
                            </div>

                            <div className="mt-4 text-center">
                              <div className="signin-other-title">
                                <h5 className="fs-13 mb-4 title">
                                  Sign In with
                                </h5>
                              </div>

                              <div>
                                <Button
                                  color="primary"
                                  className="btn-icon me-1"
                                  onClick={facebookLogin}
                                >
                                  <i className="ri-facebook-fill fs-16"></i>
                                </Button>
                                <Button
                                  color="danger"
                                  className="btn-icon me-1"
                                  onClick={googleLogin}
                                >
                                  <i className="ri-google-fill fs-16"></i>
                                </Button>
                                {/* <Button color="info" className="btn-icon">
                                  <i className="ri-twitter-fill fs-16"></i>
                                </Button> */}
                              </div>
                            </div>
                          </div>
                        </Form>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            Don't have an account ?{" "}
                            <a
                              href="/signup"
                              className="fw-semibold text-primary text-decoration-underline"
                            >
                              {" "}
                              Signup
                            </a>{" "}
                          </p>
                        </div>
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

export default memo(Login);
