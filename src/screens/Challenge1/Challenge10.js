import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {Button, CheckBox, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  challengeText_10_1,
  challengeText_10_2,
  challengeText_10_3,
  challengeText_10_4,
  challengeText_14_1,
  textFeedback_10,
} from './challengeText';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';
import {ChallengeContext} from '../../navigations/ChallengeContext';
import {playSound_feedback} from '../../assets/playsound/playsound';

export default function Challenge10({nextText, setThesis, navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [allowShowNext, setAllowShowNext] = useState(false);
  const [checkedThesis1, setCheckedThesis1] = useState(false);
  const [checkedThesis2, setCheckedThesis2] = useState(false);
  const {challenge, setChallenge} = useContext(ChallengeContext);

  useEffect(() => {
    navigation.setParams({name: 'Tesis', progress: 0.42});
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
      playSound_feedback();
      setAllowShowNext(true);
    }, 500);
  }, []);

  const resp = (thesis) => {
    if (thesis === 1) {
      setChallenge({...challenge, thesis: challengeText_10_3});
      setCheckedThesis1(true);
      setCheckedThesis2(false);
    } else if (thesis === 2) {
      setChallenge({...challenge, thesis: challengeText_10_4});
      setCheckedThesis1(false);
      setCheckedThesis2(true);
    }
    setThesis(thesis);
    if (allowShowNext) {
      setShowNext(true);
    }
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.title}>{challengeText_10_1}</Text>
        <Text style={globalStyles.content}>{challengeText_10_2}</Text>
        <View style={globalStyles.viewOptions}>
          <CheckBox
            title={challengeText_10_3}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedThesis1}
            // checkedColor="red"
            onPress={() => resp(1)}
          />
          <CheckBox
            title={challengeText_10_4}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedThesis2}
            onPress={() => resp(2)}
          />
        </View>
      </View>
      <View style={globalStyles.viewBtns}>
        {showNext && (
          <Button
            onPress={nextText}
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
        <View style={globalStyles.modalFeedback}>
          <Image
            style={globalStyles.brain}
            source={require('../../assets/img/cerebrito/cerebro-rosado.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.textFeedback}>{textFeedback_10}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: '#fff',
    marginVertical: 10,
    width: 350,
    padding: 10,
    borderRadius: 8,
  },
  textFeedback: {
    marginVertical: 10,
  },
});
