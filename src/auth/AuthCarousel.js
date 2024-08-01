import React from "react";
import { Col } from "reactstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import {logo, whilteLogo} from '../assets/images/index'

const AuthSlider = ({ carouselHide }) => {
  return (
    <React.Fragment>
      <Col lg={6}>
        <div className="p-lg-5 p-4 auth-one-bg h-100">
          <div className="bg-overlay"></div>
          <div className="position-relative h-100 d-flex flex-column">
           { <div className="mb-4">
              <Link to="/" className="d-block">
                {/* {<img src={whilteLogo} alt="designer-logo" width={200} className="img-fluid rounded"/>} */}
                <h2 style={{color: "#fff"}}>Citizen Portal</h2>
              </Link>
            </div>}
            <div className="mt-auto">
              {/* {!carouselHide && (
                <div className="mb-3">
                  <i className="ri-double-quotes-l display-4 text-success"></i>
                </div>
              )} */}

              {/* {!carouselHide && (
                <Carousel
                  showThumbs={false}
                  autoPlay={true}
                  showArrows={false}
                  showStatus={false}
                  infiniteLoop={true}
                  className="carousel slide"
                  id="qoutescarouselIndicators"
                >
                  <div className="carousel-inner text-center text-white-50 pb-5">
                    <div className="item">
                      <p className="fs-15 fst-italic">"slider 1 "</p>
                    </div>
                  </div>
                  <div className="carousel-inner text-center text-white-50 pb-5">
                    <div className="item">
                      <p className="fs-15 fst-italic">" slider 2"</p>
                    </div>
                  </div>
                  <div className="carousel-inner text-center text-white-50 pb-5">
                    <div className="item">
                      <p className="fs-15 fst-italic">" slider 3 "</p>
                    </div>
                  </div>
                </Carousel>
              )} */}
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default AuthSlider;
