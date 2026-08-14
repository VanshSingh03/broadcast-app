import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  list: [
    { id: "instagram", name: "Instagram", color: "#C23B72", limit: 2200 },
    { id: "linkedin", name: "LinkedIn", color: "#2563A6", limit: 3000 },
    { id: "twitter", name: "X (Twitter)", color: "#14171F", limit: 280 },
  ],
};

const platformSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {
    addPlatform: {
      reducer: (state, action) => {
        state.list.push(action.payload);
      },
      prepare: ({ name, color, limit }) => ({
        payload: {
          id: nanoid(6),
          name: name.trim(),
          color: color || "#4F46E5",
          limit: Number(limit) > 0 ? Number(limit) : 500,
        },
      }),
    },
    removePlatform: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addPlatform, removePlatform } = platformSlice.actions;
export default platformSlice.reducer;
