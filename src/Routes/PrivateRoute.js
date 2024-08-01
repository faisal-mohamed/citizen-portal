import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

const PrivateRoute = (props) => {
  const [loading, setLoading] = useState(true);
  const { role, children } = props;
  const { loginUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (role && !role.includes(loginUser.role)) {
      navigate("/");
    }
    setLoading(false);
  }, [loginUser]);

  return (
    <React.Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : isEmpty(loginUser) ? (
        <Navigate to={"/login"} />
      ) : (
        children
      )}
    </React.Fragment>
  );
};

export default PrivateRoute;
