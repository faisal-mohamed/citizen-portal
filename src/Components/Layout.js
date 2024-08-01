import React from "react";
import Navbar from "./navbar";
import { Outlet, matchPath, useLocation } from "react-router-dom";
import { footerHidePages, navBarHidePages } from "../Utilities/constants";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  const isHideNav = navBarHidePages.includes(pathname);
  const isFooterHide = footerHidePages.some((path) =>
  matchPath({ path: path, exact: true }, pathname)
);
  return (
    <>
      <div className="layout-wrapper landing">
        {!isHideNav && <Navbar/>}
        <div className={!isHideNav ? "mt-4" : ""}>
          <Outlet />
        </div>
       
      </div>
      {!isFooterHide && <Footer />}
    </>
  );
};

export default Layout;
