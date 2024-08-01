import React, {
  createContext,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import {
  Col,
  Container,
  Nav,
  Button,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import User from "../../models/UserModel";
import { defaultUser } from "../../assets/images";
import ReactGA from "react-ga";
import UserPost from "./UserPost";
import UserInfoTab from "./UserInfoTab";
import { useSelector } from "react-redux";
import {
  designerTabs,
  nonOwnerTabs,
  userTabs,
} from "../../Utilities/constants";
import  tail from "lodash/tail";
import CommonModal from "../../Components/CommonModal";
import ConnectionModal from "./ConnectionModal";

export const ProfileContext = createContext();

const Profile = () => {

  const [activeTab, setActiveTab] = useState(0);
  const [userinfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    website: "",
    profileImage: "",
    jobTitle: "",
    socialMediaProfiles: {},
    bio: "",
    followingCount: "",
    followersCount: "",
    phone: "",
    company: "",
  });

  const [isLoggeduser, setLoggedUser] = useState({
    tabs: designerTabs,
    owner: true,
  });

  const [Connections, setConnections] = useState({
    userModal: false,
    selectedConnection: "",
  });

  const { userId } = useParams();
  console.log("userId",userId)

  const { loginUser } = useSelector((state) => state.auth);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    renderTabs();
    getUserInfo();
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [userId, loginUser]);

  // Dynamic Render Tabs
  const renderTabs = () => {
    if (userId === loginUser.id && loginUser.role === "user") {
      setLoggedUser((state) => ({
        ...state,
        tabs: userTabs,
      }));
    } else if (userId !== loginUser.id) {
      setLoggedUser((state) => ({
        ...state,
        owner: false,
        tabs: nonOwnerTabs,
      }));
    }
    else{
      setLoggedUser((state) => ({
        ...state,
        owner: true,
        tabs: designerTabs,
      }));
    }
  };

  const getUserInfo = useCallback(async () => {
    try {
      const userInfo = await User.getUserDetails(userId);
      const {
        firstName,
        lastName,
        city,
        country,
        image,
        website,
        jobTitle,
        socialMediaProfiles,
        bio,
        followingCount,
        followersCount,
        email,
        phone,
        company,
      } = userInfo.getUser;
      setUserInfo((state) => ({
        ...state,
        firstName,
        lastName,
        city,
        country,
        website,
        jobTitle,
        profileImage: image,
        socialMediaProfiles: JSON.parse(socialMediaProfiles),
        bio,
        followingCount,
        followersCount,
        email,
        phone,
        company,
      }));
      setActiveTab(0)
    } catch (error) {
      console.error("error", error);
    }
  }, [userId]);

  const showConnections = (selectedOption) =>
    setConnections((state) => ({
      ...state,
      userModal: true,
      selectedConnection: selectedOption,
    }));

  return (
    <React.Fragment>
      <div className="page-content">
        <CommonModal
          size="sm"
          show={Connections.userModal}
          modalBody={() => (
            <ProfileContext.Provider value={{ Connections, setConnections }}>
              <ConnectionModal
                selectedOption={Connections.selectedConnection}
                isOwner={isLoggeduser.owner}
              />
            </ProfileContext.Provider>
          )}
          className="connection-modal"
        />

        <Container fluid>
          <div className="profile-foreground position-relative mx-n4">
            <div className="profile-wid-bg">
              <img src={undefined} alt="" className="profile-wid-img" />
            </div>
          </div>
          <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
            <Row className="g-4">
              <div className="col-auto">
                <div className="profile-user">
                  <img
                    src={userinfo.profileImage || defaultUser}
                    alt="user-img"
                    className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                  />
                </div>
              </div>

              <Col>
                <div className="p-2">
                  <h3 className="text-white mb-1">{userinfo.firstName}</h3>
                  <p className="text-white-75">{userinfo?.jobTitle}</p>
                  <div className="hstack text-white-50 gap-1">
                    <div className="me-2">
                      <i className="ri-map-pin-user-line me-1 text-white-75 fs-16 align-middle"></i>
                      {userinfo.city} / {userinfo.country}
                    </div>
                    <div>
                      <i class="ri-building-line me-1 text-white-75 fs-16 align-middle"></i>
                      {userinfo?.company}
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={12} className="col-lg-auto order-last order-lg-0">
                <Row className="text text-white-50 text-center">
                  <Col lg={6} xs={4}>
                    <div
                      className="p-2 cursor-pointer"
                      onClick={() => showConnections("followers")}
                    >
                      <h4 className="text-white mb-1">
                        {userinfo.followersCount
                          ? userinfo.followersCount
                          : "0"}
                      </h4>
                      <p className="fs-14 mb-0">Followers</p>
                    </div>
                  </Col>
                  <Col lg={6} xs={4}>
                    <div
                      className="p-2  cursor-pointer"
                      onClick={() => showConnections("following")}
                    >
                      <h4 className="text-white mb-1">
                        {userinfo.followingCount
                          ? userinfo.followingCount
                          : "0"}
                      </h4>
                      <p className="fs-14 mb-0">Following</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <Row>
            <Col lg={12}>
              <div>
                <div className="d-flex">
                  <Nav
                    pills
                    className="animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                    role="tablist"
                  >
                    {isLoggeduser.tabs.map((navItem, idx) => (
                      <NavItem>
                        <NavLink
                        href="#"
                          className={classnames(
                            { active: activeTab === idx },
                            "fs-14"
                          )}
                          onClick={() => toggleTab(idx)}
                        >
                          <i className="ri-airplay-fill d-inline-block d-md-none"></i>
                          <span className="d-none d-md-inline-block">
                            {navItem}
                          </span>
                        </NavLink>
                      </NavItem>
                    ))}
                  </Nav>
                  {isLoggeduser.owner ? (
                    <div className="flex-shrink-0">
                      <Link
                        to={`/profile-settings/${userId}`}
                        className="btn btn-success"
                      >
                        <i className="ri-edit-box-line align-bottom"></i> Edit
                        Profile
                      </Link>
                    </div>
                  ) : (
                    <div className="d-flex flex-row  gap-2 justify-content-end">
                      {/* <Button
                        color="secondary"
                        className="custom-toggle"
                        onClick={() => {
                          // if (auth.loginUser === undefined) {
                          //   navigate("/login");
                          // } else {
                          //   postInfo.followed ? deleteFollow() : postFollow();
                          // }
                        }}
                      >
                        <span className="icon-on d-flex gap-1 align-bottom me-1">
                          <i
                            className={
                              // postInfo.followed
                              // ? "ri-user-unfollow-line "
                              "ri-add-line "
                            }
                          ></i>
                          Follow
                          {postInfo.followed ? "Following" : "Follow"}
                        </span>
                      </Button> */}
                    </div>
                  )}
                </div>

                <TabContent activeTab={activeTab} className="pt-4">
                  <TabPane tabId={0}>
                    {activeTab === 0 && <UserInfoTab userinfo={userinfo} />}
                  </TabPane>
                  {tail(isLoggeduser.tabs).map((tab, idx) => (
                    <TabPane tabId={idx + 1} key={idx}>
                      {activeTab === idx + 1 && (
                        <UserPost
                          currentTab={tab}
                          isOwner={isLoggeduser.owner}
                        />
                      )}
                    </TabPane>
                  ))}
                </TabContent>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default memo(Profile);
