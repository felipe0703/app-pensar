import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {validateEmail} from '../../utils/validations';
import {firebaseApp} from '../../utils/firebase';

export default function LoginFrom(props) {
  const {changeForm} = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  const login = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {})
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
        });
    }
    setFormError(errors);
  };

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

  return (
    <View style={styles.viewBody}>
      <View>
        <TextInput
          style={[styles.input, formError.email && styles.error]}
          placeholder="Correo electrónico"
          placeholderTextColor="#777"
          onChange={(e) => onChange(e, 'email')}
        />
        <TextInput
          style={[styles.input, formError.password && styles.error]}
          placeholder="Contraseña"
          placeholderTextColor="#777"
          secureTextEntry={true}
          onChange={(e) => onChange(e, 'password')}
        />
        <TouchableOpacity onPress={login}>
          <Text style={styles.btnText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.register}>
        <Text style={styles.text}>¿Aún no tienes una cuenta?</Text>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function defaultValue() {
  return {
    email: '',
    password: '',
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
    backgroundColor: '#fff',
    borderRadius: 50,
    color: '#3c3c3c',
    fontSize: 18,
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 20,
    width: 250,
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
