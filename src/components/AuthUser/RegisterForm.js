import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import { validateNameLast, validateEmail, validatePassword, validatePhone } from "../../utils/Validations";
import firebase from "../../utils/Firebase";
import 'firebase/firestore';
import { GoogleSignin, GoogleSigninButton,} from '@react-native-community/google-signin';


firebase.firestore().settings({ experimentalForceLongPolling: true })
const db = firebase.firestore(firebase);
export default function RegisterForm(props) {
    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({})
    

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    const register = () => {
        let error = {};
        if (!formData.name || !validateNameLast(formData.name) || formData.name < 3) { console.log("nombre invalido"); console.log(formData.name); error.name = true; }
        else if (!formData.lastname || !validateNameLast(formData.lastname) || formData.lastname < 3) { console.log("apellido invalido"); console.log(formData.lastname); error.lastname = true; }
        else if (!formData.email || !validateEmail(formData.email)) { console.log("email invalido"); console.log(formData.email); error.email = true; }
        else if (!formData.password || !validatePassword(formData.password)) { console.log("password invalido"); console.log(formData.password); error.password = true; }
        else if (!formData.repeatPassword || !validatePassword(formData.repeatPassword) || formData.password !== formData.repeatPassword) { console.log("contraseñas invalidas"); console.log(formData.password); error.password = true; error.repeatPassword = true; }
        else if (!formData.phone || !validatePhone(formData.phone)) { console.log("telefono invalido"); console.log(formData.phone); error.phone = true; }
        else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    const data = {
                        name: formData.name,
                        lastname: formData.lastname,
                        email: formData.email,
                        phone: formData.phone,
                    }
                    console.log('usuario autenticado')
                    db.collection('usuarios')
                        .add(data)
                        .then(() => {
                            console.log('usuario agregado')
                        })
                        .catch(() => {
                            console.log('error')
                        });
                })
                .catch(() => {
                    console.log("usuario no creado");
                });
        }
    };

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '641113532603-j94vff86gujc0g4r0fcdjn0p4du469qa.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            //hostedDomain: '', // specifies a hosted domain restriction
            //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            //accountName: '', // [Android] specifies an account name on the device that should be used
            //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
    }, [])
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log({userInfo});
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo);
            // Sign-in the user with the credential
            return firebase.auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.log({ error });
        }
    };
    return (
        <View style={styles.body}>
            <Text style={styles.titulo}>Regístrate</Text>
            <View style={styles.container}>
                <TouchableOpacity >
                    <Text style={styles.buttonFacebook}>
                        <Image source={require('../../img/facebook.png')} style={styles.imageFacebook} />
                        <Text style={styles.textsocial}> Regístrate con Facebook</Text>
                    </Text>
                </TouchableOpacity>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn} />
            </View>
            <TextInput style={[styles.input, formError.name && styles.errorInput]} placeholderTextColor="#3E4040" placeholder="Nombre"
                onChange={(e) => onChange(e, "name")}></TextInput>
            <TextInput style={[styles.input, formError.lastname && styles.errorInput]} placeholderTextColor="#3E4040" placeholder="Apellido"
                onChange={(e) => onChange(e, "lastname")}></TextInput>
            <TextInput style={[styles.input, formError.email && styles.errorInput]} placeholderTextColor="#3E4040" placeholder="Correo Electrónico"
                onChange={(e) => onChange(e, "email")}></TextInput>
            <TextInput style={[styles.input, formError.password && styles.errorInput]} placeholderTextColor="#3E4040" placeholder="Contraseña" secureTextEntry={true}
                onChange={(e) => onChange(e, "password")}></TextInput>
            <TextInput style={[styles.input, formError.repeatPassword && styles.errorInput]} placeholderTextColor="#3E4040" placeholder="Confirmar contraseña" secureTextEntry={true}
                onChange={(e) => onChange(e, "repeatPassword")}></TextInput>
            <TextInput style={[styles.input, formError.phone && styles.errorInput]} keyboardType='numeric' placeholderTextColor="#3E4040" placeholder="Telefono"
                onChange={(e) => onChange(e, "phone")}></TextInput>
            <TouchableOpacity><Text style={styles.boton} onPress={register}>REGÍSTRAR</Text></TouchableOpacity>

            <TouchableOpacity><Text style={styles.textauth} onPress={changeForm}>Ya tengo una cuenta, inicia sesión.</Text></TouchableOpacity>
        </View>
    )
}

function defaultValue() {
    return (
        {
            name: '',
            lastname: '',
            email: '',
            password: '',
            repeatPassword: '',
            phone: '',
        }
    );
}
const styles = StyleSheet.create({
    imageFacebook: {
        width: 20,
        height: 25,
        borderRadius: 5,
    },
    imageGoogle: {
        width: 23,
        height: 23,
        borderRadius: 5,
    },
    textsocial:
    {
        color: '#000000',
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
    },
    buttonFacebook:
    {
        borderColor: '#4267B2',
        borderRadius: 5,
        borderWidth: 1.5,
        paddingBottom: 8,
        paddingHorizontal: 10,
        marginRight: 8,
    },
    buttonGoogle:
    {
        borderColor: '#ABABAB',
        borderRadius: 5,
        borderWidth: 1.5,
        paddingTop: 1,
        paddingBottom: 9,
        paddingHorizontal: 10,
    },
    boton:
    {
        backgroundColor: '#37AFD5',
        marginHorizontal: 150,
        textAlign: 'center',
        fontSize: 15,
        color: '#ffffff',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#219DC4',
    },
    textauth:
    {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 8,
        color: '#0087C1',
        fontWeight: '800',
    },
    body:
    {
        backgroundColor: '#FBFDFF',
        width: '100%',
        height: '100%',
    },

    titulo:
    {
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 15,
        paddingBottom: 10,
        fontWeight: '800',
        fontSize: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#BDBCBC',
    },
    input:
    {
        borderColor: '#BDBCBC',
        borderWidth: 2,
        fontSize: 15,
        marginHorizontal: 30,
        paddingLeft: 10,
        paddingVertical: 2,
        borderRadius: 5,
        marginBottom: 15,
        marginTop: 8,
    },
    errorInput:
    {
        borderColor: "#FB7C65",
    }
})

