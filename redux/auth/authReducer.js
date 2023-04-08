import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: null,
    userEmail: null,
    userId: null,
    avatar: null,
    stateChange: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateUser: (state, action) => ({
            ...state,
            userId: action.payload.userId,
            userName: action.payload.userName,
            userEmail: action.payload.userEmail,
            avatar: action.payload.avatar,
            stateChange: action.payload.stateChange,
        }),
    //      updateUser: (state, { payload }) => {
    //   const { userId, userName, userEmail, avatar, stateChange} = payload;
    //   return { ...state, userId, userName, userEmail, avatar, stateChange};
    // },
        logoutUser: () => initialState,
        authStateChange: (state, action) => ({ ...state, stateChange: action.payload.stateChange }),
    }
    
});
