import React, { Fragment } from "react";
import { Row, Card, Col, Table, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

const UserInfoTab = ({ userinfo }) => {
  const { loginUser } = useSelector((state) => state.auth);

  const whatsAppOpen = (phoneNumber) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <Fragment>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h5 className="card-title mb-3">Info</h5>
              <div className="table-responsive">
                <Table className="table-borderless mb-0 w-50">
                  <tbody>
                    <tr>
                      <th className="ps-0" scope="row">
                        Full Name :
                      </th>
                      <td className="text-muted">
                        {userinfo.firstName} {userinfo.lastName}
                      </td>
                    </tr>
                    {!isEmpty(loginUser) && (
                      <>
                        <tr>
                          <th className="ps-0" scope="row">
                            Email :
                          </th>
                          <td className="text-muted">{userinfo.email}</td>
                        </tr>
                        <tr>
                          <th className="ps-0" scope="row">
                            Mobile :
                          </th>
                          <td className="text-muted">{userinfo.phone}</td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <th className="ps-0" scope="row">
                        Location :
                      </th>
                      <td className="text-muted">
                        {userinfo.city},{userinfo.country}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h5 className="card-title mb-3">Bio</h5>
              <Row>
                <Col xs={6} md={4}>
                  <div className="d-flex mt-4">
                    <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                      <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                        <i className="ri-user-2-fill"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="mb-1">Designation :</p>
                      <h6 className="text-truncate mb-0">
                        {userinfo?.jobTitle}
                      </h6>
                    </div>
                  </div>
                </Col>

                <Col xs={6} md={4}>
                  <div className="d-flex mt-4">
                    <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                      <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                        <i className="ri-global-line"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="mb-1">Website :</p>
                      <Link
                        to={userinfo?.website}
                        target="_blank"
                        className="fw-semibold"
                      >
                        {userinfo?.website}
                      </Link>
                    </div>
                  </div>
                </Col>

                <div className="mt-2">
                  <p>{userinfo.bio}</p>
                </div>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h5 className="card-title mb-4">Social Links</h5>
              <div className="d-flex flex-wrap gap-2">
                <div>
                  {userinfo.socialMediaProfiles?.facebook && (
                    <Link
                      to={userinfo.socialMediaProfiles.facebook}
                      target="_blank"
                      className="avatar-xs d-block"
                    >
                      <span className="avatar-title rounded-circle fs-16 bg-info text-light">
                        <i className=" ri-facebook-fill"></i>
                      </span>
                    </Link>
                  )}
                </div>
                <div>
                  {userinfo.socialMediaProfiles?.youtube && (
                    <Link
                      to={userinfo.socialMediaProfiles?.youtube}
                      className="avatar-xs d-block"
                      target="_blank"
                    >
                      <span
                        className="avatar-title rounded-circle fs-16 text-light"
                        style={{ backgroundColor: "red" }}
                      >
                        <i className=" ri-youtube-fill"></i>
                      </span>
                    </Link>
                  )}
                </div>
                <div>
                  {userinfo.socialMediaProfiles?.instagram && (
                    <Link
                      to={userinfo.socialMediaProfiles?.instagram}
                      target="_blank"
                      className="avatar-xs d-block"
                    >
                      <span className="avatar-title rounded-circle fs-16 bg-danger">
                        <i className="ri-instagram-fill"></i>
                      </span>
                    </Link>
                  )}
                </div>
                <div>
                  {!isEmpty(loginUser) && userinfo.socialMediaProfiles?.whatsapp && (
                    <Link
                      onClick={() =>
                        whatsAppOpen(userinfo.socialMediaProfiles.whatsapp)
                      }
                      to="#"
                      className="avatar-xs d-block"
                      target="_blank"
                    >
                      <span className="avatar-title rounded-circle fs-16 bg-success">
                        <i className="ri-whatsapp-fill"></i>
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UserInfoTab;
