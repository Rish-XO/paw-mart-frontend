import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        isLoggedIn : false,
        role : null,
    },
    reducers: {
        loginHandler(state, action) 
    }
})