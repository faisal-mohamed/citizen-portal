import User from "../models/UserModel";
import Post from "../models/postModel";

export const deleteFollwer = async (
  follwingPayload,
  followerPayload,
  connectionId
) => {
  try {
    const response = await Promise.all([
      User.update(follwingPayload),
      User.update(followerPayload),
      Post.Follow.delete(connectionId),
    ]);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};
export const followUser = async (
  follwingPayload,
  followerPayload,
  followPayload
) => {
  try {
    const response = await Promise.all([
      Post.Follow.create(followPayload),
      User.update(follwingPayload),
      User.update(followerPayload),
    ]);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const checkUserLikedSaved = async (postItems, userId, searchMode) => {
  const filterPostId = postItems.items.map((item) => item.id);

  try {
    const {
      checkUserLikedSavedPosts: { items },
    } = await Post.LikeSave(filterPostId, userId, searchMode);
    if (items) {
      postItems.items = postItems.items.map((post) => {
        const data = items.find((item) => post.id === item.postId);
        if (data) {
          post.userLikeId = post.userLikeId ? post.userLikeId : data.LikeId;
          post.userSaveId = post.userSaveId ? post.userSaveId : data.SaveId;
        }
        return post;
      });
    }

    return postItems;
  } catch (error) {
    throw error;
  }
};

export const createLikePost = async (likePayload, postPayload) => {
  const result = await Post.Likes.create(likePayload);
  if (result.createLikes) {
    await Post.update(postPayload);
    return result;
  }
  return {
    err: "Create Likes failed!",
  };
};

export const deletePostLike = async (likeId, postPayload) => {
  try {
    const result = await Post.Likes.delete(likeId);

    if (result.deleteLikes) {
      await Post.update(postPayload);
      return "like deleted";
    }
    return {
      err: "like deletion failed!",
    };
  } catch (error) {
    throw error;
  }
};
