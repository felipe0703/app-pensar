import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {challege2Text_5, challege2Text_5_1} from './challenge2text';
import globalStyles from '../../styles/global';
import Modal from '../../components/Modal';

export default function Challenge2_slice5({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [countURL, setCountURL] = useState(0);
  const [value, setValue] = useState('');
  const [btnAdd, setBtnAdd] = useState(false);
  const [urls, setUrls] = useState([]);
  const [indexEditRemove, setIndexEditRemove] = useState(0);

  const addURL = () => {
    setUrls([...urls, {url: value}]);
    setShowModal(false);
    setCountURL(countURL + 1);
  };

  const showAddURL = () => {
    setValue('');
    setShowModal(true);
    setBtnAdd(true);
  };

  const showEditURL = (text, index) => {
    setIndexEditRemove(index);
    setValue(text);
    setShowModal(true);
    setBtnAdd(false);
  };

  const editURL = () => {
    const temp = [...urls];
    const temp2 = temp.splice(indexEditRemove, 1, {url: value});
    setUrls(temp);
    setShowModal(false);
  };

  const removeURL = () => {
    const temp = [...urls];
    const temp2 = temp.splice(indexEditRemove, 1);
    setArgument(temp);
    setCountURL(countURL - 1);
    setShowModal(false);
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challege2Text_5}</Text>
        <Text style={globalStyles.content2}>{challege2Text_5_1}</Text>
        <ScrollView style={styles.viewURLs}>
          {urls.map((item, index) => (
            <ListItem
              key={index}
              title={item.url}
              rightIcon={{
                type: 'material-community',
                name: 'pencil',
                color: '#F2A922',
              }}
              containerStyle={styles.menuItem}
              onPress={() => showEditURL(item.url, index)}
              titleStyle={{color: '#3c3c3c'}}
            />
          ))}
        </ScrollView>
        {countURL < 3 && (
          <Button
            onPress={showAddURL}
            title="Agregar"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="plus" size={15} color="#196674" icon />}
            iconRight
          />
        )}
      </View>
      {countURL > 0 && (
        <>
          <Text style={globalStyles.content}>🎉 ¡Excelente trabajo! 🎉</Text>
          <View style={globalStyles.viewBtns}>
            <Button
              onPress={nextText}
              title="siguiente"
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
              icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
              iconRight
            />
          </View>
        </>
      )}

      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <View>
          <Text style={styles.txt}>Escribe la URL</Text>
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
                onPress={addURL}
                title="Agregar"
                buttonStyle={globalStyles.btn}
                containerStyle={globalStyles.btnContainer}
                titleStyle={globalStyles.btnText}
              />
            ) : (
              <View style={globalStyles.viewBtns}>
                <Button
                  onPress={editURL}
                  title="Editar"
                  buttonStyle={styles.btnEdit}
                  containerStyle={globalStyles.btnContainer}
                  titleStyle={styles.btnText}
                  icon={<Icon name="pencil" size={15} color="#fff" icon />}
                  iconRight
                />
                <Button
                  // onPress={removeArgument}
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
  viewBtn: {
    alignItems: 'center',
  },
  viewURLs: {
    marginTop: 10,
    width: 300,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#c3c3c3',
    borderRadius: 10,
    marginBottom: 10,
  },
});
