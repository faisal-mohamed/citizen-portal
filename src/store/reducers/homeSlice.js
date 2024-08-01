import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    homePostData: [],
  },
  reducers: {
    setHomePostData: {
      reducer: (state, action) => {
        state.homePostData = action.payload;
      },
    },
  },
});

export const { setHomePostData } = homeSlice.actions;

export default homeSlice.reducer;
