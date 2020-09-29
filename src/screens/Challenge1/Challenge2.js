import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  challengeText_2,
  challengeText_2_1,
  textFeedback_2_1,
  textFeedback_2_2,
  textFeedback_2_3,
  textFeedback_2_4,
} from './challengeText';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';

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
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challengeText_2}</Text>
        <Text style={globalStyles.content2}>{challengeText_2_1}</Text>
        <View style={styles.viewOptions}>
          <TouchableOpacity
            onPress={() => showInfo(1)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              1.{' '}
              <Text style={globalStyles.textInfo}>Martin Luther King Jr.</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(2)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              2. <Text style={globalStyles.textInfo}>Simone de Beauvoir</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(3)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              3. <Text style={globalStyles.textInfo}>Elena Caffarena</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(4)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              4. <Text style={globalStyles.textInfo}>Camilo Henríquez</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={nextText}
          title="Siguiente"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
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
  viewOptions: {
    marginLeft: 15,
    marginVertical: 20,
  },
  textFeedback: {
    marginVertical: 10,
  },
});
