import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  comments: [],
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
    updateComments: (state, { payload }) => ({
      ...state,
      comments: payload,
    }),
    updateCountComments: (state, { payload }) => {
      const { id, comments } = payload;
      const updatedPosts = state.posts.posts.map((post) => {
        if (post.idPost === id) {
          return { ...post, comments };
        }
        return post;
      });
      return { ...state, posts: updatedPosts };
    },
  },
});