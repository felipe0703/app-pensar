import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-elements';
import {firebaseApp} from '../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import Carousel from '../components/Carousel';
import Modal from '../components/Modal';
import {home_consent} from './HomeText';
import globalStyles from '../styles/global';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Home(props) {
  const {navigation} = props;
  const [showModal, setShowModal] = useState(false);
  const [idConsent, setIdConsent] = useState('');
  const [createUsers, setCreateUsers] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [valueName, setValueName] = useState('');
  const [valueCareer, setValueCareer] = useState('');
  const [gender, setGender] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorCareer, setErrorCareer] = useState(false);
  const [errorGender, setErrorGender] = useState(false);
  const [logs, setLogs] = useState([]);
  const [idLog, setIdLog] = useState('');

  // actualiza la información del usuario
  useEffect(() => {
    db.collection('users')
      .where('idUser', '==', firebaseApp.auth().currentUser.uid)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        });
        console.log('gender', data[0].data.gender);
        if (data.length === 0) {
          createLogUser(); // creo el usuario si es que no existe
        } else if (!data[0].data.consent || data[0].data.career === undefined) {
          setIdConsent(data[0].id);
          setShowModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [createUsers]);

  // recupero el id del registro del usuario actual
  useEffect(() => {
    db.collection('new_logs')
      .where('idUser', '==', firebaseApp.auth().currentUser.uid)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data().challenge,
          };
        });

        if (data.length === 0) {
          createLog();
        } else {
          setLogs(data[0].data);
          setIdLog(data[0].id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [valueName]);

  const createLogUser = () => {
    const payload = {
      idUser: firebaseApp.auth().currentUser.uid,
      consent: false,
    };

    db.collection('users')
      .add(payload)
      .then(() => {
        console.log('consentimiento subido');
        setCreateUsers(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createLog = () => {
    const payload = {
      idUser: firebaseApp.auth().currentUser.uid,
      nameUser: firebaseApp.auth().currentUser.displayName,
      challenge: [
        {
          name: '',
          state: '',
          stage: '',
          time: Date.now(),
          context: 'Creación de log usuario',
          action: 'creación log',
        },
      ],
    };

    db.collection('new_logs')
      .add(payload)
      .then(() => {
        console.log('data subida');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getConsent = () => {
    // actualizar información usuario
    const payload = {
      idUser: firebaseApp.auth().currentUser.uid,
      consent: true,
      name: valueName,
      gender: gender,
      career: valueCareer,
      email: firebaseApp.auth().currentUser.email,
    };
    db.collection('users').doc(idConsent).update(payload);

    // actualizo el nombre en el profile de firebase
    const update = {
      displayName: valueName,
    };
    firebaseApp
      .auth()
      .currentUser.updateProfile(update)
      .then(() => {
        console.log('actuializado el nomnbre');
      })
      .catch(() => {
        console.log('error al actualizar el nombre');
      });

    // subo el log
    const payload2 = {
      nameUser: valueName,
      challenge: [
        ...logs,
        {
          name: '',
          state: '',
          stage: '',
          time: Date.now(),
          context: 'Solicitud de consentimiento',
          action: 'Acepto',
        },
      ],
    };
    db.collection('new_logs').doc(idLog).update(payload2);

    setShowModal(false);
  };

  const validateInfo = () => {
    if (valueName === '') {
      setErrorName(true);
    } else if (valueCareer === '') {
      setErrorCareer(true);
      setErrorName(false);
    } else if (gender === '') {
      setErrorCareer(false);
      setErrorGender(true);
    } else {
      setErrorCareer(false);
      setErrorName(false);
      setErrorGender(false);
      setShowConsent(true);
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     const resultChallenges = [];

  //     db.collection('challenges')
  //       .orderBy('order', 'desc')
  //       .get()
  //       .then((response) => {
  //         response.forEach((doc) => {
  //           const challenge = doc.data();
  //           challenge.id = doc.id;
  //           // challenge.status && resultChallenges.push(challenge);
  //           resultChallenges.push(challenge);
  //         });
  //         setChallenges(resultChallenges);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []),
  // );

  return (
    <View style={styles.viewBody}>
      <Text style={styles.title}>Elige tu desafío</Text>
      <Carousel navigation={navigation} />
      <Modal
        isVisible={showModal}
        setIsVisible={setShowModal}
        backPrees={false}>
        <View style={globalStyles.modalFeedback}>
          {showConsent ? (
            <View style={styles.viewConset}>
              <Text style={{marginVertical: 10, textAlign: 'justify'}}>
                {home_consent}
              </Text>
              <Button
                onPress={getConsent}
                title="Aceptar"
                buttonStyle={globalStyles.btn}
                containerStyle={globalStyles.btnContainer}
                titleStyle={globalStyles.btnText}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.titleInformation}>Información personal</Text>
              <Text style={styles.question}>¿Cuál es tu nombre?</Text>
              <TextInput
                onChangeText={(val) => setValueName(val)}
                style={errorName ? styles.inputError : styles.input}
                value={valueName}
              />
              <Text style={styles.question}>¿Qué carrera cursas?</Text>
              <TextInput
                onChangeText={(val) => setValueCareer(val)}
                style={errorCareer ? styles.inputError : styles.input}
                value={valueCareer}
              />
              <Text style={styles.question}>¿Cuál es tu género?</Text>
              <Picker
                selectedValue={gender}
                style={errorGender ? styles.pickerError : styles.picker}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                <Picker.Item label="Seleccionar" value="" />
                <Picker.Item label="Hombre" value="hombre" />
                <Picker.Item label="Mujer" value="mujer" />
                <Picker.Item label="Otro" value="otro" />
              </Picker>
              <Button
                onPress={validateInfo}
                title="Continuar"
                buttonStyle={globalStyles.btn}
                containerStyle={[globalStyles.btnContainer, styles.btn]}
                titleStyle={globalStyles.btnText}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    width: 300,
  },
  inputError: {
    backgroundColor: '#fff',
    borderColor: '#ff4b4b',
    borderWidth: 2,
    width: 300,
  },
  picker: {
    height: 50,
    width: 300,
    alignSelf: 'center',
    color: '#000',
  },
  pickerError: {
    height: 50,
    width: 300,
    alignSelf: 'center',
    color: '#ff4b4b',
  },
  question: {
    fontSize: 16,
    marginVertical: 10,
  },
  title: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'DINRoundPro',
    textAlign: 'center',
  },
  titleInformation: {
    marginVertical: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  viewBody: {
    flex: 1,
  },
  viewConset: {
    alignItems: 'center',
  },
});
