import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {challege2Text_7} from './challenge2text';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';
import {ChallengeContext} from '../../navigations/ChallengeContext';

export default function Challenge2_slice7({nextText, navigation}) {
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [btnAdd, setBtnAdd] = useState(false);
  const [countArgument, setCountArgument] = useState(0);
  const [argument, setArgument] = useState([]);
  const [indexEditRemove, setIndexEditRemove] = useState(0);
  const {challenge, setChallenge} = useContext(ChallengeContext);

  useEffect(() => {
    navigation.setParams({name: 'Argumentos', progress: 0.56});
  }, []);

  const addArgument = () => {
    setArgument([...argument, {argument: value}]);
    setShowModal(false);
    setCountArgument(countArgument + 1);
  };

  const showAddArgument = () => {
    setValue('');
    setShowModal(true);
    setBtnAdd(true);
  };

  const showEditArgument = (text, index) => {
    setIndexEditRemove(index);
    setValue(text);
    setShowModal(true);
    setBtnAdd(false);
  };

  const editArgument = () => {
    const temp = [...argument];
    const temp2 = temp.splice(indexEditRemove, 1, {argument: value});
    setArgument(temp);
    setShowModal(false);
  };

  const removeArgument = () => {
    const temp = [...argument];
    const temp2 = temp.splice(indexEditRemove, 1);
    setArgument(temp);
    setCountArgument(countArgument - 1);
    setShowModal(false);
  };

  const goNextText = () => {
    setChallenge({...challenge, argument});
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
        {countArgument > 0 && (
          <Button
            onPress={goNextText}
            title="Listo"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
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
            style={styles.input}
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
