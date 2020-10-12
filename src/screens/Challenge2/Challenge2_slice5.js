import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {challege2Text_5, challege2Text_5_1} from './challenge2text';
import globalStyles from '../../styles/global';
import Modal from '../../components/Modal';
import {ChallengeContext} from '../../navigations/ChallengeContext';

export default function Challenge2_slice5({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [countURL, setCountURL] = useState(0);
  const [value, setValue] = useState('');
  const [btnAdd, setBtnAdd] = useState(false);
  const [urls, setUrls] = useState([]);
  const [indexEditRemove, setIndexEditRemove] = useState(0);
  const [indexEdit, setIndexEdit] = useState(0)
  const [idURl, setIdURl] = useState(0)
  const [error, setError] = useState(false)
  const {challenge, setChallenge} = useContext(ChallengeContext);

  

  const addURL = () => {
    if(value){
      setUrls([...urls, {url: value, id:idURl}]);
      setShowModal(false);
      setCountURL(countURL + 1);
      setIdURl(idURl+1)
      setError(false)
    }else{
      setError(true)
    }
  };

  const showAddURL = () => {
    setValue('');
    setShowModal(true);
    setBtnAdd(true);
  };

  const showEditURL = (text, index) => {
    setIndexEditRemove(urls[index].id);
    setIndexEdit(index)
    setValue(text);
    setShowModal(true);
    setBtnAdd(false);
  };

  const editURL = () => {
    if(value){
      setError(false)
      const temp = [...urls];
      const temp2 = temp.splice(indexEdit, 1, {url: value, id:indexEditRemove});
      setUrls(temp);
      setShowModal(false);
    }else{
      setError(true)
    }
  };

  const removeURL = () => {
    const data = urls.filter( url => indexEditRemove !== url.id)
    setUrls(data)
    setCountURL(countURL - 1);
    setShowModal(false)
  };

  const goNextText = () => {
    setChallenge({...challenge, selectionURL: urls});
    nextText();
  };


  return (
    <View style={globalStyles.viewBody}>
      <ScrollView style={styles.viewURLs}>
        <Text style={globalStyles.content}>{challege2Text_5}</Text>
        <Text style={globalStyles.content2}>{challege2Text_5_1}</Text>
        {countURL < 3 && (
          <View style={styles.viewBtns}>
            <Button
              onPress={showAddURL}
              title="Agregar"
              buttonStyle={globalStyles.btn}
              containerStyle={styles.btnContainer}
              titleStyle={globalStyles.btnText}
              icon={<Icon name="plus" size={15} color="#196674" icon />}
              iconRight
            />
          </View>
        )}
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
      {countURL > 0 && (
        <>
          {/* <Text style={globalStyles.content}>🎉 ¡Excelente trabajo! 🎉</Text> */}
          <View style={globalStyles.viewBtns}>
            <Button
              onPress={goNextText}
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
            style={error ? styles.inputError : styles.input}
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
              <View style={styles.viewBtns}>
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
                  onPress={removeURL}
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
  btn: {
    borderRadius: 10,
    backgroundColor: '#ff4b4b',
    paddingVertical: 10,
  },
  btnContainer: {
    marginVertical: 10,
    width: 150,
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
    padding: 20,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#c3c3c3',
    borderRadius: 10,
    marginBottom: 10,
  },
  viewBtns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
