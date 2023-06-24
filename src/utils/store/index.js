import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { authHandler: authSlice },
});

export default store;
