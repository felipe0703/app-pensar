import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/global';
import {challege2Text_11, textFeedback_11} from './challenge2text';
import Modal from '../../components/Modal';

export default function Challenge2_slice11({nextText}) {
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 3000);
  }, []);

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challege2Text_11}</Text>
        <TextInput
          multiline
          numberOfLines={4}
          editable
          onChange={(text) => setValue(text)}
          value={value}
          style={styles.input}
        />
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={nextText}
          title="Listo"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
          icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
          iconRight
        />
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <Text style={styles.textFeedback}>{textFeedback_11}</Text>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 30,
    width: 300,
  },
  textFeedback: {
    marginVertical: 10,
  },
});
