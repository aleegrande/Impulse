import React from 'react'
import {  YellowBox } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation/Navigation";
import "firebase/auth";

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])
export default function App() {  
  return (
    <PaperProvider>
      <NavigationContainer>
      <Navigation/>
      </NavigationContainer>
    </PaperProvider>
  )
}
