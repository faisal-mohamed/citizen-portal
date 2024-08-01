import React, { memo } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import { Link } from "react-router-dom";
import HeroCategory from "./HeroCategory";

const Home = () => {
  return (
    <React.Fragment>
      <section className="section nft-hero" id="hero">
        {/* <HeroCategory /> */}
        <video className="bg-video hero-media" autoPlay loop muted>
          <source
            src="https://cdn.dribbble.com/uploads/39417/original/49dbf46eae15d227fc95a69cee31251e.mp4?1657824906"
            type="video/mp4"
          />
        </video>
        <Container fluid>
          <Row className="justify-content-center">
            <Col lg={8} sm={10}>
              <div className="text-center">
                <h4 className="display-6 fw-small mb-4 lh-base text-white">
                Explore the world’s leading interior designs
                </h4>
                {/* <div className=" d-flex justify-content-center">
                  <span className="mdi mdi-magnify search-widget-icon search-icon"></span>
                  <span
                    className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                    id="search-close-options"
                  ></span>
                  <Input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search..."
                    id="search-options"
                  />
                </div> */}
                <p className="lead text-white lh-base mt-2 pb-2">
                Join the network of interior designars around the world to showcase your designs on Designars - where designars thrive
                </p>

                <div className="hstack gap-2 justify-content-center">
                  <Link to="/login" className="btn btn-primary">
                  Discover Inspiration
                    <i className="ri-arrow-right-line align-middle ms-1"></i>
                  </Link>
                  <Link to="/login" className="btn btn-danger">
                  Share Your Work
                    <i className="ri-arrow-right-line align-middle ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default memo(Home);
