import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import firebase from "../utils/Firebase";
import "firebase/auth";

export default function Home() {
    const [user, setUser] = useState(undefined)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((response) => {
            setUser(response);
        });
    }, []);
    if (user === undefined) return null;
    return (
        <View>
            <Text>Estamos en Home</Text>
            {user ? <Logout></Logout> : <Text>No estas logueado</Text>}
        </View>
    )
}
function Logout() {
    const logout = () => {
        firebase.auth().signOut();
    }
    return (
        <View>
            <Text>Estas logueado</Text>
            <TouchableOpacity onPress={logout}><Text>Cerrar sesión</Text></TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({})
