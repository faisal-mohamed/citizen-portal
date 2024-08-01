import React from "react";
import { isEmpty, values } from "lodash";
import ImagePreview from "../../Components/ImagePreview";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUploadImages } from "../../store/reducers/commonSlice";
import Label from "reactstrap/lib/Label";
import "./uploadScreen.scss";
import { createFileUrl } from "../../Utilities/helpers";

const ImageList = ({ isEdit, alertSetState, validation }) => {
  const {
    common: { uploadedImages },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const getListStyle = (isDraggingOver, style) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  });

  const handleDragEnd = (result, type) => {
    const { s3Urls } = uploadedImages;

    let updatedImages = [...s3Urls];

    const handleDrag = () => {
      if (!result.destination) return;
      const [removed] = updatedImages.splice(result.source.index, 1);
      updatedImages.splice(result.destination.index, 0, removed);
    };

    const handleRemove = () => {
      const thumnailImage = validation.values.thumbnailUrl?.preview
        ? validation.values.thumbnailUrl?.preview
        : validation.values.thumbnailUrl;
      if (thumnailImage === result) {
        alertSetState({
          show: true,
          color: "warning",
          message:
            "The selected image is choosen as the thumbnail. Please select another image and try again!",
        });
        return;
      }
      updatedImages = updatedImages.filter((img) => {
        const preview = img?.preview || img;
        return preview !== result;
      });
    };

    const handleOther = () => {
      const filesUrl = createFileUrl(values(result));
      const filteredImages = filesUrl.filter(
        (second) => !updatedImages.some((first) => first?.name === second.name)
      );
      updatedImages.push(...filteredImages);
    };

    switch (type) {
      case "drag":
        handleDrag();
        break;
      case "remove":
        handleRemove();
        break;
      default:
        handleOther();
        break;
    }

    dispatch(setUploadImages(uploadedImages, { s3Urls: updatedImages }));
  };

  const selectThumbnail = (item) => {
    validation.setFieldValue("thumbnailUrl", item);
  };
  return (
    <React.Fragment>
      <div className="d-flex flex-row justify-content-between">
        <Label className="mb-2">
          Design Gallery Customization:{" "}
          <span className="text-muted">
            Rearrange Image Order for Your Stunning Showcase
          </span>
        </Label>
        {isEdit && (
          <div className="upload">
            <label class="upload__btn">
              <p className="m-0">Upload images</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="upload__inputfile"
                onChange={(e) => handleDragEnd(e.target.files, "upload")}
              />
            </label>
          </div>
        )}
      </div>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result, "drag")}>
        <Droppable droppableId="droppble" direction="horizontal">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {!isEmpty(uploadedImages.s3Urls) &&
                uploadedImages.s3Urls.map((item, index) => (
                  <Draggable
                    key={item?.name || `${item}-index`}
                    draggableId={item.name || `${item}-index`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ImagePreview
                          name={index}
                          preview={item?.preview || item}
                          height={"150px"}
                          width={"150px"}
                          className="mx-1 my-1"
                          closeBtn
                          closeBtnClass
                          onCloseClick={handleDragEnd}
                          onClick={() => selectThumbnail(item)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </React.Fragment>
  );
};

export default ImageList;
