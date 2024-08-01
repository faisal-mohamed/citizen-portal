import React, { memo, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import { setOffCanvasOpen } from "../../store/reducers/commonSlice";
import SimpleBar from "simplebar-react";
import { Link, useParams } from "react-router-dom";
import Post from "../../models/postModel";
import { isEmpty } from "lodash";
import { defaultUser } from "../../assets/images";
import moment from "moment/moment";

const CommentsCanvas = () => {
  const ref = useRef();

  const [comments, setComments] = useState("");

  const [commentsList, setCommentsList] = useState({
    loading: true,
    commentsData: [],
  });

  const [loadComments, setCommentsLoad] = useState(false);

  const isOpen = useSelector((state) => state.common.isOffcanvasOpen);
  const { loginUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { postId } = useParams();

  useEffect(() => {
    isOpen && getCommentsList();
  }, [isOpen, loadComments]);

  const getCommentsList = async () => {
    // const filter = {
    //   postID: {
    //     eq: postId,
    //   },
    // };
    const commentsList = await Post.Comments.ListSorted(postId);

    setCommentsList((state) => ({
      ...state,
      loading: false,
      commentsData: commentsList.commentsByPostIDAndCreatedAt.items,
    }));
  };

  const toggleRightCanvas = () => dispatch(setOffCanvasOpen(false));

  const postComment = async () => {
    try {
      const payload = {
        commentCommentedById: loginUser.id,
        postID: postId,
        commentPostId: postId,
        content: comments,
      };

      await Post.Comments.create(payload);
      await Post.update({
        id: postId,
        commentsCount: commentsList.commentsData.length + 1,
      });
      setCommentsLoad(!loadComments);
      setComments("");
    } catch (error) {
      console.log("err", error);
    }
  };
  return (
    <Offcanvas
      isOpen={isOpen}
      direction="end"
      toggle={toggleRightCanvas}
      id="offcanvasRight"
      className="border-bottom"
    >
      <OffcanvasHeader toggle={toggleRightCanvas} id="offcanvasRightLabel">
        Comments
      </OffcanvasHeader>
      <OffcanvasBody className="p-0 overflow-hidden">
        <Card>
          {/* <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Comments</h4>
                        </CardHeader> */}

          <CardBody>
            <SimpleBar
              style={{ height: "55vh" }}
              className="px-3 mx-n3 mb-2"
              data-simplebar-track="primary"
            >
              {!isEmpty(commentsList.commentsData) ? (
                commentsList.commentsData.map((comment, key) => (
                  <div className="d-flex mb-4" key={key}>
                    <div className="flex-shrink-0">
                      <img
                        src={comment?.commentedBy?.image || defaultUser}
                        alt=""
                        className="avatar-xs rounded-circle"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="fs-13 fw-bolder">
                        {comment.commentedBy?.firstName}
                        <small className="text-muted ms-2">
                          {moment(comment.createdAt).format(
                            "DD MMM YYYY - hh:mmA"
                          )}
                        </small>
                      </h5>
                      <p>{comment?.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <h5>No comments..</h5>
              )}
            </SimpleBar>
            <Row className="g-3">
              <Col xs={12}>
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label text-body"
                >
                  Leave a Comments
                </label>
                <textarea
                  ref={ref}
                  className="form-control bg-light border-light"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Enter your comment..."
                  value={comments}
                  onChange={(event) => setComments(event.target.value)}
                ></textarea>
              </Col>
              <Col xs={12} className="text-end">
                <Button
                  className="btn btn-success"
                  onClick={postComment}
                  disabled={ref.current?.value ? false : true}
                >
                  Post Comments
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default memo(CommentsCanvas);
