import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: { authHandler: authSlice , messageHandler : chatSlice}
});

export default store;
