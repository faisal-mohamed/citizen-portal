import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postInfo: {
      title: "",
      description: "",
      thumbnailImage: "",
      postImages: [],
      createdDate: "",
      likesCount: 0,
      posterName: "",
      email: "",
      profileImage: "",
      postedById: "",
      likedId: "",
      savedId: "",
      followId: "",
      liked: false,
      followed: false,
      enquired: false,
    },
    postsData: [],
    loadPage: false,
  },
  reducers: {
    setPostInfo: {
      reducer: (state, action) => {
        state.postInfo = action.payload;
      },
      prepare: (filterData, changedData) => {
        return { payload: { ...filterData, ...changedData } };
      },
    },
    setLoadPage: {
      reducer: (state, action) => {
        state.loadPage = !state.loadPage;
      },
    },
    setPostsData: {
      reducer: (state, action) => {
        state.postsData = action.payload;
      },
      // prepare: (filterData, changedData) => {
      //   return { payload: { ...filterData, ...changedData } };
      // },
    },
  },
});

export const { setPostInfo, setLoadPage, setPostsData } = postSlice.actions;

export default postSlice.reducer;
