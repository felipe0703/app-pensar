import React, {useEffect, useState} from 'react';
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
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge1Text({
  text,
  go,
  textButton = 'siguiente',
  isVisibleLearnMore = false,
  learnMore = '',
  pageToLearMore = 0,
  showBrain = false,
  showLike = false,
  previousText,
  showPrevious = false,
}) {
  const {state: page, nextText, backText} = usePages();
  const [showModal, setShowModal] = useState(false);
  const [logs, setLogs] = useState([]);
  const [idLog, setIdLog] = useState('');

  const setTextLearnMore = () => {
    db.collection('new_logs')
      .where('idUser', '==', firebaseApp.auth().currentUser.uid)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data().challenge,
          };
        });
        console.log(data);
        setLogs(data[0].data);
        setIdLog(data[0].id);
      });
    setShowModal(true);
  };

  useEffect(() => {
    if (idLog !== '') {
      console.log('estoy vacio');
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'introducción',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: '¿Quieres saber más?',
            action: 'Si',
          },
        ],
      };
      console.log('idLog', idLog);
      db.collection('new_logs').doc(idLog).update(payload);
    }
  }, [idLog]);

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        {showBrain && (
          <Image
            style={globalStyles.brain}
            source={
              showLike
                ? require('../../assets/img/cerebrito/cerebro-like-rosa.png')
                : require('../../assets/img/cerebrito/cerebro-saludando-rosa.png')
            }
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
        {/* primero */}
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
        {showPrevious && (
          <Button
            onPress={previousText}
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
        {/* ultimo */}
        {page === text.length - 1 && (
          <Button
            onPress={go}
            title={textButton}
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <View style={globalStyles.correct}>
          <Image
            style={globalStyles.brain}
            source={require('../../assets/img/cerebrito/cerebro-saludando.png')}
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
