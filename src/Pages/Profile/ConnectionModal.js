import React, { useContext, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import {
  Container,
  NavItem,
  Nav,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import User from "../../models/UserModel";
import SimpleBar from "simplebar-react";
import { defaultUser } from "../../assets/images";
import Button from "../../Components/button_ui";
import classnames from "classnames";
import "../../css/profile_screen.scss";
import  isEmpty  from "lodash/isEmpty";
import { ProfileContext } from ".";
import { useSelector } from "react-redux";
import { deleteFollwer } from "../../Utilities/apihelper";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../store/reducers/authSlice";

const ConnectionModal = ({isOwner}) => {
  const { userId } = useParams();

  const { Connections, setConnections } = useContext(ProfileContext);

  const {
    auth: { loginUser },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [activeTab, setactiveTab] = useState(
    Connections.selectedConnection === "followers" ? 0 : 1
  );
  const [connectionList, setConnectionList] = useState([]);

  const [loadList, setLoadList] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    getConnectionsList(activeTab);
  }, [activeTab, loadList]);

  const getConnectionsList = async () => {
    try {
      let connectionList = [];
      if (activeTab === 0) {
        const {
          listFollows: { items },
        } = await User.getFollowersList({
          followFollowingId: { eq: userId },
        });

        connectionList = !isEmpty(items)
          ? items.map((user) => ({
              ...user,
              userInfo: user.followedBy,
            }))
          : [];
        setConnectionList(connectionList);
      } else {
        const {
          listFollows: { items },
        } = await User.getFollowingList({
          followFollowedById: { eq: userId },
        });
        connectionList = !isEmpty(items)
          ? items.map((user) => ({
              ...user,
              userInfo: user.following,
            }))
          : [];
      }
      setConnectionList(connectionList);
    } catch (error) {
      console.log("error", error);
    }
  };

  const navigateToProfile = (id) => {
    closeModal();
    navigate(`/profile/${id}`);
  };

  const toggleTab = (id) => setactiveTab(id);

  const closeModal = () =>
    setConnections({
      userModal: false,
      selectedConnection: "",
    });

  const removeConnection = async (
    tableId,
    followingUserId,
    removingUserId,
    followersCount,
    followingCount
  ) => {
    const follwingUserPayload = {
      id: followingUserId,
      followersCount: followersCount - 1,
    };

    const followerPayload = {
      id: removingUserId,
      followingCount: followingCount - 1,
    };

    await deleteFollwer(follwingUserPayload, followerPayload, tableId);
    setLoadList(!loadList);
    dispatch(
      setAuthData(loginUser, {
        followersCount:
          activeTab === 0
            ? loginUser.followersCount - 1
            : loginUser.followersCount,
        followingCount:
          activeTab === 1
            ? loginUser.followingCount - 1
            : loginUser.followingCount,
      })
    );
  };
  return (
    <Container>
      <div className="d-block float-end" onClick={closeModal}>
        <i className="ri-close-circle-line fs-24 cursor-pointer" />
      </div>
      <Nav
        className="nav-tabs-custom rounded card-header-tabs cursor-pointer"
        role="tablist"
      >
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 0 })}
            onClick={() => toggleTab(0)}
          >
            Followers
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 1 })}
            onClick={() => toggleTab(1)}
          >
            Following
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent>
        <TabPane id="home">
          <SimpleBar style={{ maxHeight: "215px" }}>
            {!isEmpty(connectionList) &&
              connectionList.map((user) => (
                <div className="d-flex align-items-center py-2">
                  <div
                    className="flex-grow-1 cursor-pointer"
                    onClick={() => navigateToProfile(user.userInfo?.id)}
                  >
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <img
                          src={user.userInfo?.image || defaultUser}
                          alt=""
                          className="avatar-sm border border-1"
                          style={{ borderRadius: "50%" }}
                        />
                      </div>
                      <div className="d-flex  flex-column flex-shrink-0 ms-2">
                        <h5 className="fs-14 mb-0 fw-bold">
                          {user.userInfo?.firstName}
                        </h5>
                        <small className="text-muted">
                          {user.userInfo?.city}
                        </small>
                        <p className="text">{user.userInfo?.jobTitle}</p>
                      </div>
                    </div>
                  </div>
                  {isOwner && (
                    <div className="flex-shrink-0">
                      {activeTab === 0 ? (
                        <Button
                          text="Remove"
                          onClick={() =>
                            removeConnection(
                              user.id,
                              user.followFollowingId,
                              user.followFollowedById,
                              user.followedBy.followingCount,
                              user.following.followersCount
                            )
                          }
                        />
                      ) : (
                        <Button
                          text="following"
                          className="primary"
                          onClick={() =>
                            removeConnection(
                              user.id,
                              user.followFollowingId,
                              user.followFollowedById,
                              user.followedBy.followingCount,
                              user.following.followersCount
                            )
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
          </SimpleBar>
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default ConnectionModal;
