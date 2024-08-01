import * as Yup from "yup";

export const navBarHidePages = ["/upload/new"];

export const navigationItems = [{ label: "Trending" }];

export const timeFrameArray = [
  {
    label: "Last 24 hours",
    value: "last 24",
  },
  {
    label: "This week",
    value: "last 7",
  },
  {
    label: "This month",
    value: "last 30",
  },
];

export const uploadRestrictedPages = [
  "/post/draft/:draftId/edit",
  "/post/edit/:id",
  "/upload/new/post",
];

export const footerHidePages = [
  "/post/draft/:draftId/edit",
  "/post/:id",
  "/post/edit/:id",
  "/upload/new/post",
  "/upload/new",
];

export const designerTabs = [
  "Overview",
  "My Designs",
  "Collections",
  "Liked Post",
  "My Drafts",
];
export const userTabs = ["Overview", "Collections", "Liked Post"];
export const nonOwnerTabs = ["Overview", "Works"];

export const signUpValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invaild Email Id")
    .required("Email shouldn't be empty"),
  firstName: Yup.string().required("First name shouldn't be empty"),
  lastName: Yup.string().required("Last name shouldn't be empty"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(RegExp("(.*[a-z].*)"), "Atleast one lowercase letter")
    .matches(RegExp("(.*[A-Z].*)"), "Atleast one uppercase letter")
    .matches(RegExp("(.*[0-9].*)"), "Atleast one number")
    .required("This field is required"),
});

export const googleSignUpValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invaild Email Id")
    .required("Email shouldn't be empty"),
  firstName: Yup.string().required("First name shouldn't be empty"),
  lastName: Yup.string().required("Last name shouldn't be empty"),
});

export const designerUserTourSteps = [
  {
    title: "Get started to build your online presence!",
    content: (
      <p>
        Welcome to Designars! Our platform will allow you to showcase your
        portfolio designs online and help to generate leads for your interior
        design business!
      </p>
    ),
    locale: { skip: <strong aria-label="skip">Skip</strong> },
    styles: {
      options: {
        width: 500,
      },
    },
    placement: "center",
    target: "body",
  },
  {
    title: " Upload Your Design",
    content:
      "Are you an aspiring or experienced interior designer? Showcase your creative prowess by uploading your own design projects. Click on the upload button to share your work with the Designars community. Let your designs inspire others and catch the attention of potential clients",
    styles: {
      options: {
        width: 600,
      },
    },
    placement: "bottom",
    target: "#uploadBtn",
  },
  {
    title: "Your Profile: Reflect and Connect",
    content:
      "Your profile is a reflection of your unique style and expertise. Take a moment to view or edit your profile, ensuring it accurately represents your professional journey. Showcase your portfolio, highlight your skills, and provide a brief introduction. This is your opportunity to make a lasting impression on potential clients and collaborators",
    placement: "left",
    target: "#profile",
  },

  {
    content: (
      <p>
        {" "}
        Now take action and upload your first post! Best of luck on your
        interior designing journey! &#127881;
      </p>
    ),
    placement: "center",
    target: "body",
    hideCloseButton: true,
    hideBackButton: true,
    styles: {
      options: {
        width: 600,
      },
    },
  },
];

export const normalUserTourSteps = [
  {
    title: "A Tour of Your Interior Design Journey",
    content: (
      <p>
        Welcome to Designars! Our platform offers a convenient way to explore
        interior design projects
      </p>
    ),
    locale: { skip: <strong aria-label="skip">Skip</strong> },
    styles: {
      options: {
        width: 500,
      },
    },
    placement: "center",
    target: "body",
  },
  {
    title: "Filter and Discover: Find Your Perfect Design Match",
    content:
      "Use our search filters to discover the newest or most popular interior designs to find something that resonate with the vision of your perfect home!",
    target: "#filterBtn",
    styles: {
      options: {
        width: 500,
      },
    },
    locale: { skip: <strong aria-label="skip">Skip</strong> },
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 10,
    placementBeacon: "left",
  },
  {
    title: "Pick the design category that you desire!",
    content:
      " Searching for a specific type of design? Our Sort By Filter feature allows you to refine your search results by category. Whether you're interested in residential, commercial, minimalist, or eclectic designs, this filter will help you find precisely what you're looking forWe have categorise the most popular designs in our menu bar to make your search much easier. Click on them to see more designs!",
    placement: "bottom",
    styles: {
      options: {
        width: 600,
      },
    },
    target: "#sortByFilter",
  },

  {
    content: (
      <p>
        {" "}
        Let’s get started! Browse our categories to find the best design for
        you! &#127881;
      </p>
    ),
    placement: "center",
    target: "body",
    hideCloseButton: true,
    hideBackButton: true,
    styles: {
      options: {
        width: 600,
      },
    },
  },
];
