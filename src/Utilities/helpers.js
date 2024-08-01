import { Auth } from "aws-amplify";
import moment from "moment";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const toastSuccessOptions = {
  className: "toast_success",
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  // progressStyle: {
  //   backgroundColor: '#ffff',
  // },
};

const toastErrorOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const toastWarningOption = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const toastInfoOption = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const Success = (message) => {
  toast.success(message, toastSuccessOptions);
};

const Failure = (message) => {
  toast.error(message, toastErrorOptions);
};

const Info = (message) => {
  toast.info(message, toastInfoOption);
};

const Warning = (message) => {
  toast.warn(message, toastWarningOption);
};
export { Success, Failure, Info, Warning };

export const successModal = (messsage) => {
  Swal.fire("Success", messsage, "success");
};

export const extractKey = (url) => {
  const regex = /public\/(.*)/;
  const match = regex.exec(url);

  if (match && match.length > 1) {
    const extractedString = match[1];
    console.log(extractedString);
    return extractedString;
  } else {
    console.log("No match found.");
  }
};

export const createFileUrl = (files) => {
  console.log("files", files);
  const urlArr = files.map((file) =>
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    })
  );

  return urlArr;
};

export const checkUrlChange = (s3Urls) => {
  const isS3UrlChanged = s3Urls.some((img) => typeof img === "object");

  return isS3UrlChanged;
};

export function logGroup(type, data) {
  console.groupCollapsed(type);
  console.log(data);
  console.groupEnd();
}

export function dateProvider(noOfWeek) {
  const lastWeek = moment().subtract(noOfWeek, "week");
  return lastWeek.toISOString();
}
