import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem('token')

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: !!storedToken,
    role: null,
    status: "",
  },
  reducers: {
    loginHandler(state, action) {
      const data = action.payload;
      console.log(data);
      state.isLoggedIn = true;
      state.role = data.role;
      localStorage.setItem("token", data.token);
    },
    logoutHandler(state) {
      console.log("logging out");
      state.isLoggedIn = false;
      state.role = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginHandler, logoutHandler } = authSlice.actions;
export default authSlice.reducer;
