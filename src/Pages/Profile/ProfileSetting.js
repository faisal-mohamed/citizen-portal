import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Spinner,
} from "reactstrap";
import classnames from "classnames";
import UpdateForm from "./UpdateForm";
import User from "../../models/UserModel";
import ReactGA from "react-ga";
import { defaultUser } from "../../assets/images";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../store/reducers/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { Success } from "../../Utilities/helpers";
import ChangePassword from "./ChangePassword";
import { useSelector } from "react-redux";
import { file } from "../../models/filesModel";

const ProfileSetting = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [socialProfiles, setSocialProfiles] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    whatsapp: "",
  });
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    website: "",
    city: "Singapore",
    country: "Singapore",
    bio: "",
    profileImage: {},
    experience: 0,
    contactNumber: "",
    company: "",
  });
  const { userId } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { signInMethod } = useSelector((state) => state.auth.loginUser);

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getUserInfo();
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const getUserInfo = async (updateType) => {
    try {
      const userInfo = await User.getUserDetails(userId);
      const {
        firstName,
        lastName,
        website,
        image,
        bio,
        jobTitle,
        experience,
        socialMediaProfiles,
        phone,
        company,
      } = userInfo.getUser;
      setFormState((state) => ({
        ...state,
        firstName,
        lastName,
        website,
        jobTitle,
        experience,
        profileImage: image,
        bio,
        contactNumber: phone,
        company,
      }));

      setSocialProfiles((state) => ({
        ...state,
        ...JSON.parse(socialMediaProfiles),
      }));
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleFormChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "experience" && value.length > 2) {
      return;
    }
    value = name === "experience" ? Number(value) : value;
    setFormState((state) => ({ ...state, [name]: value }));
  };
  function handleAcceptedFiles(event) {
    const files = event.target.files;
    Object.assign(files[0], {
      preview: URL.createObjectURL(files[0]),
    });
    setFormState((state) => ({ ...state, profileImage: files[0] }));
  }
  const socialProfileChange = (e) => {
    setSocialProfiles((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const updateUser = async (updateType) => {
    setLoading(true);
    try {
      if (updateType === "social") {
        const userInfo = await User.update({
          id: userId,
          socialMediaProfiles: JSON.stringify(socialProfiles),
        });
        setLoading(false);
        navigate(-1);
        Success("Social links are updated successfully");
        return;
      }
      let profileImage = formState.profileImage;

      if (profileImage && typeof profileImage !== "string") {
        profileImage = await file.upload(formState.profileImage);
      }

      const payload = {
        id: userId,
        firstName: formState.firstName,
        lastName: formState.lastName,
        jobTitle: formState.jobTitle,
        company: formState.company,
        phone: formState.contactNumber,
        website: formState.website,
        city: formState.city,
        experience: formState.experience,
        country: formState.country,
        bio: formState.bio,
        image: profileImage,
      };
      const updateResponse = await User.update(payload);
      const {
        updateUser: {
          id,
          firstName,
          image,
          followingCount,
          followersCount,
          role,
        },
      } = updateResponse;
      setLoading(false);
      dispatch(
        setAuthData({
          id,
          userName: firstName,
          profileImage: image,
          followingCount,
          followersCount,
          role,
        })
      );
      Success("profile updated successfully");
      navigate(-1);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content mt-5">
        <Container fluid>
          <div className="position-relative mx-n4">
            <div className="profile-wid-bg profile-setting-img">
              <img src={undefined} className="profile-wid-img" alt="" />
              <div className="overlay-content">
                <div className="text-end p-3">
                  <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                    <Input
                      id="profile-foreground-img-file-input"
                      type="file"
                      className="profile-foreground-img-file-input"
                    />
                    <Label
                      htmlFor="profile-foreground-img-file-input"
                      className="profile-photo-edit btn btn-light"
                    >
                      <i className="ri-image-edit-line align-bottom me-1"></i>{" "}
                      Change Cover
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col xxl={3}>
              <Card className="mt-n5">
                <CardBody className="p-4">
                  <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                      <img
                        src={
                          typeof formState.profileImage === "string"
                            ? formState.profileImage
                            : formState.profileImage?.preview || defaultUser
                        }
                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                        alt="user-profile"
                      />
                      <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                        <Input
                          id="profile-img-file-input"
                          type="file"
                          className="profile-img-file-input"
                          accept="image/*"
                          onChange={handleAcceptedFiles}
                        />
                        <Label
                          htmlFor="profile-img-file-input"
                          className="profile-photo-edit avatar-xs"
                        >
                          <span className="avatar-title rounded-circle bg-light text-body">
                            <i className="ri-camera-fill"></i>
                          </span>
                        </Label>
                      </div>
                    </div>
                    <h5 className="fs-16 mb-1">{`${formState.firstName} ${formState.lastName}`}</h5>
                    <p className="text-muted mb-0">{formState.jobTitle}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xxl={9}>
              <Card className="mt-xxl-n5">
                <CardHeader>
                  <Nav
                    className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          tabChange("1");
                        }}
                        type="button"
                      >
                        <i className="fas fa-home"></i>
                        Personal Details
                      </NavLink>
                    </NavItem>
                    {signInMethod === "cognito" && (
                      <NavItem>
                        <NavLink
                          to="#"
                          className={classnames({ active: activeTab === "2" })}
                          onClick={() => {
                            tabChange("2");
                          }}
                          type="button"
                        >
                          <i className="far fa-user"></i>
                          Change Password
                        </NavLink>
                      </NavItem>
                    )}
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => {
                          tabChange("3");
                        }}
                        type="button"
                      >
                        <i className="far fa-envelope"></i>
                        Social Media Profiles
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-4">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <UpdateForm
                        formData={formState}
                        handleFormChange={handleFormChange}
                      />
                      <Col lg={12}>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-soft-success"
                            onClick={() => navigate(`/profile/${userId}`)}
                          >
                            Back to profile
                          </button>
                          <Button
                            color="primary"
                            className="btn-load"
                            disabled={loading}
                            onClick={() => updateUser()}
                          >
                            <span className="d-flex align-items-center">
                              {loading && (
                                <Spinner size="sm" className="flex-shrink-0">
                                  Updating...
                                </Spinner>
                              )}
                              <span className="flex-grow-1 ms-2">Update</span>
                            </span>
                          </Button>
                        </div>
                      </Col>
                    </TabPane>

                    <TabPane tabId="2">
                      <ChangePassword />
                    </TabPane>
                    <TabPane tabId="3">
                      <Card>
                        <CardBody>
                          <div className="d-flex align-items-center mb-4">
                            <div className="flex-grow-1">
                              <h5 className="card-title mb-0">Portfolio</h5>
                            </div>
                          </div>
                          <div className="mb-3 d-flex">
                            <div className="avatar-xs d-block flex-shrink-0 me-3">
                              <span className="avatar-title rounded-circle fs-16 bg-info text-light">
                                <i className="ri-facebook-fill"></i>
                              </span>
                            </div>
                            <Input
                              type="text"
                              className="form-control"
                              name="facebook"
                              placeholder="Enter Facebook profile url"
                              onChange={socialProfileChange}
                              value={socialProfiles.facebook}
                            />
                          </div>
                          <div className="mb-3 d-flex">
                            <div className="avatar-xs d-block flex-shrink-0 me-3">
                              <span
                                className="avatar-title rounded-circle fs-16"
                                style={{ backgroundColor: "red" }}
                              >
                                <i className="ri-youtube-fill"></i>
                              </span>
                            </div>
                            <Input
                              type="text"
                              className="form-control"
                              name="youtube"
                              placeholder="Enter Youtube channel link"
                              onChange={socialProfileChange}
                              value={socialProfiles.youtube}
                            />
                          </div>
                          <div className="mb-3 d-flex">
                            <div className="avatar-xs d-block flex-shrink-0 me-3">
                              <span className="avatar-title rounded-circle fs-16 bg-danger">
                                <i className="ri-instagram-fill"></i>
                              </span>
                            </div>
                            <Input
                              type="text"
                              className="form-control"
                              name="instagram"
                              placeholder="Enter Instagram url"
                              onChange={socialProfileChange}
                              value={socialProfiles.instagram}
                            />
                          </div>
                          <div className="d-flex">
                            <div className="avatar-xs d-block flex-shrink-0 me-3">
                              <span className="avatar-title rounded-circle fs-16 bg-success">
                                <i className="ri-whatsapp-fill"></i>
                              </span>
                            </div>
                            <Input
                              type="tel"
                              className="form-control"
                              id="whatsapp"
                              name="whatsapp"
                              placeholder="Enter whatsapp number"
                              value={socialProfiles.whatsapp}
                              onChange={socialProfileChange}
                            />
                          </div>
                        </CardBody>
                      </Card>
                      <Col lg={12}>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-soft-success"
                            onClick={() => navigate(`/profile/${userId}`)}
                          >
                            Back to profile
                          </button>
                          <Button
                            color="primary"
                            className="btn-load"
                            disabled={loading}
                            onClick={() => updateUser("social")}
                          >
                            <span className="d-flex align-items-center">
                              {loading && (
                                <Spinner size="sm" className="flex-shrink-0">
                                  Updating...
                                </Spinner>
                              )}
                              <span className="flex-grow-1 ms-2">Update</span>
                            </span>
                          </Button>
                        </div>
                      </Col>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default memo(ProfileSetting);
