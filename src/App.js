import React, { Suspense, useEffect, useState } from "react";
import { Amplify, Auth, Hub } from "aws-amplify";
import awsConfig from "./amplifyconfiguration.json";
import Route from "./Routes/index";
import "./assets/scss/themes.scss";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAuthData } from "./store/reducers/authSlice";
import User from "./models/UserModel";
import ReactGA from "react-ga";
import { isEmpty } from "lodash";
import reportWebVitals from "./reportWebVitals";
import UserTour from "./Components/UserTour";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Components/loader";

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === "[::1]" ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
// const [localRedirectSignIn, productionRedirectSignIn] =
//   awsConfig.oauth.redirectSignIn.split(",");

// const [localRedirectSignOut, productionRedirectSignOut] =
//   awsConfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: "https://kannan-dev.dqw0ncfsshc.amplifyapp.com/",
    redirectSignOut: "https://kannan-dev.dqw0ncfsshc.amplifyapp.com/",
  },
};

Amplify.configure(updatedAwsConfig);

//Google Analystics
ReactGA.initialize("UA-267736174-1");

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { userFirstLogin, loginUser } = useSelector((state) => state.auth);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          createUserProfile();
          break;
        case "cognitoHostedUI":
          break;
        case "signOut":
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
        default:
          console.log("user logout");
      }
    });

    getUser().then((user) => {
      dispatch(setAuthData(loginUser, user));
      setLoading(false);
    });
  }, []);

  async function getUser() {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();

      const userDetails = await User.checkUserExist(attributes.sub);
      const { id, firstName, image, followingCount, followersCount, role } =
        userDetails.listUsers.items[0];
      return {
        id,
        userName: firstName,
        profileImage: image,
        followingCount,
        followersCount,
        role,
        signInMethod: attributes.identities ? "external provider" : "cognito",
      };
    } catch {
      console.log("Not signed in");
    }
  }

  const createUserProfile = async () => {
    try {
      const {
        attributes: { sub, name, email },
      } = await Auth.currentAuthenticatedUser();

      console.log("sub====>", sub, name, email)
      const isUserExist = await User.checkUserExist(sub);
      // if (isEmpty(isUserExist.listUsers.items) ) {
      if (isUserExist === undefined || isEmpty(isUserExist.listUsers.items)) {
        const splitName = name.split(" ");
        navigate("/signup", {
          state: {
            firstName: splitName[0],
            lastName: splitName.length > 1 ? splitName[1] : "",
            email,
            cognitoId: sub,
          },
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <React.Fragment>
      <ToastContainer />
      {pathname === "/" && !isEmpty(loginUser) && userFirstLogin && (
        <UserTour />
      )}
      <Suspense fallback={<Loader />}>
        {!loading ? <Route /> : <Loader />}
      </Suspense>
    </React.Fragment>
  );
}

const SendAnalytics = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
};
reportWebVitals(SendAnalytics);

export default App;
