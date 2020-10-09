import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {challengeText_3, textFeedback_3} from './challengeText';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';

export default function Challenge3({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [value, setValue] = useState('');
  const textIntro = challengeText_3.split('|');

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setShowNext(false);
  };

  const _keyboardDidHide = () => {
    setShowNext(true);
  };

  const showFeedback = () => {
    setShowModal(true);
    setShowNext(false);
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{textIntro}</Text>
        <TextInput
          multiline
          numberOfLines={4}
          editable
          onChangeText={(val) => setValue(val)}
          value={value}
          style={styles.input}
        />
      </View>
      <View style={globalStyles.viewBtns}>
        {showNext && (
          <Button
            onPress={showFeedback}
            title="siguiente"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        )}
      </View>
      <Modal
        isVisible={showModal}
        setIsVisible={setShowModal}
        backPrees={false}>
        <View style={globalStyles.modalFeedback}>
          <Image
            style={globalStyles.brain}
            source={require('../../assets/img/cerebrito/cerebro-rosado.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.textModal}>{textFeedback_3}</Text>
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
  textModal: {
    marginVertical: 10,
    textAlign: 'justify',
  },
});
