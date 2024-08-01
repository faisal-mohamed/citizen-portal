import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Button,
} from "reactstrap";
import { defaultUser } from "../../assets/images";
import { Link, useParams } from "react-router-dom";
import "./post_screen.scss";
import moment from "moment/moment";
import CommonModal from "../../Components/CommonModal";
import EnquiryPage from "./enquiryModal";
import {
  createLikePost,
  deleteFollwer,
  deletePostLike,
  followUser,
} from "../../Utilities/apihelper";
import { useDispatch } from "react-redux";
import { setPostInfo } from "../../store/reducers/postSlice";
import { setAuthData } from "../../store/reducers/authSlice";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import SideBar from "./SideBar";

const ProjectView = () => {
  const navigate = useNavigate();

  const { postId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    auth,
    post: { postInfo },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const postFollow = async () => {
    try {
      const follwingUserPayload = {
        id: postInfo.postedById,
        followersCount: postInfo.followersCount + 1,
      };

      const followerPayload = {
        id: auth.loginUser.id,
        followingCount: auth.loginUser.followingCount + 1,
      };
      const payload = {
        followFollowedById: auth.loginUser.id,
        followFollowingId: postInfo.postedById,
      };

      const [followResult] = await followUser(
        follwingUserPayload,
        followerPayload,
        payload
      );
      dispatch(
        setAuthData(get(auth, "loginUser"), {
          followingCount: auth.loginUser.followingCount + 1,
        })
      );

      dispatch(
        setPostInfo(postInfo, {
          followed: true,
          followId: followResult.createFollow.id,
          followersCount: postInfo.followersCount + 1,
        })
      );
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteFollow = async () => {
    try {
      const follwingUserPayload = {
        id: postInfo.postedById,
        followersCount: postInfo.followersCount - 1,
      };

      const followerPayload = {
        id: auth.loginUser.id,
        followingCount: auth.loginUser.followingCount - 1,
      };
      const followerRemoveResponse = await deleteFollwer(
        follwingUserPayload,
        followerPayload,
        postInfo.followId
      );
      dispatch(
        setAuthData(get(auth, "loginUser"), {
          followingCount: auth.loginUser.followingCount - 1,
        })
      );
      dispatch(
        setPostInfo(postInfo, {
          followed: false,
          followId: "",
          followingCount: postInfo.followingCount - 1,
          followersCount: postInfo.followersCount - 1,
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  const deleteLike = async () => {
    try {
      const postUpdate = {
        id: postId,
        likesCount: postInfo.likesCount - 1,
      };

      const deleteResponse = deletePostLike(postInfo.likedId, postUpdate);

      if (!deleteResponse.err) {
        dispatch(
          setPostInfo(postInfo, {
            liked: false,
            likedId: "",
            likesCount: postInfo.likesCount - 1,
          })
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const postLike = async () => {
    const payload = {
      likesLikedById: auth.loginUser.id,
      likesPostedById: postInfo.postedById,
      postLikesId: postId,
      Liked: true,
    };
    const postUpdate = {
      id: postId,
      likesCount: postInfo.likesCount + 1,
    };

    const result = await createLikePost(payload, postUpdate);
    if (!result.err)
      dispatch(
        setPostInfo(postInfo, {
          liked: true,
          likedId: result.createLikes.id,
          likesCount: postInfo.likesCount + 1,
        })
      );
  };

  const modalHide = () => {
    setModalOpen(false);
  };

  const getModalBody = () => {
    return <EnquiryPage modalHide={modalHide} />;
  };

  return (
    <Fragment>
      <CommonModal
        show={modalOpen}
        modalBody={getModalBody}
        modalTitle={"Enquiry details"}
        size="lg"
      />
      <Container fluid>
        <Row>
          <Col sm={11}>
            <Card>
              <CardHeader className="card-header">
                <Row>
                  <Col md={8} className="d-flex flex-row gap-3">
                    <div className="d-flex flex-row gap-2">
                      <img
                        className="rounded-circle avatar-sm"
                        src={postInfo?.profileImage || defaultUser}
                        alt="project"
                      />
                    </div>
                    <div className="upload-header-details">
                      <h4 className="fw-bold">{postInfo?.title}</h4>
                      <div className="d-flex flex-row gap-1">
                        <Link
                          className="fw-bold"
                          to={`/profile/${postInfo.postedById}`}
                        >
                          {postInfo?.posterName}
                        </Link>
                        <span>|</span>
                        <p className="fs-14 fst-italic">
                          Posted on{" "}
                          {moment(postInfo?.createdDate).format("DD MMM YY")}
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    {auth.loginUser?.id !== postInfo.postedById ? (
                      <div className="d-flex flex-row  gap-2 justify-content-end">
                        <Button
                          outline={!postInfo.followed ? true : false}
                          color="secondary"
                          className="custom-toggle"
                          onClick={() => {
                            isEmpty(auth.loginUser)
                              ? navigate("/login")
                              : postInfo.followed
                              ? deleteFollow()
                              : postFollow();
                          }}
                        >
                          <span className="icon-on d-flex gap-1 align-bottom me-1">
                            <i
                              className={
                                postInfo.followed
                                  ? "ri-user-unfollow-line "
                                  : "ri-add-line "
                              }
                            ></i>
                            {postInfo.followed ? "Following" : "Follow"}
                          </span>
                        </Button>
                        <button
                          className={`btn like-btn ${
                            postInfo.liked && "btn-active"
                          }`}
                          onClick={() => {
                            isEmpty(auth.loginUser)
                              ? navigate("/login")
                              : postInfo.liked
                              ? deleteLike()
                              : postLike();
                          }}
                        >
                          <span className="icon-on d-flex justify-content-center align-items-center gap-1">
                            <i
                              className={
                                postInfo.liked
                                  ? "bx bxs-heart fs-18"
                                  : "bx bx-heart fs-18"
                              }
                            ></i>
                          </span>
                        </button>
                        <button
                          type="button"
                          className={`btn btn${
                            !postInfo.enquired ? "-outline" : ""
                          }-success waves-effect waves-light shadow-none`}
                          onClick={() => {
                            isEmpty(auth.loginUser)
                              ? navigate("/login")
                              : setModalOpen(true);
                          }}
                          disabled={postInfo.enquired}
                        >
                          <span className="d-flex justify-content-center align-items-center gap-1">
                            <i className="ri-mail-send-line"></i>
                            {postInfo.enquired ? "Send" : "Enquire now"}
                          </span>
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row className="project-main-wrapper">
                  <div className="project-description">
                    <p className="lead lh-base">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: postInfo?.description,
                        }}
                      />
                    </p>
                  </div>
                  <div className="image-container">
                    {postInfo?.postImages?.map((img, idx) => (
                      <img
                        src={img}
                        key={idx}
                        alt="project"
                        className="img-fluid rounded pb-3"
                      />
                    ))}
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col sm={1}>
            <SideBar />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ProjectView;
