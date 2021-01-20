import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer, Switch, TouchableRipple, IconButton, Colors } from "react-native-paper";

export default function DrawerContent(props) {
    const { navigation } = props;
    const [active, setActive] = useState("home");
    const onChangeScreen = (screens) => {
        setActive(screens);
        navigation.navigate(screens);
    }
    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item icon="home" label="Inicio" active={active === "home"} onPress={() => onChangeScreen("home")} />
                <Drawer.Item icon="logout" label="Inicia sesión / Regístrate" active={active === "register"} onPress={() => onChangeScreen("register")} />
            </Drawer.Section>
            <Drawer.Section>
                <Image  source={require('../img/logoEvolutel.png')} style={styles.image} ></Image>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 200, 
        height: 100, 
        margin: 5
    },
  });