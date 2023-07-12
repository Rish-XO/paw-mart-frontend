import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages(state, action) {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { setMessages } = chatSlice.actions;
export default chatSlice.reducers;
