import React, {  useEffect } from "react";
import { Card, Col, Container, Row, CardHeader, CardBody } from "reactstrap";

import Button from "../../Components/button_ui";

import DropZone from "./DropZone";

//css import
import "./uploadScreen.scss";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "react-redux";
import ReactGA from "react-ga";

const UploadScreen = () => {

  document.title = "Upload work | Desigers";
  const {
    uploadedImages: { s3Urls },
  } = useSelector((state) => state.common);

  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader className="card-header">
                <Row className="g-2">
                  <Col>
                    <Button
                      className="action-btn close"
                      onClick={() => navigate("/")}
                      text="Cancel"
                    />
                  </Col>
                  <Col className="d-flex gap-2 justify-content-lg-end">
                    <Button
                      text={"Continue"}
                      className="action-btn primary"
                      disabled={isEmpty(s3Urls)}
                      onClick={() => navigate("/upload/new/post")}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h4 className="mb-3 fw-semibold lh-base text-center">
                  Showcase your interior design portfolio - upload your project
                  images below to get started!
                </h4>
                <DropZone />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default UploadScreen;
