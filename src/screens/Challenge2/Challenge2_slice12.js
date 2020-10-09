import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/global';
import {challege2Text_12, textFeedback_12} from './challenge2text';
import Modal from '../../components/Modal';
import {ChallengeContext} from '../../navigations/ChallengeContext';

export default function Challenge2_slice12({nextText}) {
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showBtnNext, setShowBtnNext] = useState(true);
  const {challenge, setChallenge} = useContext(ChallengeContext);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 3000);
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setShowBtnNext(false);
  };

  const _keyboardDidHide = () => {
    setShowBtnNext(true);
  };

  const goNextText = () => {
    setChallenge({...challenge, slant: value});
    nextText();
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challege2Text_12}</Text>
        <TextInput
          multiline
          numberOfLines={4}
          editable
          onChangeText={(text) => setValue(text)}
          value={value}
          style={styles.input}
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
      <View style={globalStyles.viewBtns}>
        {showBtnNext && (
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
        <Text style={styles.textFeedback}>{textFeedback_12}</Text>
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
