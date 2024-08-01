import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginUser: {},
    userFirstLogin: false,
  },
  reducers: {
    setAuthData: {
      reducer: (state, action) => {
        state.loginUser = action.payload;
      },
      prepare: (filterData, changedData) => {
        return { payload: { ...filterData, ...changedData } };
      },
    },
    setUserFirstLogin: {
      reducer: (state, action) => {
        state.userFirstLogin = action.payload;
      },
    },
  },
});

export const { setAuthData, setUserFirstLogin } = authSlice.actions;

export default authSlice.reducer;
