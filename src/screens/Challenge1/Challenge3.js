import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {challengeText_3, textFeedback_3} from './challengeText';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';

export default function Challenge3({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const textIntro = challengeText_3.split('|');

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
      setShowNext(true);
    }, 5000);
  }, []);

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{textIntro}</Text>
      </View>
      <View style={globalStyles.viewBtns}>
        {showNext && (
          <Button
            onPress={nextText}
            title="siguiente"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
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
  textModal: {
    marginVertical: 10,
    textAlign: 'justify',
  },
});
