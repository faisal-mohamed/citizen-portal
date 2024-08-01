import React, { memo, useState } from "react";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { defaultUser } from "../../assets/images";
import Button from "../../Components/button_ui";
import { Label, Form } from "reactstrap";
import { successModal } from "../../Utilities/helpers";
import { setPostInfo } from "../../store/reducers/postSlice";
import cloneDeep from "lodash/cloneDeep";
import { Row, Col } from "reactstrap";
import Post from "../../models/postModel";
import "./post_screen.scss";

const EnquiryPage = ({ modalHide }) => {
  const { post, auth } = useSelector((state) => state);
  const { postInfo } = post;
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { postId } = useParams();

  const dispatch = useDispatch();

  const createPost = async () => {
    setLoading(true);
    try {
      const data = {
        message: enquiryMessage,
        postEnquiryId: postId,
        enquiryEnquiredByIdId: auth.loginUser.id,
      };
      await Post.Enquiry.create(data);
      setEnquiryMessage("");
      modalHide();
      const clonedPostInfo = cloneDeep(postInfo);
      clonedPostInfo.enquired = true;
      dispatch(setPostInfo(postInfo, clonedPostInfo));
      setLoading(false);
      successModal("Your enquiry submitted successfully!");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Container fluid>
        <h4 className="">Enquiry details</h4>
        <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
          <img
            className="rounded-circle avatar-lg"
            src={postInfo.profileImage || defaultUser}
            alt="profile"
            style={{
              boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
            }}
          />
          <span className="fs-18 fw-semibold">{postInfo?.posterName}</span>
          <span className="fs-18 fw-semibold">{postInfo?.email}</span>
        </div>
        <Form>
          <div className="mb-3">
            <Label htmlFor="validationTextarea" className="form-label">
              Message:
            </Label>
            <textarea
              onChange={(e) => setEnquiryMessage(e.target.value)}
              rows={5}
              className="form-control"
              id="message-text"
              placeholder="Type message"
              required
            ></textarea>
          </div>
          <Row className=" p-2 mb-2 bg-light rounded">
            <h5 className="fs-13">Hints</h5>
            <Col sm={4}>
              <p id="pass-length" className="enquiry-info fs-12 mb-2">
                Property type: HDB / Condo?
              </p>
              <p id="pass-lower" className="enquiry-info fs-12 mb-2">
                Is it new, resale or existing?
              </p>
            </Col>
            <Col>
              <p id="pass-upper" className="enquiry-info fs-12 mb-2">
                Key collected?
              </p>
              <p id="pass-number" className="enquiry-info fs-12 mb-2">
                Renovation budget in mind?
              </p>
            </Col>
          </Row>
        </Form>
        <div className="modal-footer">
          <Button text="Cancel" onClick={modalHide}></Button>
          <Button
            onClick={createPost}
            activity={loading}
            activityMsg={"sending"}
            text="Send message"
            className="primary"
            type="submit"
            disabled={enquiryMessage !== "" ? false : true}
          ></Button>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default memo(EnquiryPage);
