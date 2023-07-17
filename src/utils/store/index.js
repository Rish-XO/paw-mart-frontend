import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import snackbarSlice from "./snackbarSlice";

const store = configureStore({
  reducer: { authHandler: authSlice, snackbarHandler: snackbarSlice}
});

export default store;
