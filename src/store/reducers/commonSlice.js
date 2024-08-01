import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    uploadedImages: {
      s3Urls: [],
      thumbnailUrl: "",
    },
    filtercategory: "",
    isOffcanvasOpen: false,
  },
  reducers: {
    setUploadImages: {
      reducer: (state, action) => {
        state.uploadedImages = action.payload;
      },
      prepare: (filterData, changedData) => {
        return { payload: { ...filterData, ...changedData } };
      },
    },
    setFilterCategory: {
      reducer: (state, action) => {
        state.filtercategory = action.payload;
      },
    },
    setOffCanvasOpen: {
      reducer:(state,action) => {
        state.isOffcanvasOpen = action.payload
      }
    }
  },
});

export const { setUploadImages, setFilterCategory,setOffCanvasOpen } = commonSlice.actions;

export default commonSlice.reducer;
