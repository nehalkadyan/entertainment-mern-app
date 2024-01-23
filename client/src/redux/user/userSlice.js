import { createSlice } from "@reduxjs/toolkit";

// creating initial state
const initialState = {
  currentUser: null,
};

// creating slice for user
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // first user slice action
    signInSuccessful: (state, action) => {
      state.currentUser = action.payload;
      state.bookmarks = action.payload.bookmarks;
    },
    // second user slice action
    logoutSuccessful: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInSuccessful, logoutSuccessful, updateBookmarks } =
  userSlice.actions;
export default userSlice.reducer;
