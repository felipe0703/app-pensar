import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {usePages} from '../../hooks/usePages';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';

export default function Challenge1Text({
  text,
  go,
  textButton = 'Siguiente',
  isVisibleLearnMore = false,
  learnMore = '',
  pageToLearMore = 0,
  showBrain = false,
}) {
  const {state: page, nextText, backText} = usePages();
  const [showModal, setShowModal] = useState(false);

  const setTextLearnMore = () => {
    setShowModal(true);
  };
  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        {showBrain && (
          <Image
            style={globalStyles.brain}
            source={require('../../assets/img/cerebrito/cerebro-rosado.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
        )}
        <Text style={globalStyles.content}>{text[page]}</Text>
      </View>
      {isVisibleLearnMore && pageToLearMore === page && (
        <View>
          <TouchableOpacity onPress={setTextLearnMore}>
            <Text style={styles.textLearMore}>¿Quieres saber más?</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={globalStyles.viewBtns}>
        {page > 0 && page < text.length - 1 && (
          <Button
            onPress={backText}
            title="anterior"
            icon={<Icon name="arrow-left" size={15} color="#196674" />}
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
          />
        )}
        {page < text.length - 1 && (
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
        {page === text.length - 1 && (
          <Button
            onPress={go}
            title={textButton}
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
          />
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <View style={globalStyles.correct}>
          <Image
            style={globalStyles.brain}
            source={require('../../assets/img/cerebrito/cerebro-rosado.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.textModal}>{learnMore}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textLearMore: {
    color: '#F2A922',
    textDecorationLine: 'underline',
    marginVertical: 10,
    fontSize: 16,
  },
  textModal: {
    // marginVertical: 10,
    marginHorizontal: 10,
    textAlign: 'justify',
  },
});
