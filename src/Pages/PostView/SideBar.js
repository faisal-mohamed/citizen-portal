import React, { useState, useEffect } from "react";
import { Button, UncontrolledTooltip } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { defaultUser } from "../../assets/images";
import { setOffCanvasOpen } from "../../store/reducers/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import CommentsCanvas from "./CommentsCanvas";
import Post from "../../models/postModel";
import isEmpty from "lodash/isEmpty";

const SideBar = () => {
  const { postId } = useParams();

  const {
    auth: { loginUser },
    post: { postInfo },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    saved: false,
  });
  useEffect(() => {
    if (postInfo) {
      setState((state) => ({
        ...state,
        saved: postInfo.savedId ? true : false,
      }));
    }
  }, [postInfo]);

  const createSaved = async () => {
    try {
      const payload = {
        savedPostSavedById: loginUser.id,
        postSavedPostId: postId,
      };
      const savedPost = await Post.SavedPost.create(payload);
      console.log("savedPost", savedPost);
      setState((state) => ({
        ...state,
        saved: true,
      }));
    } catch (error) {
      console.log("error", error);
    }
  };

  const deletedSaved = async () => {
    try {
      await Post.SavedPost.delete(postInfo.savedId);
      setState((state) => ({
        ...state,
        saved: false,
      }));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <React.Fragment>
      <CommentsCanvas />
      <div className="sidebar-wrapper">
        <div className="d-flex flex-column align-content-centerm p-3">
          <Link to={`/profile/${postInfo.postedById}`} className="d-flex flex-column gap-2 justify-content-center align-items-center">
            <img
              className="rounded-circle avatar-sm"
              src={postInfo?.profileImage || defaultUser}
              alt="profile"
            />
            {/* <span className="follow-btn">
              <i className="fs-20 ri-user-follow-fill" />
            </span> */}
            <span className="fs-12 fw-semibold">{postInfo?.posterName}</span>
          </Link>
          {loginUser?.id !== postInfo.postedById && (
            <div className="d-flex flex-column gap-1 justify-content-center align-items-center mt-2 mb-3">
              <Button color="light" className="btn-icon" id="postSave">
                <lord-icon
                  onClick={() =>
                    isEmpty(loginUser)
                      ? navigate("/login")
                      : state.saved
                      ? deletedSaved()
                      : createSaved()
                  }
                  src={
                    state.saved
                      ? "https://cdn.lordicon.com/eanmttmw.json"
                      : "https://cdn.lordicon.com/gigfpovs.json"
                  }
                  trigger="hover"
                  colors={state.saved ? "primary:#45CB85" : "primary:#000"}
                  style={{ width: 25, height: 25 }}
                ></lord-icon>{" "}
              </Button>
              <UncontrolledTooltip placement="left" target="postSave">
                {" "}
                Save post{" "}
              </UncontrolledTooltip>
            </div>
          )}
          <div className="d-flex flex-column gap-2 justify-content-center align-items-center mt-1">
            <Button color="light" className="btn-icon" id="comments">
              <lord-icon
                onClick={() =>
                  isEmpty(loginUser)
                    ? navigate("/login")
                    : dispatch(setOffCanvasOpen(true))
                }
                src="https://cdn.lordicon.com/hpivxauj.json"
                trigger="hover"
                colors="primary:#000"
                style={{ width: 25, height: 25 }}
              ></lord-icon>
            </Button>
            <UncontrolledTooltip placement="left" target="comments">
              Comments
            </UncontrolledTooltip>
          </div>
          {postInfo?.postedById === loginUser?.id && (
            <div className="d-flex flex-column gap-2 justify-content-center align-items-center mt-3 mb-3">
              <Button
                id="edit"
                className="action-btn"
                onClick={() => navigate(`/post/edit/${postId}`)}
              >
                <i className="fs-18 mt-1 ri-edit-fill" />
              </Button>
              <UncontrolledTooltip placement="left" target="edit">
                Edit
              </UncontrolledTooltip>
            </div>
          )}
          {/* <div className="d-flex flex-column gap-2 justify-content-center align-items-center mt-1">
            <Button className="action-btn">
              <lord-icon
                class="mt-2"
                src="https://cdn.lordicon.com/uvqnvwbl.json"
                trigger="hover"
                colors="primary:#121331"
                style={{ width: 25, height: 25 }}
                onClick={() => console.log("clickable")}
              />
            </Button>
            <span className="fs-12 fw-semibold text-muted">Share</span>
          </div> 
          <div className="d-flex flex-column gap-2 justify-content-center align-items-center mt-1">
            <Button className="action-btn">
              <lord-icon
                class="mt-2"
                src="https://cdn.lordicon.com/ncxoarcp.json"
                trigger="hover"
                colors="primary:#121331"
                style={{ width: 25, height: 25 }}
              ></lord-icon>
            </Button>
            <span className="fs-12 fw-semibold text-muted">Info</span>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
