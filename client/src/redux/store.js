import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contentReducer from "./content/contentSlice";
import userReducer from "./user/userSlice";
import bookmarkReducer from "./bookmark/bookmarkSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// combining all the imported reducers
const rootReducer = combineReducers({
  content: contentReducer,
  user: userReducer,
  bookmarks: bookmarkReducer,
});

// creating persistConfig object
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// exporting store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// exporting persistor
export const persistor = persistStore(store);
