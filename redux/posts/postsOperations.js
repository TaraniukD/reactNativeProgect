// import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

import { postsSlice } from "./postsSlice";

export const uploadPostToServer = (posts) => async (_, getState) => {
  const { userId } = getState().auth;

  try {
    await addDoc(collection(db, "posts"), {
      ...posts,
      userId: userId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = () => async (dispatch, getState) => {
  const { userId } = getState().auth;

  try {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const allPosts = [];
    querySnapshot.forEach((doc) =>
      allPosts.push({ ...doc.data(), idPost: doc.id })
    );

    dispatch(postsSlice.actions.updatePosts(allPosts));
    return allPosts;
  } catch (error) {
    console.log(error.message);
  }
};

export const changeLikes = (idPost) => async (dispatch, getState) => {
  try {
    const postRef = doc(db, "posts", idPost);
    const countLikes = (await getDoc(postRef)).data().likes;

    await updateDoc(postRef, {
      likes: countLikes + 1,
    });

    dispatch(postsSlice.actions.updateLikes());
  } catch (error) {
    console.log(error.message);
  }
};

export const addCommentToPost = (postId, comment) => async (_, getState) => {
  const { userId } = getState().auth;
  try {
    const commentRef = collection(db, "posts", postId, "comments");
    await addDoc(commentRef, {
      ...comment,
      userId: userId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getCommentsByPostId = (postId) => async (_, getState) => {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef);
    const commentsSnapshot = await getDocs(q);
    const comments = commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error.message);
  }
};