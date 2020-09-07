import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from '../../components/Modal';
import {
  textIntro_7_1,
  textIntro_7_2,
  textFeedback_7_1,
  textFeedback_7_2,
  textFeedback_7_3,
  textFeedback_7_4,
  textFeedback_7_5,
  textFeedback_7_6,
} from './text_Intro_1';

export default function Introduction_3({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [textFeedback, setTextFeedback] = useState('');
  const text_1 = textIntro_7_1.split('|');
  const text_2 = textIntro_7_2.split('|');

  const goNext = () => {
    navigation.navigate('introduction_6');
  };

  const showInfo = (option) => {
    if (option === 1) {
      setTextFeedback(textFeedback_7_1);
    } else if (option === 2) {
      setTextFeedback(textFeedback_7_2);
    } else if (option === 3) {
      setTextFeedback(textFeedback_7_3);
    } else if (option === 4) {
      setTextFeedback(textFeedback_7_4);
    } else if (option === 5) {
      setTextFeedback(textFeedback_7_5);
    } else {
      setTextFeedback(textFeedback_7_6);
    }
    setShowModal(true);
  };
  const goHome = () => {
    navigation.navigate('home');
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.content}>{text_1}</Text>
        <View style={styles.viewOptions}>
          <TouchableOpacity
            onPress={() => showInfo(1)}
            style={styles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              1. <Text style={styles.textInfo}>Selección de información</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(2)}
            style={styles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              2. <Text style={styles.textInfo}>Elaboración de tesis</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(3)}
            style={styles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              3. <Text style={styles.textInfo}>Desarrollo de argumentos</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(4)}
            style={styles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              4.{' '}
              <Text style={styles.textInfo}>
                Desarrollo de contraargumentos
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(5)}
            style={styles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              5. <Text style={styles.textInfo}>Conclusión</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(6)}
            style={styles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              6.{' '}
              <Text style={styles.textInfo}>
                Reconocimiento de sesgos cognitivos y heurísticas
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.content}>{text_2}</Text>
      </View>
      <View style={styles.viewBtns}>
        <Button
          onPress={goHome}
          title="Vamos"
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
          // icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
          iconRight
        />
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <Text style={styles.textFeedback}>{textFeedback}</Text>
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
    fontSize: 18,
    textAlign: 'center',
  },
  viewOptions: {
    marginLeft: 35,
    marginVertical: 20,
  },
  touchable: {
    marginVertical: 10,
  },
  textInfo: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 16,
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
  },
});
