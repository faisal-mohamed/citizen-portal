import React, { useCallback, useEffect, useState } from "react";
import "./post_screen.scss";
import ProjectView from "./ProjectView";
import CommentsCanvas from "./CommentsCanvas";
import ReactGA from "react-ga";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../models/postModel";
import { setPostInfo } from "../../store/reducers/postSlice";
import isEmpty from "lodash/isEmpty";
import ContainerLoader from "../../Components/ContainerLoader";

const PostView = () => {
  const { postId } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    getSinglePost();
  }, []);

  const { loginUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const getSinglePost = useCallback(async () => {
    setLoading(true);
    try {
      const postResult = await Post.get(postId);
      const {
        title,
        description,
        createdAt,
        thumbnailUrl,
        s3Url,
        likesCount,
        postedBy: { id, firstName, image, email, followersCount },
      } = postResult.getPost;
      const postInfo = {
        title,
        description,
        thumbnailImage: thumbnailUrl,
        postImages: s3Url,
        createdDate: createdAt,
        likesCount: !likesCount ? 0 : likesCount,
        posterName: firstName,
        email: email,
        profileImage: image,
        postedById: id,
        followersCount,
      };
      if (loginUser?.id) {
        const payload = {
          and: {
            postLikesId: { eq: postId },
            likesLikedById: { eq: loginUser.id },
          },
        };

        const savedpayload = {
          and: {
            savedPostSavedById: { eq: loginUser.id },
            postSavedPostId: { eq: postId },
          },
        };
        const followpayload = {
          and: {
            followFollowedById: { eq: loginUser.id },
            followFollowingId: { eq: id },
          },
        };
        const enquiredPayload = {
          and: {
            postEnquiryId: { eq: postId },
            enquiryEnquiredByIdId: { eq: loginUser.id },
          },
        };

        const [isLikeduser, isFolloweduser, isSavedby, isEnquired] =
          await Promise.all([
            Post.Likes.list(payload),
            Post.Follow.List(followpayload),
            Post.SavedPost.List(savedpayload),
            Post.Enquiry.list(enquiredPayload),
          ]);
        const likedId = isLikeduser.items[0]?.id;
        const savedId = isSavedby.items[0]?.id;
        const followId = isFolloweduser.listFollows?.items[0]?.id;
        postInfo.liked = likedId ? true : false;
        postInfo.likedId = likedId ? likedId : "";
        postInfo.savedId = savedId ? savedId : "";
        postInfo.followId = followId ? followId : "";
        postInfo.followed = followId ? true : false;
        postInfo.enquired = !isEmpty(isEnquired.listEnquiries.items)
          ? true
          : false;
      }

      dispatch(setPostInfo(postInfo));
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  }, [postId]);
  return (
    <React.Fragment>
      <CommentsCanvas />
      <div className="page-content">
        {loading ? <ContainerLoader /> : <ProjectView />}
      </div>
    </React.Fragment>
  );
};

export default PostView;
