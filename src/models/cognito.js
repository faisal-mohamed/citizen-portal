import { CognitoUserPool } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import awsmobile from "../aws-exports";

const poolData = {
  UserPoolId: awsmobile.aws_user_pools_id, // Your user pool id here
  ClientId: awsmobile.aws_user_pools_web_client_id, // Your client id here
};

const userPool = new CognitoUserPool(poolData);

export const cognitosignup = (username, password, attributes) => {
  return new Promise((resolve, reject) => {
    userPool.signUp(
      username,
      password,
      attributes,
      null,
      // attributes,
      (err, user) => {
        if (user) {
          console.log("user", user);
          resolve(user);
        } else {
          console.log("signup error", err);
          if (err?.message) {
            reject(err?.message);
          } else {
            reject(err);
          }
        }
      }
    );
  });
};

export const signin = (username, password) => {
  return new Promise((resolve, reject) => {
    Auth.signIn(username, password)
      .then((user) => {
        console.log("user", user);
        resolve(user);
      })
      .catch((err) => {
        console.log("err", err);
        if (err.message) {
          reject(err.message);
        } else {
          reject(err);
        }
      });
  });
};

export const forgotPassword = async (email) => {
  return new Promise((resolve, reject) => {
    Auth.forgotPassword(email)
      .then((res) => {
        console.log("user", res);
        resolve(res);
      })
      .catch((err) => {
        console.log("err", err);
        if (err.message) {
          reject(err.message);
        } else {
          reject(err);
        }
      });
  });
};

export const forgotPasswordSubmit = async (email, code, newPassword) => {
  return new Promise((resolve, reject) => {
    Auth.forgotPasswordSubmit(email, code, newPassword)
      .then((res) => {
        console.log("user", res);
        resolve(res);
      })
      .catch((err) => {
        console.log("err", err);
        if (err.message) {
          reject(err.message);
        } else {
          reject(err);
        }
      });
  });
};

export const userChangePassword = async (oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        Auth.changePassword(user, oldPassword, newPassword)
          .then((res) => resolve(res))
          .catch((err) => {
            console.log("errqw", err);
            if (err.message) {
              reject(err.message);
            } else {
              reject(err);
            }
          });
      })
      .catch((err) => {
        console.log("err", err);
        if (err.message) {
          reject(err.message);
        } else {
          reject(err);
        }
      });
  });
};
