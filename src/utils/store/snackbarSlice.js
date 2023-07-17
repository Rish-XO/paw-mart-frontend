import { createSlice } from "@reduxjs/toolkit";

const snackSlice = createSlice({
    name: 'snackbar',
    initialState: {
        state: false,
        severity: "",
        position:{vertical:'',horizontal:''},
        message:''
    }
})