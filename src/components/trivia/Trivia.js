import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {questions} from './Questions';
import Modal from '../Modal';
import globalStyles from '../../styles/global';

export default function Trivia({navigation, route}) {
  const {challenge} = route.params;
  const [showModal, setShowModal] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [correct, setCorrect] = useState(false);
  const [idQuestion, setIdQuestion] = useState(0);
  const [question, setQuestion] = useState({});
  const [countCorrect, setCountCorrect] = useState(0);
  const numbersOfQuestions = questions.length;
  useEffect(() => {
    const random = () => {
      // const numberQuestion = Math.floor(Math.random() * numbersOfQuestions);
      // const numberQuestion = 0;
      // setIdQuestion(idQuestion + 1);
    };
    if (idQuestion < numbersOfQuestions) {
      setQuestion(questions[idQuestion]);
      // random();
    } else {
      setIdQuestion(0);
    }
  }, [idQuestion]);

  const resp = (resp) => {
    if (resp === question.response) {
      setFeedbackTitle('Bien hecho 🎊🎉🎉');
      setCorrect(true);
      setCountCorrect(countCorrect + 1);
    } else {
      setFeedbackTitle('Inténtalo de nuevo 👎😢');
      setCorrect(false);
    }
    setShowModal(true);
  };

  const nextQuestion = () => {
    setIdQuestion(idQuestion + 1);
    setShowModal(false);
  };

  const goCongratulation = () => {
    setShowModal(false);
    navigation.navigate('congratulation', {challenge: challenge});
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={styles.triviaBody}>
        <View style={globalStyles.viewContent}>
          <Text style={styles.content}>{question.question}</Text>
        </View>
        <View style={globalStyles.viewBtns}>
          <Button
            onPress={() => resp(true)}
            title="Verdadero"
            icon={<Icon name="thumbs-up" size={15} color="#fff" />}
            buttonStyle={styles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={styles.btnText}
          />
          <Button
            onPress={() => resp(false)}
            title="Falso"
            buttonStyle={styles.btnFalse}
            containerStyle={globalStyles.btnContainer}
            titleStyle={styles.btnText}
            icon={<Icon name="thumbs-down" size={15} color="#fff" icon />}
            iconRight
          />
        </View>
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <View style={correct ? globalStyles.correct : globalStyles.incorrect}>
          <Text style={styles.textTitleFeedback}>{feedbackTitle}</Text>
          <Text style={styles.textFeedback}>{question.feedback}</Text>
          <View style={styles.btnModal}>
            {countCorrect === 3 ? (
              <Button
                onPress={goCongratulation}
                title="Continuar"
                buttonStyle={globalStyles.btn}
                containerStyle={globalStyles.btnContainer}
                titleStyle={globalStyles.btnText}
              />
            ) : (
              <Button
                onPress={nextQuestion}
                title="Continuar"
                buttonStyle={globalStyles.btn}
                containerStyle={globalStyles.btnContainer}
                titleStyle={globalStyles.btnText}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    backgroundColor: '#78c800',
    paddingVertical: 10,
  },
  btnFalse: {
    borderRadius: 10,
    backgroundColor: '#ff4b4b',
    paddingVertical: 10,
  },
  btnModal: {
    alignItems: 'center',
  },
  btnText: {
    // color: '#196674',
    marginHorizontal: 10,
  },
  content: {
    color: '#3c3c3c',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textFeedback: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  textTitleFeedback: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  triviaBody: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginVertical: 70,
    borderRadius: 10,
  },
});
