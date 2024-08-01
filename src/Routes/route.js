import React from "react";

//Auth routes
const SignUp = React.lazy(() => import("../auth/SignUp"));
const Signin = React.lazy(() => import("../auth/Sigin"));
const ForgotPassword = React.lazy(() => import("../auth/ForgotPassword"));
const TwoStepVerification = React.lazy(() => import("../auth/TwoStepVerify"));

//public routes
const HomePage = React.lazy(() => import("../Pages/Home/index"));
const ProfileScreen = React.lazy(() => import("../Pages/Profile"));
const PostViewScreen = React.lazy(() => import("../Pages/PostView"));
const TermsOfUse = React.lazy(() => import("../Pages/Legal-docs/TermsOfUse"));
const PrivacyPolicy =  React.lazy(() => import("../Pages/Legal-docs/PrivacyPolicy"));

// auth protected routes
const UploadScreen = React.lazy(() => import("../Pages/UploadScreen/Index"));
const ProfileSetting = React.lazy(() =>
  import("../Pages/Profile/ProfileSetting")
);
const CreatePost = React.lazy(() => import("../Pages/UploadScreen/PostPage"));

const authProtectedRoutes = [
  {
    path: "/upload/new",
    component: <UploadScreen />,
    role: ["admin", "designer"],
  },
  {
    path: "/post/:postId",
    component: <PostViewScreen />,
  },
  {
    path: "/profile/:userId",
    component: <ProfileScreen />,
  },
  {
    path: "/profile-settings/:userId",
    component: <ProfileSetting />,
  },
  {
    path: "/upload/new/post",
    role: ["admin", "designer"],
    component: <CreatePost />,
  },
  {
    path: "/post/draft/:draftId/edit",
    role: ["admin", "designer"],
    component: <CreatePost view="draftEdit" />,
  },
  {
    path: "/post/edit/:postId",
    role: ["admin", "designer"],
    component: <CreatePost view="postEdit" />,
  },
];

const publicRoutes = [
  {
    path: "/",
    component: <HomePage />,
  },
  {
    path: "/profile/:userId",
    component: <ProfileScreen />,
  },
  {
    path: "/post/:postId",
    component: <PostViewScreen />,
  },
  {
    path: "/terms-of-service",
    component: <TermsOfUse />,
  },
  {
    path: "/privacy-policy",
    component: <PrivacyPolicy />,
  },
];

const authRoutes = [
  {
    path: "/signup",
    component: <SignUp />,
  },
  {
    path: "/login",
    component: <Signin />,
  },
  {
    path: "/forgot-password",
    component: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    component: <TwoStepVerification />,
  },
];

export { authProtectedRoutes, publicRoutes, authRoutes };
