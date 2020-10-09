import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {challengeText_15_1, textFeedback_15} from './challengeText';
import globalStyles from '../../styles/global';
import {ChallengeContext} from '../../navigations/ChallengeContext';
import Modal from '../../components/Modal';

export default function Challenge15({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const {challenge} = useContext(ChallengeContext);
  const {argument, counterargument} = challenge;

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 2000);
  }, []);

  return (
    <View style={globalStyles.viewBody}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
          marginLeft: 20,
          marginRight: 30,
        }}>
        <Text style={globalStyles.title}>{challengeText_15_1}</Text>
        <View style={globalStyles.viewOptions}>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Argumentos:</Text>
            {argument.map((item, index) => (
              <Text key={index} style={styles.tick}>
                ✔ <Text style={styles.argument}>{item.argument}</Text>
              </Text>
            ))}
          </View>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Contra-argumentos:</Text>
            {counterargument.map((item, index) => (
              <Text key={index} style={styles.tick}>
                ✔ <Text style={styles.argument}>{item.argument}</Text>
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={nextText}
          title="Siguiente"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
          icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
          iconRight
        />
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <View style={globalStyles.modalFeedback}>
          <Image
            style={globalStyles.brain}
            source={require('../../assets/img/cerebrito/cerebro-like.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.textModal}>{textFeedback_15}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  argument: {
    color: '#3c3c3c',
    marginBottom: 10,
    textAlign: 'justify',
  },
  textModal: {
    marginBottom: 10,
    textAlign: 'justify',
  },
  tick: {
    color: '#F2A922',
  },
  title: {
    color: '#3c3c3c',
    fontSize: 18,
    marginBottom: 10,
  },
  viewArgument: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
  },
});
