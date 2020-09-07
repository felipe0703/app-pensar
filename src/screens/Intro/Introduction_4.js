import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {textIntro_4, textFeedback_4} from './text_Intro_1';
import Modal from '../../components/Modal';
import {usePages} from '../../hooks/usePages';

export default function Introduction_4({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [ready, setReady] = useState(false);
  const {state: page, nextText, backText} = usePages();
  const [checked_1, setChecked_1] = useState(false);
  const [checked_2, setChecked_2] = useState(false);
  const [checked_3, setChecked_3] = useState(false);
  const [checked_4, setChecked_4] = useState(false);
  const [checked_5, setChecked_5] = useState(false);
  const [checked_6, setChecked_6] = useState(false);

  const allText = textIntro_4.split('|');

  if (!showNext) {
    if (
      checked_1 ||
      checked_2 ||
      checked_3 ||
      checked_4 ||
      checked_5 ||
      checked_6
    ) {
      setShowNext(true);
    }
  } else if (
    !checked_1 &&
    !checked_2 &&
    !checked_3 &&
    !checked_4 &&
    !checked_5 &&
    !checked_6
  ) {
    setShowNext(false);
  }

  const resp = () => {
    setShowModal(true);
    nextText();
    setReady(true);
  };

  const goNext = () => {
    navigation.navigate('introduction_5');
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.content}>{allText[page]}</Text>
        {!ready && (
          <View style={styles.viewOptions}>
            <CheckBox
              title="Extrañas"
              // checkedIcon="dot-circle-o"
              // uncheckedIcon="circle-o"
              checked={checked_1}
              onPress={() => setChecked_1(!checked_1)}
            />
            <CheckBox
              title="Nuevas"
              checked={checked_2}
              onPress={() => setChecked_2(!checked_2)}
            />
            <CheckBox
              title="Graciosas"
              checked={checked_3}
              onPress={() => setChecked_3(!checked_3)}
            />
            <CheckBox
              title="Conmovedoras"
              checked={checked_4}
              onPress={() => setChecked_4(!checked_4)}
            />
            <CheckBox
              title="Visualmente impactantes"
              checked={checked_5}
              onPress={() => setChecked_5(!checked_5)}
            />
            <CheckBox
              title="Que se repiten"
              checked={checked_6}
              onPress={() => setChecked_6(!checked_6)}
            />
          </View>
        )}
      </View>
      <View style={styles.viewBtns}>
        {showNext && !ready && (
          <Button
            onPress={resp}
            title="Listo"
            icon={<Icon name="thumbs-o-up" size={15} color="#196674" />}
            buttonStyle={styles.btn}
            containerStyle={styles.btnContainer}
            titleStyle={styles.btnText}
          />
        )}
        {ready && (
          <Button
            onPress={goNext}
            title="Siguiente"
            icon={<Icon name="arrow-right" size={15} color="#196674" />}
            buttonStyle={styles.btn}
            containerStyle={styles.btnContainer}
            titleStyle={styles.btnText}
            iconRight
          />
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <Text style={styles.textFeedback}>{textFeedback_4}</Text>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  content: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  viewOptions: {
    marginTop: 15,
  },
  viewBtns: {
    flexDirection: 'row',
  },
  btn: {
    borderRadius: 10,
    backgroundColor: '#c2ddc7',
    paddingVertical: 10,
  },
  btnContainer: {
    width: 150,
    marginVertical: 30,
    marginHorizontal: 10,
  },
  btnText: {
    color: '#196674',
    marginHorizontal: 10,
  },
  textFeedback: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 16,
  },
});
