import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreens from './assets/Screens/auth/RegistrationScreens/RegistrationScreens';
import LoginScreens from './assets/Screens/auth/LoginScreens/LoginScreens';
import { CreatePosts } from './assets/Screens/mainScreen/CreatePostsScreen/CreatePosts';
import CommentsScreen from './assets/Screens/mainScreen/CommentsScreen/CommentsScreen';
import PostScreen from './assets/Screens/mainScreen/PostsScreen/PostsScreen';
import ProfileScreen from './assets/Screens/mainScreen/ProfileScreen/ProfileScreen';

import { AntDesign } from '@expo/vector-icons'; 

const AuthStack = createStackNavigator(); 
const Tabs = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
            <AuthStack.Screen name="Registration" component={RegistrationScreens} options={{headerShown: false}}/>
            <AuthStack.Screen name="Login" component={LoginScreens} options={{ headerShown: false }} /> 
      </AuthStack.Navigator>
    )
  }

  return (
    <Tabs.Navigator>
        <Tabs.Screen options={{
              tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="pluscircleo" size={24} color={color} />
              )}}
              name="Створити публікацію"
              component={CreatePosts} />
        <Tabs.Screen name="Коментарі" component={CommentsScreen} />
        <Tabs.Screen name="Публікації" component={PostScreen} />
          <Tabs.Screen options={{
              tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="user" size={24} color={color} />
        ), headerShown: false }} name="Профіль" component={ProfileScreen} />
      </Tabs.Navigator>
  )
}