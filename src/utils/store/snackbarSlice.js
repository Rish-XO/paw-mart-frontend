import { createSlice } from "@reduxjs/toolkit";

const snackSlice = createSlice({
  name: "snackbar",
  initialState: {
    state: false,
    severity: "",
    position: { vertical: "", horizontal: "" },
    message: "",
  },
  reducers: {
    snackBarDetailsAdder(state, action) {
      state.state = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      state.position = action.payload.position;
    },
    changeState(state) {
      state.state = false;
    },
  },
});
export const snackActions = snackSlice.actions;
export default snackSlice.reducer;
