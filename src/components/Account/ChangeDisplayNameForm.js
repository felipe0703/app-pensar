import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as firebase from 'firebase';
import {UserContext} from '../../contexts/UserContext';

export default function ChangeDisplayNameForm(props) {
  const {displayName, setShowModal, toastRef, setReloadUserInfo} = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {dataUser, setDataUser} = useContext(UserContext);

  const onSubmit = () => {
    setError(null);
    if (!newDisplayName) {
      setError('El nombre no puede estar vacío');
    } else if (displayName === newDisplayName) {
      setError('El nombre no puede ser igual al actual');
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setIsLoading(false);
          setShowModal(false);
          setReloadUserInfo(true);
          setDataUser({...dataUser, nameUser: newDisplayName});
          console.log('ok');
        })
        .catch(() => {
          setError('Error al actualizar el nombre');
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        inputStyle={{color: '#3c3c3c'}}
        rightIcon={{
          type: 'material-community',
          name: 'account-circle-outline',
          color: '#C2DDC7',
        }}
        defaultValue={displayName || ''}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
    color: 'red',
  },
  btnContainer: {
    marginTop: 20,
    width: '95%',
  },
  btn: {
    backgroundColor: '#196674',
  },
});
