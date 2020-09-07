import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from '../../components/Modal';
import {
  challengeText_8,
  textFeedback_8_1,
  textFeedback_8_2,
  textFeedback_8_3,
} from './challengeText';

export default function Challenge8({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [response, setResponse] = useState(false);

  const resp = (response) => {
    setShowModal(true);
    setResponse(response);
    setShowNext(true);
  };
  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.content}>{challengeText_8}</Text>
        <Card
          image={require('../../assets/img/Selects/img6.jpg')}
          imageStyle={styles.cardImage}></Card>
      </View>
      <View style={styles.viewBtns}>
        {!showNext ? (
          <>
            <Button
              onPress={() => resp(true)}
              title="Si"
              icon={<Icon name="thumbs-o-up" size={15} color="#196674" />}
              buttonStyle={styles.btn}
              containerStyle={styles.btnContainer}
              titleStyle={styles.btnText}
            />
            <Button
              onPress={() => resp(false)}
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
            title="Siguiente"
            type="solid"
            icon={<Icon name="arrow-right" size={15} color="#196674" />}
            iconRight
            buttonStyle={styles.btn}
            titleStyle={styles.btnText}
            containerStyle={styles.btnContainer}
            onPress={nextText}
          />
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        {response ? (
          <View style={styles.correct}>
            <Text style={styles.textFeedback}>{textFeedback_8_2}</Text>
            <Text style={styles.textFeedback}>{textFeedback_8_3}</Text>
          </View>
        ) : (
          <View style={styles.incorrect}>
            <Text style={styles.textFeedback}>{textFeedback_8_1}</Text>
            <Text style={styles.textFeedback}>{textFeedback_8_3}</Text>
          </View>
        )}
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
  cardImage: {
    width: 300,
    height: 350,
    resizeMode: 'contain',
  },
  correct: {
    backgroundColor: '#ff4b4b',
  },
  incorrect: {
    backgroundColor: '#78c800',
  },
  textFeedback: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
  },
});
