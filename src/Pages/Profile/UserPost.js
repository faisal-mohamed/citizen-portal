import React, { useEffect, useState } from "react";
import Post from "../../models/postModel";
import { Card, CardBody, Row } from "reactstrap";
import ImageCard from "../../Components/ImageCard";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";
import { Draft, moveDrafts } from "../../models/DraftModel";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPostsData } from "../../store/reducers/postSlice";

const UserPost = ({ currentTab }) => {
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  const dispatch = useDispatch();

  const {post: {postsData} ,auth: {loginUser} } = useSelector((state) => state);

  useEffect(() => {
    if (currentTab === "My Designs" || currentTab === "Works") {
      getUserPosts();
    } else if (currentTab === "Liked Post") {
      getLikedposts();
    } else if (currentTab === "Collections") {
      getSavedPosts();
    } else {
      getUserDraftPosts();
    }
  }, []);

  const getUserPosts = async () => {
    try {
      const userPostResponse = await Post.list({
        postPostedById: { eq: userId },
      },loginUser?.id);

      dispatch(setPostsData(userPostResponse.items));
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getLikedposts = async () => {
    try {
      const payload = { likesLikedById: { eq: userId } };
      const { items } = await Post.Likes.list(payload, loginUser?.id);
      dispatch(setPostsData(items));
      setLoading(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  const getSavedPosts = async () => {
    try {
      const payload = { savedPostSavedById: { eq: userId } };
      const { items } = await Post.SavedPost.List(payload, loginUser?.id );
      console.log("items", items);

      dispatch(setPostsData(items));
      setLoading(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  const getUserDraftPosts = async () => {
    try {
      const filter = { postDraftsCreateById: { eq: userId } };
      const {
        listPostDrafts: { items },
      } = await Draft.list(filter);
      const Draftfilter = { movedDraftPostsPostedById: { eq: userId } };
      const {
        listMovedDraftPosts: { items: movedDraftItems },
      } = await moveDrafts.list(Draftfilter);
      dispatch(setPostsData([...items, ...movedDraftItems]));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card>
      <CardBody>
        <Row>
          {!isEmpty(postsData) &&
            !loading &&
            postsData.map((item, key) => (
              <ImageCard
                postInfo={item}
                currentTab={currentTab}
                isOwner={item.postedBy?.id === loginUser?.id}
                isMovedPostDraft={item.movedDraftPostsPostedById ? true : false}
              />
            ))}
        </Row>
      </CardBody>
    </Card>
  );
};

export default UserPost;
