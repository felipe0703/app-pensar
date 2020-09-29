import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from '../../components/Modal';
import {
  challengeText_6,
  textFeedback_6_1,
  textFeedback_6_2,
  textFeedback_6_3,
} from './challengeText';
import globalStyles from '../../styles/global';

export default function Challenge6({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [response, setResponse] = useState(false);

  const resp = (response) => {
    setShowModal(true);
    setResponse(response);
    setShowNext(true);
  };
  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challengeText_6}</Text>
        <Card
          image={require('../../assets/img/Selects/img4.jpg')}
          imageStyle={globalStyles.cardImage}></Card>
      </View>
      <View style={globalStyles.viewBtns}>
        {!showNext ? (
          <>
            <Button
              onPress={() => resp(true)}
              title="Verdadero"
              icon={<Icon name="thumbs-o-up" size={15} color="#196674" />}
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
            />
            <Button
              onPress={() => resp(false)}
              title="Falso"
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
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
            buttonStyle={globalStyles.btn}
            titleStyle={globalStyles.btnText}
            containerStyle={globalStyles.btnContainer}
            onPress={nextText}
          />
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        {!response ? (
          <View style={globalStyles.correct}>
            <Text style={styles.textFeedback}>{textFeedback_6_1}</Text>
            <Text style={styles.textFeedback}>{textFeedback_6_3}</Text>
          </View>
        ) : (
          <View style={globalStyles.incorrect}>
            <Text style={styles.textFeedback}>{textFeedback_6_2}</Text>
            <Text style={styles.textFeedback}>{textFeedback_6_3}</Text>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textFeedback: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});
