import { API, graphqlOperation } from "aws-amplify";
import {
  createMovedDraftPosts,
  createPostDrafts,
  deleteMovedDraftPosts,
  deletePostDrafts,
  updateMovedDraftPosts,
  updatePostDrafts,
} from "../graphql/mutations";
import {
  getMovedDraftPosts,
  getPostDrafts,
  listMovedDraftPosts,
  listPostDrafts,
} from "../graphql/queries";

export const Draft = {
  get: async (id) => {
    try {
      const result = await API.graphql(graphqlOperation(getPostDrafts, { id }));
      return result.data;
    } catch (error) {
      console.error(error);
    }
  },

  create: async (payload) => {
    const data = {
      sortByDate: "sortByDate",
      ...payload,
    };
    try {
      const result = await API.graphql(
        graphqlOperation(createPostDrafts, { input: data })
      );
      return result.data;
    } catch (error) {
      console.error(error);
    }
  },
  list: async (filter) => {
    try {
      const result = await API.graphql(
        graphqlOperation(listPostDrafts, { filter })
      );
      return result.data;
    } catch (error) {
      console.error(error);
      return error.data;
    }
  },
  update: async (data) => {
    try {
      const post = await API.graphql(
        graphqlOperation(updatePostDrafts, { input: data })
      );
      return post.data;
    } catch (error) {
      return error.data;
    }
  },
  delete: async (id) => {
    try {
      const result = await API.graphql(
        graphqlOperation(deletePostDrafts, { input: { id } })
      );
      return result.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export const moveDrafts = {
  create: async (data) => {
    try {
      const draftResposne = API.graphql(
        graphqlOperation(createMovedDraftPosts, { input: data })
      );
      return draftResposne.data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  },
  get: async (id) => {
    try {
      const draftResposne = await API.graphql(
        graphqlOperation(getMovedDraftPosts, { id })
      );
      return draftResposne.data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  },
  list: async (filter) => {
    try {
      const result = await API.graphql(
        graphqlOperation(listMovedDraftPosts, { filter })
      );
      return result.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  update: async (data) => {
    try {
      const post = await API.graphql(
        graphqlOperation(updateMovedDraftPosts, { input: data })
      );
      return post.data;
    } catch (error) {
      return error;
    }
  },
  delete: async (id) => {
    try {
      const result = await API.graphql(
        graphqlOperation(deleteMovedDraftPosts, { input: { id } })
      );
      return result.data;
    } catch (error) {
      console.error(error);
    }
  },
};
