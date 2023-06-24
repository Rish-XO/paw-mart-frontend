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
        logoutHandler(state, action) {
            console.log('logging out');
            state.isLoggedIn = false;
            state.role = null;
            localStorage.removeItem('token')
        }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;