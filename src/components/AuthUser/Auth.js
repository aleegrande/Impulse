import React , {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";


export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const changeForm = ()=>
    {
        setIsLogin(!isLogin);
    }
    return (
        <View>
            {isLogin ?
            <LoginForm changeForm={changeForm} ></LoginForm>
            :
            <RegisterForm changeForm={changeForm}></RegisterForm> 
            }
        </View>
    )
}

const styles = StyleSheet.create({})
