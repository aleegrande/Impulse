import React from 'react'
import { IconButton } from "react-native-paper";
import { StyleSheet } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import  Home from "../screens/Home";
import  Register from "../screens/Register";

const Stack= createStackNavigator();

export default function StackNavigation(props) {
    const {navigation}= props;
    const buttonLeft = () =>
    {
        return <IconButton icon="menu" onPress={() => navigation.openDrawer()} />;
    };

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="home"
            component={Home}
            options={{title:'Inicio', headerLeft: ()=> buttonLeft() }}
            />
            <Stack.Screen 
            name="register"
            component={Register}
            options={{title:'Iniciar sesión/ Registrate', headerLeft: ()=> buttonLeft()}}
            />
        </Stack.Navigator>
    );
}
const styles = StyleSheet.create({
    image: {
        width: 200, 
        height: 100, 
        margin: 5
    },
  });

