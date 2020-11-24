import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {challege2Text_7} from './challenge2text';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';
import {ChallengeContext} from '../../contexts/ChallengeContext';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge2_slice7({
  previousText,
  nextText,
  navigation,
}) {
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [btnAdd, setBtnAdd] = useState(false);
  const [countArgument, setCountArgument] = useState(0);
  const [argument, setArgument] = useState([]);
  const [indexEditRemove, setIndexEditRemove] = useState(0);
  const [indexEdit, setIndexEdit] = useState(0);
  const [idArgument, setIdArgument] = useState(0);
  const [error, setError] = useState(false);
  const {challenge, setChallenge} = useContext(ChallengeContext);
  const [logs, setLogs] = useState([]);
  const [idLog, setIdLog] = useState('');

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
        setLogs(data[0].data);
        setIdLog(data[0].id);
      });
  }, []);

  useEffect(() => {
    navigation.setParams({name: 'Argumentos', progress: 0.56});
  }, []);

  useEffect(() => {
    storeData('@page_challenge_2', '7');
    getData();
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const value1 = await AsyncStorage.getItem('@challenge_2_slice7_data');

      if (value1 !== null) {
        const data = JSON.parse(value1);
        // console.log(data);
        setArgument(data[0]);
        setCountArgument(data[2]);
        if (data[0].length === 0) {
          setIdArgument(0);
        } else {
          setIdArgument(data[1]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const data = [argument, idArgument, countArgument];
    storeData('@challenge_2_slice7_data', JSON.stringify(data));
  }, [argument, idArgument, countArgument]);

  const addArgument = () => {
    if (value) {
      setError(false);
      setArgument([...argument, {argument: value, id: idArgument}]);
      setIdArgument(idArgument + 1);
      setShowModal(false);
      setCountArgument(countArgument + 1);
    } else {
      setError(true);
    }
  };

  const showAddArgument = () => {
    setValue('');
    setShowModal(true);
    setBtnAdd(true);
  };

  const showEditArgument = (text, index) => {
    setIndexEditRemove(argument[index].id);
    setIndexEdit(index);
    setValue(text);
    setShowModal(true);
    setBtnAdd(false);
  };

  const editArgument = () => {
    if (value) {
      setError(false);
      const temp = [...argument];
      const temp2 = temp.splice(indexEdit, 1, {
        argument: value,
        id: indexEditRemove,
      });
      setArgument(temp);
      setShowModal(false);
    } else {
      setError(true);
    }
  };

  const removeArgument = () => {
    const data = argument.filter((arg) => indexEditRemove !== arg.id);
    setArgument(data);
    setCountArgument(countArgument - 1);
    setShowModal(false);
  };

  const goNextText = () => {
    setChallenge({...challenge, argument});

    const payload = {
      challenge: [
        ...logs,
        {
          name: 'desafío 2',
          state: 'Iniciado',
          stage: 'Argumentos',
          time: Date.now(),
          context: 'Argumentos',
          action: argument,
        },
      ],
    };
    db.collection('new_logs').doc(idLog).update(payload);
    nextText();
  };

  return (
    <View style={globalStyles.viewBody}>
      <ScrollView style={styles.viewArgument}>
        <Text style={globalStyles.content}>{challege2Text_7}</Text>
        <Text style={globalStyles.content2}>Máximo 3 argumentos</Text>
        {countArgument < 3 && (
          <View style={styles.viewBtns}>
            <Button
              onPress={showAddArgument}
              title="Agregar"
              buttonStyle={globalStyles.btn}
              containerStyle={styles.btnContainer}
              titleStyle={globalStyles.btnText}
              icon={<Icon name="plus" size={15} color="#196674" icon />}
              iconRight
            />
          </View>
        )}
        {argument.map((item, index) => (
          <ListItem
            key={index}
            title={item.argument}
            rightIcon={{
              type: 'material-community',
              name: 'pencil',
              color: '#F2A922',
            }}
            containerStyle={styles.menuItem}
            onPress={() => showEditArgument(item.argument, index)}
            titleStyle={{color: '#3c3c3c'}}
          />
        ))}
      </ScrollView>
      <View style={globalStyles.viewBtns}>
        {countArgument > 0 && idLog !== '' && (
          <>
            <Button
              onPress={previousText}
              title="Anterior"
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
              icon={<Icon name="arrow-left" size={15} color="#196674" icon />}
            />
            <Button
              onPress={goNextText}
              title="Listo"
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
              icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
              iconRight
            />
          </>
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <View>
          <Text style={styles.txt}>Escribe tu argumento</Text>
          <TextInput
            multiline
            numberOfLines={4}
            editable
            onChangeText={(text) => setValue(text)}
            value={value}
            style={error ? styles.inputError : styles.input}
          />
          <View style={styles.viewBtn}>
            {btnAdd ? (
              <Button
                onPress={addArgument}
                title="Agregar"
                buttonStyle={globalStyles.btn}
                containerStyle={globalStyles.btnContainer}
                titleStyle={globalStyles.btnText}
              />
            ) : (
              <View style={styles.viewBtns}>
                <Button
                  onPress={editArgument}
                  title="Editar"
                  buttonStyle={styles.btnEdit}
                  containerStyle={globalStyles.btnContainer}
                  titleStyle={styles.btnText}
                  icon={<Icon name="pencil" size={15} color="#fff" icon />}
                  iconRight
                />
                <Button
                  onPress={removeArgument}
                  title="Borrar"
                  buttonStyle={styles.btn}
                  containerStyle={globalStyles.btnContainer}
                  titleStyle={styles.btnText}
                  icon={<Icon name="trash" size={15} color="#fff" icon />}
                  iconRight
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: 10,
    width: 150,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
  },
  inputError: {
    backgroundColor: '#fff',
    borderColor: '#ff4b4b',
    borderWidth: 2,
  },
  txt: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
  viewBtn: {
    alignItems: 'center',
  },
  viewArgument: {
    padding: 20,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#c3c3c3',
    borderRadius: 10,
    marginBottom: 10,
  },
  btn: {
    borderRadius: 10,
    backgroundColor: '#ff4b4b',
    paddingVertical: 10,
  },
  btnEdit: {
    borderRadius: 10,
    backgroundColor: '#1cb0f6',
    paddingVertical: 10,
  },
  btnText: {
    color: '#fff',
    marginHorizontal: 10,
  },
  viewBtns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
