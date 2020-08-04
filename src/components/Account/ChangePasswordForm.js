import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {size} from 'lodash';
import * as firebase from 'firebase';
import {reauthenticate} from '../../utils/api';

export default function ChangePasswordForm(props) {
  const {setShowModal, toastRef} = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValue());
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  const onSubmit = async () => {
    let isSetErrors = true;
    let errorsTemp = {};
    setErrors({});
    if (
      !formData.password ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      errorsTemp = {
        password: !formData.password
          ? 'La contraseña no puede estar vacía'
          : '',
        newPassword: !formData.newPassword
          ? 'La contraseña no puede estar vacía'
          : '',
        repeatNewPassword: !formData.repeatNewPassword
          ? 'La contraseña no puede estar vacía'
          : '',
      };
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      errorsTemp = {
        newPassword: 'La contraseña no son iguales',
        repeatNewPassword: 'La contraseña no no son iguales',
      };
    } else if (size(formData.newPassword) < 6) {
      errorsTemp = {
        newPassword: 'La contraseña tiene que ser mayor a 5 caracteres',
        repeatNewPassword: 'La contraseña tiene que ser mayor a 5 caracteres',
      };
    } else {
      setIsLoading(true);
      await reauthenticate(formData.password)
        .then(async () => {
          await firebase
            .auth()
            .currentUser.updatePassword(formData.newPassword)
            .then(() => {
              setIsLoading(false);
              setShowModal(false);
              isSetErrors = false;
              firebase.auth().signOut();
            })
            .catch(() => {
              errorsTemp = {
                other: 'Error al actualizar la contraseña',
              };
              setIsLoading(false);
            });
        })
        .catch(() => {
          errorsTemp = {
            password: 'La contraseña no es correcta',
          };
          setIsLoading(false);
        });
    }

    isSetErrors && setErrors(errorsTemp);
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        inputStyle={{color: '#3c3c3c'}}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: 'material-community',
          name: showPassword ? 'eye-outline' : 'eye-off-outline',
          color: '#C2DDC7',
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, 'password')}
        errorMessage={errors.password}
      />
      <Input
        placeholder="Nueva contraseña actual"
        containerStyle={styles.input}
        inputStyle={{color: '#3c3c3c'}}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: 'material-community',
          name: showPassword ? 'eye-outline' : 'eye-off-outline',
          color: '#C2DDC7',
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, 'newPassword')}
        errorMessage={errors.newPassword}
      />
      <Input
        placeholder="Repetir nueva contraseña actual"
        containerStyle={styles.input}
        inputStyle={{color: '#3c3c3c'}}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: 'material-community',
          name: showPassword ? 'eye-outline' : 'eye-off-outline',
          color: '#C2DDC7',
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, 'repeatNewPassword')}
        errorMessage={errors.repeatNewPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
      <Text>{errors.other}</Text>
    </View>
  );
}

function defaultValue() {
  return {
    password: '',
    newPassword: '',
    repeatNewPassword: '',
  };
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: '95%',
  },
  btn: {
    backgroundColor: '#196674',
  },
});
