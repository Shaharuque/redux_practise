import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    merged: [],
    error: ''
}

const mergedSlice=createSlice({
    name: 'merged',
    initialState,
    reducers: {
        mergedList: (state, action) => {
            //const tempProduct={...action.payload}
            state.merged=action.payload
        },
    },
})
// Action creators are generated for each case reducer function
export const { mergedList } = mergedSlice.actions
export const mergedDataReducer = mergedSlice.reducer; //sliceName.reducer