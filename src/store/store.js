import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./reducers/commonSlice";
import authSlice from "./reducers/authSlice";
import postSlice from "./reducers/postSlice";
import homeSlice from "./reducers/homeSlice";

const store = configureStore({
  reducer: {
    common: commonSlice,
    auth: authSlice,
    post: postSlice,
    home: homeSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
