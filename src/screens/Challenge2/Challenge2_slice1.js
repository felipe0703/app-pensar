import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {challege2Text_1} from './challenge2text';
import {ChallengeContext} from '../../contexts/ChallengeContext';
import {UserContext} from '../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';
import globalStyles from '../../styles/global';
import Modal from '../../components/Modal';

export default function Challenge2_slice1({nextText, setSlice}) {
  const [userInfo, setUserInfo] = useState(null);
  const textWithName = challege2Text_1.replace('[]', userInfo);
  const allText = textWithName.split('|');
  const {setChallenge} = useContext(ChallengeContext);
  const {dataUser} = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // (async () => {
    //   const user = await firebase.auth().currentUser;
    //   setUserInfo(user.displayName);
    // })();
    setUserInfo(dataUser.nameUser);
  }, []);

  useEffect(() => {
    setChallenge({
      id: 2,
      challenge: 'desafío 2',
    });
  }, []);

  useEffect(() => {
    getData();
    // setSlice(3);
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
      const value = await AsyncStorage.getItem('@page_challenge_2');

      if (value !== null) {
        if (value === '1') {
          storeData('@page_challenge_2', '1');
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
      '@page_challenge_2',
      '@challenge_2_slice4_question',
      '@challenge_2_slice5_data',
      '@challenge_2_slice6_tesis',
      '@challenge_2_slice7_data',
      '@challenge_2_slice8_data',
      '@challenge_2_slice11_conclusion',
      '@challenge_2_slice12_sesgo',
    ];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      console.log(e);
    }
  };

  const changePage = async () => {
    try {
      const value = await AsyncStorage.getItem('@page_challenge_2');
      setShowModal(false);
      setSlice(JSON.parse(value));
    } catch (err) {
      console.log(err);
    }
  };

  const continueChallenge = () => {
    setShowModal(false);
    removeData();
    storeData('@page_challenge_2', '1');
  };

  return (
    <>
      <View style={globalStyles.viewBody}>
        <View style={globalStyles.viewContent}>
          <Image
            style={globalStyles.brain}
            source={require('../../assets/img/cerebrito/cerebro-saludando.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={globalStyles.content}>{allText}</Text>
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
              onPress={continueChallenge}
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
