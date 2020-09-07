import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {textIntro_2, textFeedback} from './text_Intro_1';
import Modal from '../../components/Modal';

export default function Introduction_2({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [showSiguiente, setShowSiguiente] = useState(false);

  const goChallenge = () => {
    navigation.navigate('introduction_3');
  };

  const resp = () => {
    setShowModal(true);
    setShowSiguiente(true);
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.content}>{textIntro_2}</Text>
      </View>
      <View style={styles.viewBtns}>
        {!showSiguiente ? (
          <>
            <Button
              onPress={resp}
              title="Si"
              icon={<Icon name="thumbs-o-up" size={15} color="#196674" />}
              buttonStyle={styles.btn}
              containerStyle={styles.btnContainer}
              titleStyle={styles.btnText}
            />

            <Button
              onPress={resp}
              title="No"
              buttonStyle={styles.btn}
              containerStyle={styles.btnContainer}
              titleStyle={styles.btnText}
              icon={
                <Icon name="thumbs-o-down" size={15} color="#196674" icon />
              }
              iconRight
            />
          </>
        ) : (
          <Button
            onPress={goChallenge}
            title="Siguiente"
            buttonStyle={styles.btn}
            containerStyle={styles.btnContainer}
            titleStyle={styles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        )}
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
    fontSize: 22,
    textAlign: 'center',
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
