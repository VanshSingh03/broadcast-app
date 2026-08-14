import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "./postsSlice";
import platformReducer from "./platformSlice";
import { loadState, saveState } from "./utils/storage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    platforms: platformReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState({ posts: state.posts, platforms: state.platforms });
});
