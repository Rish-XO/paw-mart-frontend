import { createSlice } from "@reduxjs/toolkit";

// const storedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: false,
    role: null,
    isVerified: false,
    user_id: null,
  },
  reducers: {
    loginHandler(state, action) {
      const data = action.payload;
      console.log(data);
      state.isLoggedIn = true;
      state.role = data.role;
      state.user_id = data.id;
      state.isVerified = true;
      localStorage.setItem("token", data.token);
    },
    verifyHandler(state, action) {
      const data = action.payload;
      state.isVerified = data.status;
      state.role = data.role
      state.user_id = data.id;
      state.isLoggedIn = true;
    },

    logoutHandler(state) {
      console.log("logging out");
      state.isLoggedIn = false;
      state.role = null;
      state.isVerified = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginHandler, logoutHandler, verifyHandler } = authSlice.actions;
export default authSlice.reducer;
