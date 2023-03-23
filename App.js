import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from './router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

export default function App() {

  const routing = useRoute(false)

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
