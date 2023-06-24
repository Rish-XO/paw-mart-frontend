import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./authSlice";

const store = configureStore({
  reducer: { authHandler: authSlice },
});

export default store;
