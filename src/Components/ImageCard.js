import React from "react";
import { Col, Card } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../css/component.style.scss";
import { defaultUser } from "../assets/images";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createLikePost, deletePostLike } from "../Utilities/apihelper";
import { setPostsData } from "../store/reducers/postSlice";
import { cloneDeep, isEmpty } from "lodash";
import Post from "../models/postModel";
import { setHomePostData } from "../store/reducers/homeSlice";

const ImageCard = ({
  postInfo,
  isOwner,
  currentTab,
  isMovedPostDraft,
  isPostRemove,
  isHomePage,
}) => {
  const {
    id,
    thumbnailUrl,
    title,
    likesCount,
    commentsCount,
    userLikeId,
    userSaveId,
    postedBy: { id: authorId, image, firstName } = {},
  } = postInfo;
  const {
    auth: { loginUser },
    post: { postsData },
    home: { homePostData },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const createLike = async () => {
    const payload = {
      likesLikedById: loginUser.id,
      likesPostedById: authorId,
      postLikesId: id,
      Liked: true,
    };
    const postUpdate = {
      id,
      likesCount: likesCount + 1,
    };

    const result = await createLikePost(payload, postUpdate);
    if (!result.err) {
      const clonePostsData = isHomePage
        ? cloneDeep(homePostData)
        : cloneDeep(postsData);
      const updatedPostItems = clonePostsData.map((post) => {
        if (post.id === id) {
          post.userLikeId = result.createLikes.id;
          post.likesCount = likesCount + 1;
          return post;
        }
        return post;
      });
      if (isHomePage) {
        dispatch(setHomePostData(updatedPostItems));
      } else {
        dispatch(setPostsData(updatedPostItems));
      }
    }
  };

  const deleteLike = async () => {
    try {
      const postUpdate = {
        id,
        likesCount: likesCount - 1,
      };
      const deleteResponse = await deletePostLike(userLikeId, postUpdate);
      if (!deleteResponse.err) {
        const clonePostsData = isHomePage
          ? cloneDeep(homePostData)
          : cloneDeep(postsData);

        if (currentTab === "Liked Post") {
          const indexToRemove = clonePostsData.findIndex(
            (post) => post.id === id
          );

          if (indexToRemove !== -1) {
            clonePostsData.splice(indexToRemove, 1);
            dispatch(setPostsData(clonePostsData));
            return;
          }
        }
        const updatedPostItems = clonePostsData.map((post) => {
          if (post.id === id) {
            post.userLikeId = null;
            post.likesCount = likesCount - 1;
            return post;
          }
          return post;
        });
        if (isHomePage) {
          dispatch(setHomePostData(updatedPostItems));
        } else {
          dispatch(setPostsData(updatedPostItems));
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const createSaved = async () => {
    try {
      const payload = {
        savedPostSavedById: loginUser.id,
        postSavedPostId: id,
      };
      const savedPost = await Post.SavedPost.create(payload);
      if (savedPost.createSavedPost) {
        const clonePostsData = isHomePage
          ? cloneDeep(homePostData)
          : cloneDeep(postsData);
        const updatedPostItems = clonePostsData.map((post) => {
          if (post.id === id) {
            post.userSaveId = savedPost.createSavedPost.id;
            return post;
          }
          return post;
        });
        if (isHomePage) {
          dispatch(setHomePostData(updatedPostItems));
        } else {
          dispatch(setPostsData(updatedPostItems));
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const deletedSaved = async () => {
    try {
      const deleteResponse = await Post.SavedPost.delete(userSaveId);
      if (deleteResponse.deleteSavedPost) {
        const clonePostsData = isHomePage
          ? cloneDeep(homePostData)
          : cloneDeep(postsData);
        if (currentTab === "Collections") {
          const indexToRemove = clonePostsData.findIndex(
            (post) => post.id === id
          );

          if (indexToRemove !== -1) {
            clonePostsData.splice(indexToRemove, 1);
            dispatch(setPostsData(clonePostsData));
            return;
          }
        }
        const updatedPostItems = clonePostsData.map((post) => {
          if (post.id === id) {
            post.userSaveId = null;
            return post;
          }
          return post;
        });
        if (isHomePage) {
          dispatch(setHomePostData(updatedPostItems));
        } else {
          dispatch(setPostsData(updatedPostItems));
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <React.Fragment>
      <Col lg={4} className="element-item project designing development">
        <Card className="gallery-box">
          <div className="gallery-container">
            <Link
              className="image-popup"
              to={
                currentTab !== "My Drafts"
                  ? `/post/${id}`
                  : `/post/draft/${id}/edit`
              }
              state={{ isMovedPostDraft }}
              title={title}
            >
              <img
                className="gallery-img img-fluid mx-auto"
                src={thumbnailUrl}
                alt="Responsive"
              />

              {/* <div className="gallery-overlay"></div> */}
              <div className="gallery-overlay d-flex flex-column gap-2 place-bid-btn img-btn">
                {!isOwner && currentTab !== "My Drafts" && (
                  <>
                    <Link
                      to="#"
                      onClick={() => {
                        if (isEmpty(loginUser)) {
                          window.location.href = "/login";
                        } else {
                          if (!userLikeId) {
                            createLike();
                          } else {
                            deleteLike();
                          }
                        }
                      }}
                      className={`thumnail-btn ${userLikeId ? "active" : ""}  `}
                    >
                      <i className="fs-16 ri-heart-line" />
                    </Link>

                    <Link
                      to="#"
                      onClick={() => {
                        if (isEmpty(loginUser)) {
                          window.location.href = "/login";
                        } else {
                          if (!userSaveId) {
                            createSaved();
                          } else {
                            deletedSaved();
                          }
                        }
                      }}
                      className={`thumnail-btn ${userSaveId ? "active" : ""}`}
                    >
                      <i className="fs-16  ri-bookmark-line" />
                    </Link>
                  </>
                )}
              </div>
              <div className="gallery-overlay">
                <h5 className="overlay-caption">{title}</h5>
              </div>
            </Link>
          </div>

          {currentTab !== "My Drafts" && (
            <div className="box-content">
              <div className="d-flex align-items-center justify-content-between mt-1">
                {currentTab !== "My Designs" && currentTab !== "Works" && (
                  <div className="flex-grow-1 text-muted">
                    <img
                      src={image || defaultUser}
                      alt="profile"
                      className="rounded-circle avatar-xs"
                    />
                    <Link
                      to={`/profile/${authorId}`}
                      className="text-body text-truncate"
                      style={{ paddingLeft: "5px" }}
                    >
                      {firstName}
                    </Link>
                  </div>
                )}
                <div className="flex-shrink-0">
                  <div className="d-flex gap-3">
                    <button
                      type="button"
                      className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 shadow-none"
                    >
                      <i className="las la-heart px-1 fs-15 text-primarycolor"></i>
                      {likesCount}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0 shadow-none"
                    >
                      <i className="lab la-rocketchat px-1 fs-15 "></i>
                      {commentsCount}
                    </button>
                  </div>
                </div>
                {currentTab === "My Designs" && (
                  <div className="flex-shrink-0">
                    <Link to={`/post/edit/${id}`} className="">
                      Edit Post
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default ImageCard;
