import React, {useContext, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {ChallengeContext} from '../../contexts/ChallengeContext';
import {challengeText_1} from './challengeText';
import globalStyles from '../../styles/global';
import Modal from '../../components/Modal';

export default function Challenge1({nextText, setSlice}) {
  const textIntro = challengeText_1.split('|');
  const [showModal, setShowModal] = useState(false);
  const {setChallenge} = useContext(ChallengeContext);

  useEffect(() => {
    setChallenge({
      id: 1,
      challenge: 'desafío 1',
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@page_challenge_1');

      console.log('ultima pagina', value);

      if (value !== null) {
        if (value === '1' || value === '2') {
          storeData('@page_challenge_1', '1');
          setShowModal(false);
        } else {
          setShowModal(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeData = async () => {
    const keys = [
      '@page_challenge_1',
      '@challenge_1_slice3_data',
      '@challenge_1_slice10_thesis',
      '@challenge_1_slice12_data',
      '@challenge_1_slice14_data',
      '@challenge_1_slice16_conclusion',
    ];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      console.log(e);
    }
  };

  const changePage = async () => {
    try {
      const value = await AsyncStorage.getItem('@page_challenge_1');
      console.log('cahnge', value);
      setShowModal(false);
      const page = JSON.parse(value);
      setSlice(page - 1);
    } catch (err) {
      console.log(err);
    }
  };

  const resetChallenge = () => {
    setShowModal(false);
    removeData();
    storeData('@page_challenge_1', '1');
  };

  return (
    <>
      <View style={globalStyles.viewBody}>
        <View style={globalStyles.viewContent}>
          <ImageBackground
            source={require('../../assets/img/Pergamino.jpg')}
            style={styles.background}>
            {/* <ShowInfo text={textIntro} go={nextText} /> */}
            <Text style={styles.content}>{textIntro}</Text>
          </ImageBackground>
        </View>
        <View style={globalStyles.viewBtns}>
          <Button
            onPress={nextText}
            title="siguiente"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        </View>
      </View>
      <Modal
        isVisible={showModal}
        setIsVisible={setShowModal}
        backPrees={false}>
        <View style={styles.viewModal}>
          <Text>Anteriormente no terminaste todo el desafío.</Text>
          <Text>¿Qué quieres hacer?</Text>
          <View style={styles.viewBtns}>
            <Button
              onPress={resetChallenge}
              title="Reiniciar"
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
            />
            <Button
              onPress={changePage}
              title="Continuar"
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'center', // center, contain, cover, repeat , stretch
    justifyContent: 'center',
    height: 'auto',
    width: '100%',
  },
  content: {
    color: '#804000',
    // fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  viewBtns: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginHorizontal: 10,
  },
  viewModal: {
    padding: 10,
    alignItems: 'center',
  },
});
