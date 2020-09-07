import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  challengeText_2,
  textFeedback_2_1,
  textFeedback_2_2,
  textFeedback_2_3,
  textFeedback_2_4,
} from './challengeText';
import Modal from '../../components/Modal';

export default function Challenge2({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [textFeedback, setTextFeedback] = useState('');

  const showInfo = (option) => {
    if (option === 1) {
      setTextFeedback(textFeedback_2_1);
    } else if (option === 2) {
      setTextFeedback(textFeedback_2_2);
    } else if (option === 3) {
      setTextFeedback(textFeedback_2_3);
    } else {
      setTextFeedback(textFeedback_2_4);
    }
    setShowModal(true);
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.content}>{challengeText_2}</Text>
        <View style={styles.viewOptions}>
          <TouchableOpacity
            onPress={() => showInfo(1)}
            style={styles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              1. <Text style={styles.textInfo}>Martin Luther King Jr.</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(2)}
            style={styles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              2. <Text style={styles.textInfo}>Simone de Beauvoir</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(3)}
            style={styles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              3. <Text style={styles.textInfo}>Elena Caffarena</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(4)}
            style={styles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              4. <Text style={styles.textInfo}>Camilo Henríquez</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewBtns}>
        <Button
          onPress={nextText}
          title="Siguiente"
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
          icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
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
    fontSize: 16,
    textAlign: 'center',
  },
  viewOptions: {
    marginLeft: 15,
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
