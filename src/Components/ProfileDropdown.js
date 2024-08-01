import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//import images
import { defaultUser } from "../assets/images";
import { Auth } from "aws-amplify";
import { setAuthData } from "../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const { loginUser } = useSelector((state) => state.auth);
  const { userName, id, profileImage } = loginUser;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logoutUsersession = () => {
    Auth.signOut();
    dispatch(setAuthData({}));
    navigate('/')
  };

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        id="profile"
      >
        <DropdownToggle tag="button" type="button" className="btn shadow-none">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={profileImage || defaultUser}
              alt="Header Avatar"
            />
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">
            Welcome ! <b>{userName}</b>{" "}
          </h6>
          <DropdownItem href={process.env.PUBLIC_URL + `/profile/${id}`}>
            <i className="ri-bar-chart-box-fill text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Dashboard</span>
          </DropdownItem>
          <div className="dropdown-divider"></div>
          <DropdownItem
            href={process.env.PUBLIC_URL + `/profile-settings/${id}`}
          >
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Edit Profile</span>
          </DropdownItem>
          {/* <DropdownItem>
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Edit Work Preferences</span>
          </DropdownItem>
          <div className="dropdown-divider"></div>
          <DropdownItem>
            <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">My Boosted Shots</span>
          </DropdownItem>
          <DropdownItem>
            <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">My Likes</span>
          </DropdownItem>
          <DropdownItem>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              My Collections
            </span>
          </DropdownItem> 
          <div className="dropdown-divider"></div>
          <DropdownItem href={process.env.PUBLIC_URL + "/logout"}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Account Settings
            </span>
          </DropdownItem>*/}
          <DropdownItem onClick={logoutUsersession}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle" data-key="t-logout">
              Sign Out
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
