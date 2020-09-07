import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {usePages} from '../../hooks/usePages';
import Modal from '../../components/Modal';
import {useState} from 'react';

export default function Challenge1Text({
  text,
  go,
  textButton = 'Siguiente',
  isVisibleLearnMore = false,
  learnMore = '',
  pageToLearMore = 0,
}) {
  const {state: page, nextText, backText} = usePages();
  const [showModal, setShowModal] = useState(false);

  const setTextLearnMore = () => {
    setShowModal(true);
  };
  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.content}>{text[page]}</Text>
      </View>
      {isVisibleLearnMore && pageToLearMore === page && (
        <View>
          <TouchableOpacity onPress={setTextLearnMore}>
            <Text style={styles.textLearMore}>¿Quieres saber más?</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.viewBtns}>
        {page > 0 && page < text.length - 1 && (
          <Button
            onPress={backText}
            title="anterior"
            icon={<Icon name="arrow-left" size={15} color="#196674" />}
            buttonStyle={styles.btn}
            containerStyle={styles.btnContainer}
            titleStyle={styles.btnText}
          />
        )}
        {page < text.length - 1 && (
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
        {page === text.length - 1 && (
          <Button
            onPress={go}
            title={textButton}
            buttonStyle={styles.btn}
            containerStyle={styles.btnContainer}
            titleStyle={styles.btnText}
          />
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <Text style={styles.textModal}>{learnMore}</Text>
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
  textLearMore: {
    color: '#c3c3c3',
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  textModal: {
    marginVertical: 10,
    textAlign: 'justify',
  },
});
