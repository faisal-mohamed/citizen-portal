import React, { useState } from "react";
import {
  Col,
  Collapse,
  Container,
  NavbarToggler,
  NavLink,
  Row,
} from "reactstrap";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import Primary from "./button_ui";
import { logo } from "../assets/images";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import { uploadRestrictedPages } from "../Utilities/constants";
import { useDispatch } from "react-redux";
import { setUploadImages } from "../store/reducers/commonSlice";
import isEmpty from "lodash/isEmpty";

const Navbar = () => {
  const [isOpenMenu, setisOpenMenu] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);

  const toggle = () => setisOpenMenu(!isOpenMenu);
  const { pathname } = useLocation();
  const isUploadHide = uploadRestrictedPages.some((path) =>
    matchPath({ path: path, exact: true }, pathname)
  );

  function navigateuploadPage() {
    dispatch(setUploadImages({ s3Urls: [], thumbnailUrl: "" }));
    navigate("/upload/new");
  }
  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-landing navbar-light fixed-top is-sticky"
        id="navbar"
      >
        <Container fluid>
          <Row className="w-100 d-flex flex-row justify-content-between">
            <Col className="d-flex align-items-center">
              <Link className="logo-img" to="/">
                {/* {<img src={logo} alt="logo" className="logo" />} */}
                <h2 style={{color: '#000'}}>Citizen Portal</h2>
              </Link>
            </Col>
            <Col className="d-flex justify-content-end">
              <div className="d-flex gap-2 align-items-center">
                {isEmpty(auth.loginUser) ? (
                  <>
                    <Link
                      to="/login"
                      className="btn btn-info fw-medium text-decoration-none"
                    >
                      Sign in
                    </Link>
                    <Link to="/signup" className="btn btn-primary">
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    {auth.loginUser.role &&
                      auth.loginUser.role !== "user" &&
                      !isUploadHide && (
                        <Primary
                          id="uploadBtn"
                          text="Upload"
                          className="primary fw-medium"
                          onClick={navigateuploadPage}
                        />
                      )}

                    {pathname === "/upload/new/post" && (
                      <Primary
                        text="Upload more"
                        className="primary fw-medium"
                        onClick={() => navigate("/upload/new")}
                      />
                    )}
                    <ProfileDropdown />
                  </>
                )}
              </div>
            </Col>
          </Row>

          {/* <NavbarToggler
            className="navbar-toggler py-0 fs-20 text-body"
            onClick={toggle}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu"></i>
          </NavbarToggler>

          <Collapse
            style={{ paddingLeft: "50px" }}
            isOpen={isOpenMenu}
            className="navbar-collapse justify-content-lg-between"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav " id="navbar-example">
              <li className="nav-item">
                <NavLink className="fs-14 text-muted " href='/'>
                  Discover
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-14 text-muted " href="#foroyu">
                  For You
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="fs-14 text-muted" href="#hire">
                  Hire Designers
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="fs-14 text-muted " href="#joinpro">
                  Join as Pro
                </NavLink>
              </li>
            </ul>
            

            <div className="d-flex gap-2 align-items-center">
              {isEmpty(auth.loginUser) ? (
                <>
                  <Link
                    to="/login"
                    className="btn btn-info fw-medium text-decoration-none"
                  >
                    Sign in
                  </Link>
                  <Link to="/signup" className="btn btn-primary">
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {auth.loginUser.role &&
                    auth.loginUser.role !== "user" &&
                    !isUploadHide && (
                      <div className="d-flex gap-2 h-25">
                        <Primary
                        id="uploadBtn"
                          text="Upload"
                          className="primary fw-medium"
                          onClick={navigateuploadPage}
                        />
                      </div>
                    )}
                  <ProfileDropdown />
                </>
              )}
            </div>
          </Collapse> */}
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
