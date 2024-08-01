import React from "react";
import { Route, Routes } from "react-router-dom";
import { authProtectedRoutes, authRoutes, publicRoutes } from "./route";
import PrivateRoute from "./PrivateRoute";
import Layout from "../Components/Layout";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
      {authRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={route.component}
              key={idx}
              exact={true}
            />
          ))}
        <Route path="/"  element={<Layout/>}>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
              exact={true}
            />
          ))}
          {authProtectedRoutes.map((route) => (
            <Route
              path={route.path}
              element={<PrivateRoute role={route?.role}>{route.component}</PrivateRoute>}
              key={route.path}
              exact={true}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default Index;
