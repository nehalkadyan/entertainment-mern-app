import { createSlice } from "@reduxjs/toolkit";

// creating initial state
const initialState = {
  activeBookmark: false,
  bookmarkedMovies: [],
  bookmarkedShows: [],
};

// creating slice for bookmark
const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    // action
    toggleBookmark: (state, action) => {
      state.activeBookmark = !state.activeBookmark;
      const { item, type } = action.payload;
      const key = type === "show" ? "bookmarkedShows" : "bookmarkedMovies";

      if (state[key].some((bookmark) => bookmark.id === item.id)) {
        state[key] = state[key].filter((bookmark) => bookmark.id !== item.id);
      } else {
        state[key].push(item);
      }
    },
  },
});

export const { toggleBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
