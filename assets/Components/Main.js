import React, {useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '../../router';
import { useSelector, useDispatch } from "react-redux";
import { auth } from '../../firebase/config';
import { authStateChangeUser } from "../../redux/auth/authOperations";

// import { moduleName } from "react-native";



const Main = () => {
    // const [isLogedIn, setIsLogedIn] = useState(null)
    const { stateChange } = useSelector((state) => state.auth)
    const state = useSelector((state) => state.auth)
    
    const dispatch = useDispatch();

//   auth.onAuthStateChanged((isLogedIn) => setIsLogedIn(isLogedIn));

    const routing = useRoute(stateChange);

    console.log(stateChange)
    console.log(state)
    
    useEffect(() => {
        dispatch(authStateChangeUser())
    }, []);

    return (
    <NavigationContainer >{routing}
      <StatusBar style="auto" />
    </NavigationContainer>
    ) 
}

export default Main;