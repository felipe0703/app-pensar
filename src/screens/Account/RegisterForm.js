import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import Loading from '../../components/Loading';
import {validateEmail} from '../../utils/validations';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import {UserContext} from '../../contexts/UserContext';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function RegisterForm(props) {
  const {toastRef} = props;
  const {changeForm} = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const {dataUser, setDataUser} = useContext(UserContext);

  const register = () => {
    let errors = {};
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
      if (!formData.repeatPassword) errors.repeatPassword = true;
      toastRef.current.show('Todos los campos son obligatorio');
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
      toastRef.current.show('Correo inválido');
    } else if (formData.password !== formData.repeatPassword) {
      errors.password = true;
      errors.repeatPassword = true;
      toastRef.current.show('Las contraseñas no son iguales');
    } else if (formData.password.length < 6) {
      errors.password = true;
      errors.repeatPassword = true;
      toastRef.current.show('La contraseña debe tener al menos 6 caracteres');
    } else {
      setLoading(true);
      setDataUser({});
      // crea el usuario y logea
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          setLoading(false);
          const payload = {
            idUser: response.user.uid,
            consent: false,
          };
          db.collection('users')
            .add(payload)
            .then(() => {
              console.log('usuario registrado');
            })
            .catch((err) => {
              console.log(err);
            });

          const payload2 = {
            idUser: response.user.uid,
            nameUser: response.user.displayName,
            challenge: [
              {
                name: '',
                state: '',
                stage: '',
                time: Date.now(),
                context: 'Registro de usuario',
                action: 'registro',
              },
            ],
          };

          db.collection('new_logs')
            .add(payload2)
            .then(() => {
              console.log('data subida');
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          setFormError({
            email: true,
            password: true,
            repeatPassword: true,
          });
          setLoading(false);
          toastRef.current.show('Error en el registro');
        });
      // .then(() => {
      //   // const payload_old = {
      //   //   idUser: dataUser.idUser,
      //   //   nameUser: dataUser.nameUser,
      //   //   email: formData.email,
      //   //   challenge: '',
      //   //   time: Date.now(),
      //   //   context: 'Registro de usuario',
      //   //   action: 'registro',
      //   // };
      // })
    }

    setFormError(errors);
  };
  return (
    <View style={styles.viewBody}>
      <View>
        <TextInput
          style={[styles.input, formError.email && styles.error]}
          placeholder="Correo electrónico"
          placeholderTextColor="#777"
          onChange={(e) =>
            setFormData({...formData, email: e.nativeEvent.text})
          }
        />

        <TextInput
          style={[styles.input, formError.password && styles.error]}
          placeholder="Contraseña"
          placeholderTextColor="#777"
          secureTextEntry={true}
          onChange={(e) =>
            setFormData({...formData, password: e.nativeEvent.text})
          }
        />
        <TextInput
          style={[styles.input, formError.repeatPassword && styles.error]}
          placeholder="Repetir contraseña"
          placeholderTextColor="#777"
          secureTextEntry={true}
          onChange={(e) =>
            setFormData({...formData, repeatPassword: e.nativeEvent.text})
          }
        />
        <TouchableOpacity onPress={register}>
          <Text style={styles.btnText}>Registrate</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.register}>
        <Text style={styles.text}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
      <Loading isVisible={loading} text="Creando cuenta" />
    </View>
  );
}

function defaultValue() {
  return {
    email: '',
    password: '',
    repeatPassword: '',
  };
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: 250,
    color: '#3c3c3c',
    marginBottom: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
  },
  register: {
    marginBottom: 20,
    marginTop: 20,
  },
  error: {
    borderColor: '#ff4b4b',
  },
  text: {
    color: '#ffc800',
  },
});
