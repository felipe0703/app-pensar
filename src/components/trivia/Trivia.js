import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {questions} from './Questions';
import Modal from '../Modal';

export default function Trivia({navigation}) {
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
    console.log('effect');
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
      setFeedbackTitle('Intentalo de nuevo 👎😢');
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
    navigation.navigate('congratulation');
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.content}>{question.question}</Text>
      </View>
      <View style={styles.viewBtns}>
        <Button
          onPress={() => resp(true)}
          title="Verdadero"
          icon={<Icon name="thumbs-o-up" size={15} color="#196674" />}
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
        />
        <Button
          onPress={() => resp(false)}
          title="Falso"
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
          icon={<Icon name="thumbs-o-down" size={15} color="#196674" icon />}
          iconRight
        />
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <View style={correct ? styles.correct : styles.incorrect}>
          <Text style={styles.textTitleFeedback}>{feedbackTitle}</Text>
          <Text style={styles.textFeedback}>{question.feedback}</Text>
          <View style={styles.btnModal}>
            {countCorrect === 3 ? (
              <Button
                onPress={goCongratulation}
                title="Continuar"
                buttonStyle={styles.btn}
                containerStyle={styles.btnContainer}
                titleStyle={styles.btnText}
              />
            ) : (
              <Button
                onPress={nextQuestion}
                title="Continuar"
                buttonStyle={styles.btn}
                containerStyle={styles.btnContainer}
                titleStyle={styles.btnText}
              />
            )}
          </View>
        </View>
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
  correct: {
    backgroundColor: '#78c800',
  },
  incorrect: {
    backgroundColor: '#ff4b4b',
  },
  textTitleFeedback: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  textFeedback: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  btnModal: {
    alignItems: 'center',
  },
});
