import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {validateEmail} from '../../utils/Validations';
import firebase from '../../utils/Firebase';

export default function LoginForm(props) {
  const {changeForm} = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});
  const login = () => {
    let error = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) error.email = true;
      if (!formData.password) error.password = true;
    } else if (!validateEmail(formData.email)) {
      error.email = true;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log('bienvenido');
        })
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
        });
    }
    setFormError(error);
  };
  return (
    <View style={styles.body}>
      <Text style={styles.titulo}>Inicia Sesión</Text>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.buttonFacebook}>
            <Image
              source={require('../../img/facebook.png')}
              style={styles.imageFacebook}
            />
            <Text style={styles.textsocial}> Accede con Facebook</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonGoogle}>
            <Image
              source={require('../../img/google.png')}
              style={styles.imageGoogle}
            />
            <Text style={styles.textsocial}>Accede con Google</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, formError.email && styles.errorInput]}
        placeholder="Correo electrónico"
        placeholderTextColor="#757575"
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.nativeEvent.text,
          })
        }></TextInput>
      <TextInput
        style={[styles.input, formError.password && styles.errorInput]}
        placeholder="Contraseña"
        placeholderTextColor="#757575"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.nativeEvent.text,
          })
        }></TextInput>

      <TouchableOpacity>
        <Text style={styles.boton} onPress={login}>
          ENTRAR
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.textauth}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.textauth} onPress={changeForm}>
          ¿Aún no estas registrado? Registrate
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function defaultValue() {
  return {email: '', password: ''};
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
  textsocial: {
    color: '#000000',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 5,
  },
  buttonFacebook: {
    borderColor: '#4267B2',
    borderRadius: 5,
    borderWidth: 1.5,
    paddingBottom: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  buttonGoogle: {
    borderColor: '#ABABAB',
    borderRadius: 5,
    borderWidth: 1.5,
    paddingTop: 1,
    paddingBottom: 9,
    paddingHorizontal: 10,
  },
  boton: {
    backgroundColor: '#37AFD5',
    marginHorizontal: 150,
    marginTop: 10,
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
  textauth: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    color: '#0087C1',
    fontWeight: '800',
  },
  body: {
    backgroundColor: '#FBFDFF',
    width: '100%',
    height: '100%',
  },

  titulo: {
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 15,
    paddingBottom: 10,
    fontWeight: '800',
    fontSize: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBCBC',
  },
  input: {
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
  errorInput: {
    borderColor: '#FB7C65',
  },
});
