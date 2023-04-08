// import firebase from "firebase/app";
// import "firebase/auth";
// import auth from '@react-native-firebase/auth';
import { auth, db } from "../../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import { authSlice } from './authReducer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
// import { async } from "@firebase/util";


export const authSignUpUser = ({ userName, userEmail, password, avatar }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, password);
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: avatar,
      });

      // const { uid, displayName, email, photoURL } = auth.currentUser;

      await AsyncStorage.setItem("auth_email", auth.currentUser.email);
      await AsyncStorage.setItem("auth_password", password);

      dispatch(
        authSlice.actions.updateUser({
          userId: auth.currentUser.uid,
          userName: auth.currentUser.displayName,
          userEmail: auth.currentUser.email,
          avatar: auth.currentUser.photoURL,
          stateChange: true,
        })
      );
    } catch (error) {
      return error.message;
    }
  };

  // ({ userEmail, password, userName }) =>
  //   async (dispatch, getState) => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, userEmail, password, userName);

  //     await updateProfile(auth.currentUser, {
  //       displayName: userName,
  //       photoURL: avatar,
  //     });
  //     // console.log(userName)
  //     // console.log(user)
  //     dispatch(
  //       authSlice.actions.updateUser({
  //         userId: auth.currentUser.uid,
  //         userName: auth.currentUser.displayName,
  //         userEmail: auth.currentUser.email,
  //         avatar: auth.currentUser.photoURL,
  //         // stateChange: true,
  //       }) 
  //       );
  //   } catch (error) {
  //     return error.message;
  //   }
  // };

export const authSignInUser = ({ userEmail, password }) =>
    async (dispatch) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );

      await AsyncStorage.setItem("auth_email", user.email);
      await AsyncStorage.setItem("auth_password", password);

      dispatch(
        authSlice.actions.updateUser({
          userId:  user.uid,
          userName: user.displayName,
          userEmail: user.email,
          avatar: user.photoURL,
          stateChange: true,
        })
      );

      return { user };
    } catch (error) {
      return error.message;
    }
  };

//   async (dispatch, getState) => {
//     try {
//         const { user } = await signInWithEmailAndPassword(auth, userEmail, password);
//         const { displayName, email, photoURL, uid } = user;
        
//         dispatch(
//             authSlice.actions.updateUser({
//                 userId: uid,
//                 userName: displayName,
//                 userEmail: email,
//                 avatar: photoURL,
//                 // stateChange: true,
//             })
//         );
//         return { user };
//     } catch (error) {
//       return error.message;
//     }
// };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.logoutUser());
   
  } catch (error) {
    return error.message;
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
try {
    const authEmail = await AsyncStorage.getItem("auth_email");
    const authPassword = await AsyncStorage.getItem("auth_password");

    const userData = { userEmail: authEmail, password: authPassword };

    if (userData.userEmail) {
      try {
        await dispatch(authLogin(userData));
       

      } catch (error) {
        Alert("Sorry, this user does not exist");
        return error.message;
      }
    }
  } catch (error) {
    return error.message;
  }
  //  dispatch(
  //         authSlice.actions.authStateChange({ stateChange: true })
  //       );
};


//   try {
//     await onAuthStateChanged(auth, (user) => {
//       console.log(user)
//       if (user) {
//         dispatch(
//           authSlice.actions.updateUser({
//             userId: user.uid,
//             userName: user.displayName,
//             userEmail: user.email,
//             avatar: user.photoURL,
//             // stateChange: true,
//           })
//         );
//         dispatch(
//           authSlice.actions.authStateChange({ stateChange: true })
//         );
//       }
//     });
//   } catch (error) {
//     return error.message;
//   }
// };