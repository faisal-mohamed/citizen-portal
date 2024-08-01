import React, { useMemo } from "react";
import { Col, Row } from "reactstrap";
import Dropzone from "react-dropzone";
import { uploadImage } from "../../assets/images";
import ImagePreview from "../../Components/ImagePreview";
import { useDispatch, useSelector } from "react-redux";
import { setUploadImages } from "../../store/reducers/commonSlice";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import { Warning } from "../../Utilities/helpers";

const DropZone = () => {
  const dispatch = useDispatch();

  const style = useMemo(
    () => ({
      cursor: "pointer",
    }),
    []
  );

  const {
    common: { uploadedImages },
  } = useSelector((state) => state);

  const { s3Urls } = uploadedImages;
  console.log("s3", s3Urls);

  function handleAcceptedFiles(acceptedFiles) {
    const updatedImages = cloneDeep(uploadedImages.s3Urls);

    if (!isEmpty(acceptedFiles)) {
      if (acceptedFiles.length + updatedImages.length > 10) {
        Warning("Maximum 10 files can be uploaded");
        return;
      }

      acceptedFiles.forEach((file) => {
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });

      const mergedArray = [
        ...updatedImages,
        ...acceptedFiles.filter(
          (secondItem) =>
            !updatedImages.some(
              (firstItem) => firstItem.path === secondItem.path
            )
        ),
      ];
      dispatch(
        setUploadImages(uploadedImages, {
          s3Urls: mergedArray,
        })
      );
    }
  }

  const removeImage = (selectedImage, type, e) => {
    e.stopPropagation();
    const updatedImages = cloneDeep(uploadedImages.s3Urls);
    const matchedIndex = updatedImages.findIndex(
      (img) => img.preview === selectedImage
    );
    console.log("matchIndex",matchedIndex)
    updatedImages.splice(matchedIndex, 1);
    dispatch(
      setUploadImages(uploadedImages, {
        s3Urls: updatedImages,
      })
    );
  };

  return (
    <React.Fragment>
      <Dropzone
        maxFiles={10}
        maxSize={10000000}
        accept={{
          "image/*": [".jpeg", ".png"],
          // "video/*": [".mp4", ".gif"],
        }}
        onDrop={(acceptedFiles) => {
          handleAcceptedFiles(acceptedFiles);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone dz-clickable">
            <div className="dz-message needsclick" {...getRootProps({ style })}>
              {isEmpty(s3Urls) ? (
                <div className="mb-3">
                  <img
                    style={{ height: "250px", width: "250px" }}
                    src={uploadImage}
                    alt="Upload"
                  />
                  <h4>Drop files here or click to upload.</h4>
                </div>
              ) : (
                <Row className="d-flex justify-content-center align-item-space-around">
                  {s3Urls.map((img) => (
                    <Col className="mt-2 col-auto d-flex align-items-center">
                      {img.type.includes("image/") ? (
                        <ImagePreview
                          name={img.name}
                          preview={img.preview}
                          height="150"
                          width="150"
                          className="mx-1 my-1"
                          closeBtn
                          onCloseClick={removeImage}
                        />
                      ) : (
                        <video
                          src={img.preview}
                          type={img.type}
                          controls
                          controlsList="nodownload"
                          muted
                          className="preview-video"
                          autoPlay
                          loop
                          width="150"
                          height="150"
                        />
                      )}
                    </Col>
                  ))}
                </Row>
              )}
            </div>
            <div className="fs-18 text-muted text-center mb-2">
              Minimum 1600px width recommended. Max 10MB each (20MB for videos)
            </div>
            <div className="fs-16 text-muted text-center mb-2 ">
              <em>
                (10 files are the maximum number of files you can drop here)
              </em>
            </div>
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      <Row className="d-flex justify-content-center">
        <ul className="drop-zone-list">
          <li className="d-flex gap-2 justify-content-center upload-requirement">
            <i className="ri-checkbox-circle-fill fs-17 align-middle text-success" />
            High-resolution images (png, jpg, gif)
          </li>
          <li className="d-flex gap-2 justify-content-center upload-requirement">
            <i className="ri-checkbox-circle-fill fs-17 align-middle text-success" />
            Animated gifs
          </li>
          <li className="d-flex gap-1 justify-content-center upload-requirement">
            <i className="ri-checkbox-circle-fill fs-17 align-middle text-success" />
            Only upload media you own the rights to
          </li>
          <li className="d-flex gap-2 justify-content-center upload-requirement">
            <i className="ri-checkbox-circle-fill fs-17 align-middle text-success" />
            Videos (mp4)
          </li>
        </ul>
      </Row>
    </React.Fragment>
  );
};

export default DropZone;
