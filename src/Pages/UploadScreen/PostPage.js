import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Button from "../../Components/button_ui";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ImagePreview from "../../Components/ImagePreview";
import { cloneDeep, isEmpty, update } from "lodash";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { setUploadImages } from "../../store/reducers/commonSlice";
import "./uploadScreen.scss";
import CustomSelect from "../../Components/CustomSelect";
import Post from "../../models/postModel";
import { file } from "../../models/filesModel";
import {
  Success,
  checkUrlChange,
  createFileUrl,
  extractKey,
} from "../../Utilities/helpers";
import { category } from "../../models/CategoryModel";
import ImageList from "./ImageList";
import { Draft, moveDrafts } from "../../models/DraftModel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addImage } from "../../assets/images";
import Alert from "../../Components/Alert";

const mySwal = withReactContent(Swal);

const PostPage = ({ view }) => {
  document.title = "Create Post | Desigers";

  const [alertState, setAlertState] = useState({
    show: false,
    type: "",
    message: "",
    color: "",
  });

  const [draftState, setDraftState] = useState("");

  const [movedPostData, setMovedPostData] = useState({});

  const {
    common: { uploadedImages },
  } = useSelector((state) => state);

  const { loginUser } = useSelector((state) => state.auth);

  const editPostParams = useParams();

  const location = useLocation();

  const { s3Urls } = uploadedImages;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      tags: "",
      thumbnailUrl: "",
      categoryOptions: [],
      category: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title shouldn't be empty"),
      category: Yup.string().required("Please select category"),
      thumbnailUrl: Yup.mixed().required("Please choose thumbnail"),
    }),
    onSubmit: async (values) => {
      if (draftState === "create") {
        await createPost();
        return;
      } else if (draftState === "edit") {
        await updatePost();
        return;
      }

      handlePost();
    },
  });
  useEffect(() => {
    if (view === "postEdit" || view === "draftEdit") {
      getPost();
    } else if (isEmpty(s3Urls)) {
      navigate("/upload/new");
    }
    listDesignCatagories();
  }, []);

  const listDesignCatagories = async () => {
    try {
      const categoryResponse = await category.list();

      const categoryOptions = !isEmpty(categoryResponse)
        ? categoryResponse.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        : [];
      validation.setFieldValue("categoryOptions", categoryOptions);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPost = async () => {
    try {
      let postResult = {};
      let category = "";
      if (view === "postEdit") {
        let response = await Post.get(editPostParams.postId);
        postResult = response.getPost;
        category = postResult.postCategoryId;
      } else if (location?.state.isMovedPostDraft) {
        let response = await moveDrafts.get(editPostParams.draftId);
        postResult = response.getMovedDraftPosts;
        category = postResult.movedDraftPostsCategoryId;
        setMovedPostData(postResult);
      } else {
        let response = await Draft.get(editPostParams.draftId);
        postResult = response.getPostDrafts;
        category = postResult.postDraftsCategoryId;
      }
      const { title, description, thumbnailUrl, s3Url, tags } = postResult;

      dispatch(
        setUploadImages(uploadedImages, {
          s3Urls: s3Url,
        })
      );
      validation.setValues((state) => ({
        ...state,
        title,
        description,
        tags,
        category,
        thumbnailUrl,
      }));
    } catch (error) {
      console.log("err", error);
    }
  };

  const uploadImages = async () => {
    let updatedS3Url = cloneDeep(s3Urls);

    const isS3UrlChanged = checkUrlChange(s3Urls);
    if (isS3UrlChanged) {
      const promise = s3Urls.map(async (fileObject) => {
        if (typeof fileObject === "string") {
          return fileObject;
        } else {
          const response = await file.upload(fileObject);
          return response;
        }
      });
      updatedS3Url = await Promise.all(promise);
    }

    return updatedS3Url;
  };

  const getThumbnail = (updatedS3Url) => {
    let thumbnailUrl = "";
    let selectedThumbnail = validation.values.thumbnailUrl;

    if (typeof selectedThumbnail === "string") {
      thumbnailUrl = selectedThumbnail;
    } else {
      const imageIndex = s3Urls.findIndex((url) => url === selectedThumbnail);

      thumbnailUrl = updatedS3Url[imageIndex];
    }

    return thumbnailUrl;
  };

  const createPost = async (type) => {
    try {
      const updatedS3Url = await uploadImages();
      const thumbnailUrl = getThumbnail(updatedS3Url);

      if (type === "create") {
        const data = {
          postPostedById: loginUser.id,
          title: validation.values.title,
          thumbnailUrl,
          s3Url: updatedS3Url,
          tags: validation.values.tags,
          postCategoryId: validation.values.category,
          description: validation.values.description,
          likesCount: !isEmpty(movedPostData) ? movedPostData.likesCount : 0,
          commentsCount: !isEmpty(movedPostData)
            ? movedPostData.commentsCount
            : 0,
        };
        if (view === "draftEdit") {
          if (!isEmpty(movedPostData)) {
            await moveDrafts.delete(editPostParams.draftId);
            data.id = editPostParams.draftId;
          } else {
            await Draft.delete(editPostParams.draftId);
          }
        }

        await Post.create(data);
        return;
      }
      if (view === "postEdit") {
        await Post.delete(editPostParams.postId);
        const payload = {
          id: editPostParams.postId,
          movedDraftPostsPostedById: loginUser.id,
          title: validation.values.title,
          thumbnailUrl,
          s3Url: updatedS3Url,
          tags: validation.values.tags,
          movedDraftPostsCategoryId: validation.values.category,
          description: validation.values.description,
          likesCount: !isEmpty(movedPostData) ? movedPostData.likesCount : 0,
          commentsCount: !isEmpty(movedPostData)
            ? movedPostData.commentsCount
            : 0,
        };
        await moveDrafts.create(payload);
        Success("Post moved to drafts.");
        navigate(`/profile/${loginUser.id}`);
        return;
      }

      const data = {
        postDraftsCategoryId: validation.values.category,
        postDraftsCreateById: loginUser.id,
        title: validation.values.title,
        thumbnailUrl,
        s3Url: updatedS3Url,
        tags: validation.values.tags,
        description: validation.values.description,
      };

      await Draft.create(data);
      Success("Draft Created Successfully!");
      navigate(`/profile/${loginUser.id}`);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (type) => {
    try {
      const updatedS3Url = await uploadImages();
      const thumbnailUrl = getThumbnail(updatedS3Url);
      if (type === "updatePost") {
        const payload = {
          id: editPostParams.postId,
          title: validation.values.title,
          postCategoryId: validation.values.category,
          thumbnailUrl,
          s3Url: updatedS3Url,
          tags: validation.values.tags,
          description: validation.values.description,
        };
        await Post.update(payload);
        return;
      }

      const payload = {
        id: editPostParams.draftId,
        title: validation.values.title,
        postDraftsCategoryId: validation.values.category,
        thumbnailUrl,
        s3Url: updatedS3Url,
        tags: validation.values.tags,
        description: validation.values.description,
      };

      if (location?.state.isMovedPostDraft) {
        const payload = {
          id: editPostParams.draftId,
          title: validation.values.title,
          movedDraftPostsCategoryId: validation.values.category,
          thumbnailUrl,
          s3Url: updatedS3Url,
          tags: validation.values.tags,
          description: validation.values.description,
        };
        await moveDrafts.update(payload);
        Success("Draft Update Successfully");
        navigate(`/profile/${loginUser.id}`);
        return;
      }

      await Draft.update(payload);
      Success("Draft Update Successfully");
      navigate(`/profile/${loginUser.id}`);

      return;
    } catch (error) {
      console.log("error", error);
    }
  };
  const handlePost = () => {
    mySwal
      .fire({
        title: view === "postEdit" ? "Ready to update Post" : "Ready to Post?",
        html: "<b></b>.",
        icon: "warning",
        showCancelButton: true,
        showLoaderOnConfirm: true,
        reverseButtons: true,
        preConfirm: async () => {
          try {
            const b = Swal.getHtmlContainer().querySelector("b");
            b.textContent =
              view === "postEdit"
                ? "Post update in progress"
                : "Post create in progress...";
            view === "postEdit"
              ? await updatePost("updatePost")
              : await createPost("create");
            return {
              success: true,
              message: `Your post was ${
                view === "postEdit" ? "updated" : "created"
              } successfully`,
            };
          } catch (error) {
            return {
              success: false,
              message: "There was an error while creating your post",
            };
          }
        },
        allowOutsideClick: () => !mySwal.isLoading(),
      })
      .then((result) => {
        if (result.value.success) {
          mySwal.fire("Success", result.value.message, "success").then(() => {
            dispatch(setUploadImages({ s3Urls: [] }));
            navigate("/");
          });
        } else {
          mySwal.fire("Error", result.value.message, "error");
        }
      });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Alert
          show={alertState.show}
          color={alertState.color}
          type={alertState.type}
          message={alertState.message}
          toggle={() =>
            setAlertState((state) => ({
              ...state,
              show: false,
            }))
          }
        />
        <Container fluid>
          <Form onSubmit={validation.handleSubmit}>
            <Row>
              <Col lg={3}>
                <Card>
                  <Label className="p-1 mb-0">Choose Thumbnail</Label>
                  <div
                    className={
                      !validation.values.thumbnailUrl
                        ? "d-flex align-items-center thumbnail-container"
                        : "thumbnail-container"
                    }
                  >
                    {!validation.values.thumbnailUrl ? (
                      <div className="image-select-wrap">
                        <img
                          src={addImage}
                          alt="thumbnail"
                          height={80}
                          width={80}
                          name="thumbnailUrl"
                        />
                        <p className="text-muted pl-2 mb-0 w-75 text-wrap">
                          Select thumbnail from uploaded image list
                        </p>
                      </div>
                    ) : (
                      <ImagePreview
                        name={validation.values.thumbnailUrl?.name}
                        preview={
                          validation.values.thumbnailUrl?.preview ||
                          validation.values.thumbnailUrl
                        }
                        className="thumnail-img"
                      />
                    )}
                  </div>
                  {validation.errors.thumbnailUrl &&
                    validation.touched.thumbnailUrl && (
                      <FormFeedback type="invalid" style={{ display: "block" }}>
                        {validation.errors.thumbnailUrl}
                      </FormFeedback>
                    )}
                </Card>
              </Col>
              <Col lg={8}>
                <ImageList
                  isEdit={view === "postEdit" || view === "draftEdit"}
                  alertSetState={setAlertState}
                  validation={validation}
                />
              </Col>
            </Row>
            <Row>
              <h4 className="py-2">Describe your design</h4>
              <Col lg={5}>
                <Card className="p-2">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="design-title-input">
                      Design Title
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="design-title-input"
                      placeholder="Enter Design title"
                      name="title"
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      value={validation.values.title}
                      invalid={
                        validation.errors.title && validation.touched.title
                          ? true
                          : false
                      }
                    />
                    {validation.errors.title && validation.touched.title && (
                      <FormFeedback type="invalid">
                        {validation.errors.title}
                      </FormFeedback>
                    )}
                  </div>
                  {/* <div className="mb-3">
                  <Label className="form-label" htmlFor="design-tag-input">
                    Add Tags
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="design-tag-input"
                    placeholder="Separate tags with commas(e.g. modern, coastal, minimalist) "
                    name="tags"
                    onChange={(e) => handleOnChange("tags", e.target.value)}
                    value={state.tags}
                  />
                </div> */}
                  <div className="">
                    <CustomSelect
                      title="Category"
                      options={validation.values.categoryOptions}
                      placeholder="select category"
                      name="category"
                      onBlur={validation.handleBlur}
                      onChangeFunc={(name, value) =>
                        validation.setFieldValue(name, value)
                      }
                      value={validation.values.category}
                      errorMsg={
                        validation.touched.category &&
                        validation.errors.category
                      }
                    />
                  </div>
                </Card>
              </Col>
              <Col lg={6}>
                <div className="editotr-container">
                  <Label>Design Description</Label>
                  <SimpleBar style={{ maxHeight: "320px", minHeight: "300px" }}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={validation.values.description}
                      onChange={(event, editor) => {
                        validation.setFieldValue(
                          "description",
                          editor.getData()
                        );
                      }}
                    />
                  </SimpleBar>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  text="cancel"
                  onClick={() => navigate(`/profile/${loginUser.id}`)}
                />
              </Col>
              <Col>
                <div className="d-flex flex-direction-column justify-content-end gap-2 col">
                  <Button
                    text={
                      view === "draftEdit" ? "Update Draft" : "Save as draft"
                    }
                    type="submit"
                    activity={validation.isSubmitting}
                    activityMsg={
                      draftState === "create" ? "Saving" : "Updating"
                    }
                    className="close"
                    onClick={() => {
                      view === "draftEdit"
                        ? setDraftState("edit")
                        : setDraftState("create");
                    }}
                  />
                  <Button
                    text={view === "postEdit" ? "Update" : "Publish"}
                    type="submit"
                    className="primary"
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PostPage;
