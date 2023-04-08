import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  pictureData: {},
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePosts: (state, { payload }) => ({
      ...state,
      posts: payload,
    }),
    updatePicture: (state, { payload }) => {
      return { ...state, pictureData: payload };
    },
    updateLikes: (state, { payload }) => {
      return { ...state, posts: payload };
    },
  },
});