import { API, graphqlOperation } from "aws-amplify";
import { createUser, updateUser } from "../graphql/mutations";
import { getUser, listFollows, listUsers } from "../graphql/queries";
import { customListFollows } from "../graphql/customQueries";

const User = {
  Create: async (user) => {
    try {
      const userPromise = await API.graphql(
        graphqlOperation(createUser, { input: user })
      );
      return userPromise.data;
    } catch (error) {
      console.error(error);
    }
  },
  checkUserExist: async (cognitoId) => {
    try {
      const userResult = await API.graphql(
        graphqlOperation(listUsers, {
          filter: { cognitoId: { eq: cognitoId } },
        })
      );
      // console.log()
      return userResult.data;
    } catch (error) {
      console.error("err", error);
    }
  },
  getUserDetails: async (userId) => {
    try {
      const userInfo = await API.graphql(
        graphqlOperation(getUser, { id: userId })
      );
      return userInfo.data;
    } catch (error) {
      console.error("error", error);
    }
  },
  update: async (data) => {
    try {
      const userInfo = await API.graphql(
        graphqlOperation(updateUser, { input: data })
      );
      return userInfo.data;
    } catch (error) {
      console.error("error", error);
    }
  },
  getFollowersList: async (filter) => {
    try {
      const response = await API.graphql(
        graphqlOperation(customListFollows, { filter })
      );
      return response.data;
    } catch (error) { console.log("error",error)}
  },
  getFollowingList: async (filter) => {
    try {
      const response = await API.graphql(
        graphqlOperation(customListFollows, { filter })
      );
      return response.data;
    } catch (error) { console.log("error",error)}
  },
};

export default User;
