import { createSlice, nanoid } from "@reduxjs/toolkit";

const now = Date.now();

const initialState = {
  byId: {
    "seed-1": {
      id: "seed-1",
      content:
        "We just shipped a faster way to plan your week — check the new dashboard and tell us what you think.",
      platforms: ["linkedin", "twitter"],
      status: "published",
      scheduledAt: null,
      createdAt: now - 86400000 * 2,
      updatedAt: now - 86400000 * 2,
    },
    "seed-2": {
      id: "seed-2",
      content:
        "Behind the scenes of our latest product shoot — swipe through to see the full setup.",
      platforms: ["instagram"],
      status: "scheduled",
      scheduledAt: now + 86400000,
      createdAt: now - 3600000,
      updatedAt: now - 3600000,
    },
    "seed-3": {
      id: "seed-3",
      content: "Draft: quarterly recap post, still gathering the numbers before this goes out.",
      platforms: ["linkedin"],
      status: "draft",
      scheduledAt: null,
      createdAt: now - 1800000,
      updatedAt: now - 1800000,
    },
  },
  allIds: ["seed-3", "seed-2", "seed-1"],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        const post = action.payload;
        state.byId[post.id] = post;
        state.allIds.unshift(post.id);
      },
      prepare: ({ content, platforms, status, scheduledAt }) => {
        const ts = Date.now();
        return {
          payload: {
            id: nanoid(8),
            content,
            platforms,
            status,
            scheduledAt: scheduledAt || null,
            createdAt: ts,
            updatedAt: ts,
          },
        };
      },
    },
    updatePost: (state, action) => {
      const { id, changes } = action.payload;
      if (state.byId[id]) {
        state.byId[id] = { ...state.byId[id], ...changes, updatedAt: Date.now() };
      }
    },
    deletePost: (state, action) => {
      delete state.byId[action.payload];
      state.allIds = state.allIds.filter((id) => id !== action.payload);
    },
    duplicatePost: {
      reducer: (state, action) => {
        const post = action.payload;
        state.byId[post.id] = post;
        state.allIds.unshift(post.id);
      },
      prepare: (sourcePost) => {
        const ts = Date.now();
        return {
          payload: {
            id: nanoid(8),
            content: sourcePost.content,
            platforms: sourcePost.platforms,
            status: "draft",
            scheduledAt: null,
            createdAt: ts,
            updatedAt: ts,
          },
        };
      },
    },
  },
});

export const { addPost, updatePost, deletePost, duplicatePost } = postsSlice.actions;
export default postsSlice.reducer;
