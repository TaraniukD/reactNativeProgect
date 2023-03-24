import React from 'react';
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useRoute } from './router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

export default function App() {
  const routing = useRoute(true)

  const [fontsLoaded] = useFonts({
    RobotoReg: require("./assets/Fonts/Roboto/Roboto-Regular.ttf"),
    RobotoMed: require("./assets/Fonts/Roboto/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/Fonts/Roboto/Roboto-Bold.ttf"),
  });

   if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something wetn wrong. Please reload the page!</Text>
      </View>
    );
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <NavigationContainer >{routing}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
