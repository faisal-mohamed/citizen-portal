import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import {
  Card,
  Col,
  Container,
  Row,
  Label,
  FormFeedback,
  Input,
  Button,
  Form,
  Spinner,
} from "reactstrap";
import AuthSlider from "./AuthCarousel";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { cognitosignup } from "../models/cognito";
import User from "../models/UserModel";
import { useDispatch } from "react-redux";
import { setAuthData, setUserFirstLogin } from "../store/reducers/authSlice";
import { Failure } from "../Utilities/helpers";
import PasswordInput from "../Components/PasswordInput";
import {
  googleSignUpValidationSchema,
  signUpValidationSchema,
} from "../Utilities/constants";
import { useSelector } from "react-redux";

const SuccessComponent = () => (
  <Col lg={6}>
    <div className="p-lg-5 p-4 text-center">
      <div className="avatar-lg mx-auto mt-2">
        <div className="avatar-title bg-light text-success display-3 rounded-circle">
          <i className="ri-checkbox-circle-fill"></i>
        </div>
      </div>
      <div className="mt-4 pt-2">
        <h4>Well done !</h4>
        <p className="text-muted mx-4">
          Please verify your email sent by designars to continue.
        </p>
        <div className="mt-4">
          <Link to="/login" className="btn btn-success w-100">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  </Col>
);

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const externalProvider = useLocation();
  const { loginUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (externalProvider.state) {
      const { firstName, lastName, email, cognitoId } = externalProvider.state;
      validation.setValues({
        firstName,
        lastName,
        email,
        cognitoId,
      });
    }
  }, [externalProvider]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: false,
      cognitoId: "",
    },
    validationSchema: !externalProvider.state
      ? signUpValidationSchema
      : googleSignUpValidationSchema,
    onSubmit: async (values) => {
      try {
        if (externalProvider.state) {
          createAccount(values.cognitoId);
          return;
        }
        const data = [];
        const firstName = new CognitoUserAttribute({
          Name: "custom:firstName",
          Value: values.firstName,
        });
        const lastName = new CognitoUserAttribute({
          Name: "custom:lastName",
          Value: values.lastName,
        });
        const role = new CognitoUserAttribute({
          Name: "custom:role",
          Value: values.role ? "designer" : "user",
        });
        const attributeEmail = new CognitoUserAttribute({
          Name: "email",
          Value: values.email,
        });
        data.push(firstName);
        data.push(lastName);
        data.push(role);
        data.push(attributeEmail);
        const { userSub } = await cognitosignup(
          values.email,
          values.password,
          data
        );
        createAccount(userSub);
      } catch (err) {
        if (err === "User already exists") {
          Failure("Email already exists.please signin!");
          return;
        }
        console.log("err", err);
        Failure("failed to signup. please try agin later");
      }
    },
  });

  //google signup
  const googleLogin = () => {
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  };

  const createAccount = async (cognitoId) => {
    try {
      const payload = {
        firstName: validation.values.firstName,
        lastName: validation.values.lastName,
        email: validation.values.email,
        cognitoId,
        role: validation.values.role ? "designer" : "user",
      };
      const {
        createUser: {
          id,
          firstName,
          image,
          followingCount,
          followersCount,
          role,
        },
      } = await User.Create(payload);
      dispatch(setUserFirstLogin(true));
      dispatch(
        setAuthData(loginUser, {
          id,
          userName: firstName,
          profileImage: image,
          followingCount,
          followersCount,
          role,
          signInMethod: externalProvider.state
            ? "external provider"
            : "cognito",
        })
      );
      externalProvider.state ? navigate("/") : setIsSignUp(false);
    } catch (error) {
      Failure("Account creation failed. Please try again later");
    }
  };
  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden m-0">
                  <Row className="justify-content-center g-0">
                    <AuthSlider carouselHide={!isSignUp} />
                    {isSignUp ? (
                      <Col lg={6}>
                        <div className="p-lg-5 p-4">
                          <div>
                            <h5 className="text-primary">Register Account</h5>
                            <p className="text-muted">
                              Get your Free account now.
                            </p>
                          </div>
                          <Form onSubmit={validation.handleSubmit}>
                            <div className="mt-4">
                              <div className="mb-3">
                                <label
                                  htmlFor="useremail"
                                  className="form-label"
                                >
                                  Email <span className="text-danger">*</span>
                                </label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  placeholder="Enter email address"
                                  disabled={
                                    externalProvider.state ? true : false
                                  }
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
                                <label
                                  htmlFor="firstname"
                                  className="form-label"
                                >
                                  First name
                                  <span className="text-danger">*</span>
                                </label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="firstName"
                                  placeholder="Enter firstname"
                                  value={validation.values.firstName}
                                  onBlur={validation.handleBlur}
                                  onChange={validation.handleChange}
                                  invalid={
                                    validation.errors.firstName &&
                                    validation.touched.firstName
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.firstName &&
                                  validation.touched.firstName && (
                                    <FormFeedback type="invalid">
                                      {validation.errors.firstName}
                                    </FormFeedback>
                                  )}
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="lastname"
                                  className="form-label"
                                >
                                  Last name{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="lastName"
                                  placeholder="Enter lastname"
                                  value={validation.values.lastName}
                                  onBlur={validation.handleBlur}
                                  onChange={validation.handleChange}
                                  invalid={
                                    validation.errors.lastName &&
                                    validation.touched.lastName
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.lastName &&
                                  validation.touched.lastName && (
                                    <FormFeedback type="invalid">
                                      {validation.errors.lastName}
                                    </FormFeedback>
                                  )}
                              </div>
                              {!externalProvider.state && (
                                <PasswordInput
                                  validation={validation}
                                  isConfirmPasswordHide
                                />
                              )}

                              {/* {<div className="form-check form-check-outline form-check-primary mb-4 mt-4">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="role"
                                  checked={validation.values.role}
                                  onBlur={validation.handleBlur}
                                  onChange={validation.handleChange}
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="formCheck13"
                                >
                                  I am an interior designer
                                </Label>
                              </div>} */}

                              <div className="mb-4">
                                <p className="mb-0 fs-12 text-muted fst-italic">
                                  By registering you agree to the designars{" "}
                                  <Link
                                    to="/terms-of-service"
                                    target="_blank"
                                    className="text-primary text-decoration-underline fst-normal fw-medium"
                                  >
                                    Terms of Use
                                  </Link>{" "}
                                  and {"  "}
                                  <Link
                                    to="/privacy-policy"
                                    target="_blank"
                                    className="text-primary text-decoration-underline fst-normal fw-medium"
                                  >
                                    Privacy policy
                                  </Link>
                                </p>
                              </div>
                              <div className="mt-4">
                                <Button
                                  color="success"
                                  className="w-100"
                                  type="submit"
                                >
                                  {validation.isSubmitting ? (
                                    <Spinner
                                      size="sm"
                                      className="flex-shrink-0"
                                    />
                                  ) : (
                                    "Signup"
                                  )}
                                </Button>
                              </div>

                              {!externalProvider.state && (
                                <div className="mt-4 text-center">
                                  <div className="signin-other-title">
                                    <h5 className="fs-13 mb-4 title text-muted">
                                      Create account with
                                    </h5>
                                  </div>

                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-icon waves-effect waves-light me-1"
                                    >
                                      <i className="ri-facebook-fill fs-16"></i>
                                    </button>
                                    <Button
                                      color="danger"
                                      className="btn-icon me-1"
                                      onClick={googleLogin}
                                    >
                                      <i className="ri-google-fill fs-16"></i>
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </Form>

                          {!externalProvider.state && (
                            <div className="mt-5 text-center">
                              <p className="mb-0">
                                Already have an account ?
                                <Link
                                  to="/login"
                                  className="fw-semibold text-primary text-decoration-underline"
                                >
                                  Signin
                                </Link>
                              </p>
                            </div>
                          )}
                        </div>
                      </Col>
                    ) : (
                      <SuccessComponent />
                    )}
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

export default SignUp;
