import { API, graphqlOperation } from "aws-amplify";
import {
  createComment,
  createEnquiry,
  createFollow,
  createLikes,
  createPost,
  createSavedPost,
  deleteFollow,
  deleteLikes,
  deletePost,
  deleteSavedPost,
  updatePost,
} from "../graphql/mutations";
import {
  checkUserLikedSavedPosts,
  getLikes,
  getPost,
  listEnquiries,
  listFollows,
} from "../graphql/queries";
import {
  customCommentsByPostIDAndCreatedAt,
  customListComments,
  customListLikes,
  customListSavedPosts,
  customListTrendingPosts,
  customPostsByDate,
  customPostsByLikes,
} from "../graphql/customQueries";
import { dateProvider } from "../Utilities/helpers";
import { checkUserLikedSaved } from "../Utilities/apihelper";
import { isEmpty } from "lodash";

// Likes api

const LikesAPI = {
  get: async (likedById) => {
    try {
      const getLikedResult = await API.graphql(
        graphqlOperation(getLikes, { likesLikedById: likedById })
      );
      return getLikedResult.data;
    } catch (error) {
      return error.data;
    }
  },
  create: async (data) => {
    try {
      data.sortByDate = "sortByDate";
      const resposne = await API.graphql(
        graphqlOperation(createLikes, { input: data })
      );
      return resposne.data;
    } catch (error) {
      console.error(error);
      return error.data;
    }
  },
  delete: async (id) => {
    try {
      const resposne = await API.graphql(
        graphqlOperation(deleteLikes, { input: { id } })
      );
      return resposne.data;
    } catch (error) {
      console.error(error);
      return error.data;
    }
  },
  list: async (filter, userId) => {
    try {
      const resposne = await API.graphql(
        graphqlOperation(customListLikes, { filter })
      );
      let postItems = resposne.data.listLikes;
      if (!isEmpty(postItems.items) && userId) {
        postItems.items = postItems.items.map((post) => ({
          ...post.post,
          ...post,
          id: post.postLikesId,
          userLikeId: post.id,
        }));
        postItems = await checkUserLikedSaved(postItems, userId, "save");
      }
      return postItems;
    } catch (error) {
      console.error(error);
      return error.data;
    }
  },
};

//comments api

const commentsAPI = {
  create: async (data) => {
    try {
      // const payload = {
      //   ...data,
      //   type: "Comment",
      // };
      const comments = await API.graphql(
        graphqlOperation(createComment, { input: data })
      );
      console.log("comments", comments);
      return comments;
    } catch (err) {
      console.log(err);
    }
  },
  ListSorted: async (postID) => {
    try {
      // const payload = {
      //   ...filter,
      //   type: "Comment",
      //   sortDirection: "ASC",
      // };
      const List = await API.graphql(
        graphqlOperation(customCommentsByPostIDAndCreatedAt, {
          postID,
          sortDirection: "DESC",
        })
      );
      return List.data;
    } catch (error) {
      console.error(error);
      return error.data;
    }
  },
  List: async (filter) => {
    try {
      const List = await API.graphql(
        graphqlOperation(customListComments, { filter })
      );
      return List.data;
    } catch (error) {
      console.error(error);
      return error.data;
    }
  },
};

// saved post api

const savedPostAPI = {
  create: async (data) => {
    try {
      const saved = await API.graphql(
        graphqlOperation(createSavedPost, { input: data })
      );
      return saved.data;
    } catch (err) {
      console.log(err);
    }
  },
  List: async (filter, userId) => {
    try {
      const resposne = await API.graphql(
        graphqlOperation(customListSavedPosts, { filter })
      );
      let postItems = resposne.data.listSavedPosts;
      if (!isEmpty(postItems.items) && userId) {
        postItems.items = postItems.items.map((data) => ({
          userSaveId: data.id,
          ...data.post,
        }));
        console.log("post", postItems);
        postItems = await checkUserLikedSaved(postItems, userId, "like");
      }
      return postItems;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const resposne = await API.graphql(
        graphqlOperation(deleteSavedPost, { input: { id } })
      );
      return resposne.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

// Follow api

const followAPI = {
  create: async (data) => {
    try {
      const follow = await API.graphql(
        graphqlOperation(createFollow, { input: data })
      );
      console.log("follow", follow);
      return follow.data;
    } catch (err) {
      console.log(err);
    }
  },
  List: async (filter) => {
    try {
      const List = await API.graphql(graphqlOperation(listFollows, { filter }));
      return List.data;
    } catch (error) {
      console.error(error);
      return error.data;
    }
  },
  delete: async (id) => {
    try {
      const resposne = await API.graphql(
        graphqlOperation(deleteFollow, { input: { id } })
      );
      return resposne.data;
    } catch (error) {
      console.error(error);
      return error.data;
    }
  },
};

const enquiryAPI = {
  create: async (data) => {
    try {
      const enquiryResponse = await API.graphql(
        graphqlOperation(createEnquiry, { input: data })
      );
      return enquiryResponse.data;
    } catch (error) {
      throw error;
    }
  },
  list: async (filter) => {
    try {
      // console.log("data", data)
      const enquiryResponse = await API.graphql(
        graphqlOperation(listEnquiries, { filter })
      );
      return enquiryResponse.data;
    } catch (error) {
      throw error;
    }
  },
};

const Post = {
  create: async (payload) => {
    const data = {
      sortByDate: "sortByDate",
      trending: "sortByLikes",
      ...payload,
    };
    try {
      const response = await API.graphql(
        graphqlOperation(createPost, { input: data })
      );
      // console.log("model", getPostresult);
      return response;
    } catch (error) {
      return error.data;
    }
  },
  get: async (postId) => {
    try {
      const getPostresult = await API.graphql(
        graphqlOperation(getPost, { id: postId })
      );
      // console.log("model", getPostresult);
      return getPostresult.data;
    } catch (error) {
      return error.data;
    }
  },
  delete: async (id) => {
    try {
      const postDelete = await API.graphql(
        graphqlOperation(deletePost, { input: { id } })
      );
      // console.log("model", getPostresult);
      return postDelete.data;
    } catch (error) {
      return error.data;
    }
  },
  list: async (filter, userId) => {
    try {
      const postResponse = await API.graphql(
        graphqlOperation(customPostsByDate, {
          sortByDate: "sortByDate",
          sortDirection: "DESC",
          filter,
        })
      );
      let result = postResponse.data.postsByDate;
      if (userId) result = await checkUserLikedSaved(result, userId, "both");
      return result;
    } catch (error) {
      throw error;
    }
  },
  update: async (data) => {
    try {
      const post = await API.graphql(
        graphqlOperation(updatePost, { input: data })
      );
      return post.data;
    } catch (error) {
      throw error;
    }
  },
  listByLikes: async (filter = {}, userId) => {
    try {
      const postResponse = await API.graphql(
        graphqlOperation(customPostsByLikes, {
          // limit: 20,
          trending: "sortByLikes",
          sortDirection: "DESC",
          filter,
        })
      );
      let result = postResponse.data.postsByLikes;
      if (userId) result = await checkUserLikedSaved(result, userId, "both");
      return result;
    } catch (error) {
      throw error;
    }
  },
  listTrendingPost: async (nextToken = "", userId) => {
    let result = {};
    let limit = 10;
    const filter = { updatedAt: { le: dateProvider(1) } };

    if (isNaN(Number(nextToken))) {
      result = await getPostByLikesAPI(filter);
      if (result.items.length < limit && result.nextToken)
        result = await getAddtionalPosts(filter);
      return result;
    } else if (Number(nextToken) || nextToken === "") {
      result = await API.graphql(
        graphqlOperation(customListTrendingPosts, { limit, nextToken })
      );

      result.items = result.data.listTrendingPosts.items.map((post) => ({
        ...post.post,
        ...post,
      }));
      result.nextToken = result.data.listTrendingPosts.nextToken;
      delete result.data;

      // if (result.nextToken === "trendComplete") {
      const additionalPosts = await getPostByLikesAPI(filter);
      result.items.push(...additionalPosts.items);
      result = await getAddtionalPosts(result, filter);
      //temp fix for getting all post
      const sevenDatFilter = { updatedAt: { ge: dateProvider(1) } };
      const firstSevenDayPosts = await getPostByLikesAPI(sevenDatFilter, {
        eq: 0,
      });
      result.items.push(...firstSevenDayPosts.items);
      // }
    }
    if (userId) result = checkUserLikedSaved(result, userId, "both");
    return result;
  },
  LikeSave: async (postIds, userId, searchMode) => {
    try {
      const response = await API.graphql(
        graphqlOperation(checkUserLikedSavedPosts, {
          idArray: postIds,
          userId,
          searchMode,
        })
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  Likes: LikesAPI,
  Comments: commentsAPI,
  SavedPost: savedPostAPI,
  Follow: followAPI,
  Enquiry: enquiryAPI,
};

export default Post;

async function getPostByLikesAPI(filter, likesCount) {
  let result = await API.graphql(
    graphqlOperation(customPostsByLikes, {
      // limit: 20,
      trending: "sortByLikes",
      sortDirection: "DESC",
      filter,
      likesCount,
    })
  );
  const items = result.data.postsByLikes.items;
  const nextToken = result.data.postsByLikes.nextToken;
  return { items, nextToken };
}

// get addtional posts if needed

async function getAddtionalPosts(result, filter) {
  let flag = true;
  let limit = 10;
  while (flag) {
    if (result.items.length < limit && result.nextToken) {
      const additionalPosts = await getPostByLikesAPI(filter);
      result.items.push(...additionalPosts.items);
      result.nextToken = additionalPosts.nextToken;
    }
    if (result.items.length > limit || !result.nextToken) {
      flag = false;
    }
  }

  return result;
}
