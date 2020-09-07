import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {challengeText_3, textFeedback_3} from './challengeText';
import Modal from '../../components/Modal';

export default function Challenge3({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const textIntro = challengeText_3.split('|');

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
      setShowNext(true);
    }, 2000);
  }, []);

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.content}>{textIntro}</Text>
      </View>
      <View style={styles.viewBtns}>
        {showNext && (
          <Button
            onPress={nextText}
            title="siguiente"
            buttonStyle={styles.btn}
            containerStyle={styles.btnContainer}
            titleStyle={styles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <Text style={styles.textModal}>{textFeedback_3}</Text>
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
  textModal: {
    marginVertical: 10,
    textAlign: 'justify',
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
});
