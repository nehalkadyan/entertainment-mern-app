import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contentData : null,
    showsData : null,
    loading : false,
    error : null
}

const contentSlice = createSlice({
     name : "content",
     initialState,
     reducers : {
         contentLoadingStart : (state) => {
            state.loading = true
         },
         contentLoadingSuccess : (state, action) => {
            state.contentData  = action.payload;
            state.loading = false
         },
         contentLoadingFailure : (state, action) => {
            state.error = action.payload;
            state.loading = false
         },
         showsLoadingSuccess : (state, action) => {
            state.showsData = action.payload
         }

     }
})

export const {contentLoadingStart, contentLoadingSuccess, contentLoadingFailure, showsLoadingSuccess} = contentSlice.actions
export default contentSlice.reducer