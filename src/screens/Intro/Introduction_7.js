import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';
import {
  textIntro_7_1,
  textIntro_7_1_1,
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
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{text_1}</Text>
        <Text style={globalStyles.content2}>{textIntro_7_1_1}</Text>
        <View style={styles.viewOptions}>
          <TouchableOpacity
            onPress={() => showInfo(1)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              1.
              <Text style={globalStyles.textInfo}>
                Selección de información
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(2)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              2. <Text style={globalStyles.textInfo}>Elaboración de tesis</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(3)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              3.
              <Text style={globalStyles.textInfo}>
                Desarrollo de argumentos
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(4)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              4.
              <Text style={globalStyles.textInfo}>
                Desarrollo de contraargumentos
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(5)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              5. <Text style={globalStyles.textInfo}>Conclusión</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(6)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              6.
              <Text style={globalStyles.textInfo}>
                Reconocimiento de sesgos cognitivos y heurísticas
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={globalStyles.content}>{text_2}</Text>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={goHome}
          title="Vamos"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
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
  viewOptions: {
    marginLeft: 35,
    marginTop: 15,
    marginBottom: 15,
  },
  textFeedback: {
    marginVertical: 10,
  },
});
