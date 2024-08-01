import React, {  useState } from "react";
import ReactJoyride, { STATUS } from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import { setUserFirstLogin } from "../store/reducers/authSlice";
import {
  designerUserTourSteps,
  normalUserTourSteps,
} from "../Utilities/constants";

const UserTour = () => {
  const { role } = useSelector((state) => state.auth.loginUser);
  const [{ run, steps }, setState] = useState({
    run: true,
    steps: role === "user" ? normalUserTourSteps : designerUserTourSteps,
  });

  const dispatch = useDispatch();

  const locale = {
    next: "Continue",
    back: "Back",
    close: "Close",
    skip: "Skip",
    last: "Explore",
  };

  // useEffect(() => {
  //   setState((state) => ({
  //     ...state,
  //     steps: role === "user" ? normalUserTourSteps : designerUserTourSteps,
  //   }));
  // }, [role]);

  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      dispatch(setUserFirstLogin(false));
      setState({ run: false });
    }

    // logGroup(type, data);
  };
  return (
    <ReactJoyride
      callback={handleJoyrideCallback}
      continuous
      disableScrolling
      hideCloseButton
      locale={locale}
      run={run}
      scrollToFirstStep
      showSkipButton
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  );
};

export default UserTour;
