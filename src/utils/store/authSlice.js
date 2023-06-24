import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        isLoggedIn : false,
        role : null,
        status: ''
    },
    reducers: {
        loginHandler(state, action) {
            const data = action.payload
            console.log(data);
            state.isLoggedIn = true;
            state.role = data.role
            localStorage.setItem('token', data.token)
        },
        logoutHandler
    }
})