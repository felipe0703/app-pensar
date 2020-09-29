import React, {useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  textIntro_2,
  textFeedback_2_1,
  textFeedback_2_2,
  textFeedback_2_3,
} from './text_Intro_1';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';

export default function Introduction_2({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [showSiguiente, setShowSiguiente] = useState(false);
  const [response, setResponse] = useState(false);

  const goChallenge = () => {
    navigation.navigate('introduction_3');
  };

  const resp = (resp) => {
    setShowModal(true);
    setShowSiguiente(true);
    setResponse(resp);
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{textIntro_2}</Text>
      </View>
      <View style={globalStyles.viewBtns}>
        {!showSiguiente ? (
          <>
            <Button
              onPress={() => resp(true)}
              title="Si"
              icon={<Icon name="thumbs-o-up" size={15} color="#196674" />}
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
            />

            <Button
              onPress={() => resp(false)}
              title="No"
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
            onPress={goChallenge}
            title="Siguiente"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        {response ? (
          <View style={globalStyles.correct}>
            <Image
              style={globalStyles.brain}
              source={require('../../assets/img/cerebrito/cerebro-rosado.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={styles.textFeedback}>{textFeedback_2_1}</Text>
            <Text style={styles.textFeedback2}>{textFeedback_2_3}</Text>
          </View>
        ) : (
          <View style={globalStyles.incorrect}>
            <Image
              style={globalStyles.brain}
              source={require('../../assets/img/cerebrito/cerebro-celeste.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={styles.textFeedback}>{textFeedback_2_2}</Text>
            <Text style={styles.textFeedback2}>{textFeedback_2_3}</Text>
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
    margin: 5,
  },
  textFeedback2: {
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
