import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    currentRoom: null,
  },
  reducers: {
    setMessages(state, action) {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { setMessages } = chatSlice.actions;
export default chatSlice.reducer;


// rn u r not using , remove the cmt when u use it