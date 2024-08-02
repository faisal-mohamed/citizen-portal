import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { logo, whilteLogo } from "../assets/images";
const Footer = () => {
  return (
    <React.Fragment>
      <footer className="custom-footer bg-dark py-5 position-relative">
        <Container>
          <Row>
            <Col lg={4} className="mt-4">
              <div>
                <div>
                  {/* {<img src={whilteLogo}  alt="logo light" height={20}/>} */}
                  <h2 style={{color: '#fff'}}>Citizen Portal</h2>
                </div>
                <div className="mt-4 fs-15">
                  <p>
                   
                  </p>
                  <ul className="list-inline mb-0 footer-social-link">
                    <li className="list-inline-item">
                      <Link to="#!" className="avatar-xs d-block">
                        <div className="avatar-title rounded-circle">
                          <i className="ri-facebook-fill"></i>
                        </div>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#!" className="avatar-xs d-block">
                        <div className="avatar-title rounded-circle">
                          <i className="ri-instagram-fill"></i>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col lg={7} className="ms-lg-auto">
              <Row>
                <Col sm={4} className="mt-4">
                  <h5 className="text-white mb-0">Home</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list fs-15">
                      <li>
                        <NavLink to="/">Discover</NavLink>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col sm={6} className="mt-4">
                  <h5 className="text-white mb-0">Support</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list fs-15">
                      <li>
                        <NavLink
                          to="#"
                          onClick={() =>
                            (window.location = "mailto:support@designars.sg")
                          }
                        >
                          Contact us <span className="text-primary text-decoration-underline"  to="#">support@mneotech.com</span>
                        </NavLink>
                      </li>
                      {/* <li>
                        <NavLink
                          to="#"
                          onClick={() =>
                            (window.location = "mailto:dpo@designers.sg")
                          }
                        >
                          Privacy matters <span className="text-primary text-decoration-underline"  to="#">dpo@designers.sg</span>
                        </NavLink>
                      </li> */}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="text-center text-sm-start align-items-center mt-5">
            <Col sm={6}>
              <div>
                <p className="copy-rights mb-0">
                  {new Date().getFullYear()} © Citizen Portal
                </p>
              </div>
            </Col>
            <Col sm={6}>
              <div className="text-sm-end mt-3 mt-sm-0">
                <ul className="list-inline mb-0 footer-list gap-4 fs-15">
                  <li className="list-inline-item">
                    <NavLink to="/privacy-policy" target="_blank">Privacy Policy</NavLink>
                  </li>
                  <li className="list-inline-item">
                    <NavLink to="/terms-of-service" target="_blank">Terms & Conditions</NavLink>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
