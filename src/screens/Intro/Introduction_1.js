import React, {useState, useEffect} from 'react';
import {Button, Image} from 'react-native-elements';
import * as firebase from 'firebase';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from '../../components/Modal';
import {textIntro_1} from './text_Intro_1';
import globalStyles from '../../styles/global';
import AsyncStorage from '@react-native-community/async-storage';

export default function Introduction({navigation}) {
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const textWithName = textIntro_1.replace('[]', userInfo);
  const allText = textWithName.split('|');

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.displayName);
    })();
  }, []);

  const goChallenge = () => {
    navigation.navigate('feedback-intro');
  };

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@page_intro', value);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@page_intro');

      if (value !== null) {
        if (value === '1') {
          storeData('1');
          // setShowModal(false);
          console.log('es uno', value);
        } else {
          setShowModal(true);
          console.log('no es uno', value);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeData = async () => {
    const keys = [
      '@page_intro',
      '@intro_2',
      '@intro_4_checkeds',
      '@intro_6_checkeds',
    ];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      // remove error
      console.log(e);
    }
  };

  const changePage = async () => {
    try {
      const value = await AsyncStorage.getItem('@page_intro');
      setShowModal(false);

      switch (value) {
        case '2':
          navigation.navigate('feedback-intro');
          break;
        case '3':
          navigation.navigate('introduction_3');
          break;
        case '4':
          navigation.navigate('introduction_4');
          break;
        case '5':
          navigation.navigate('introduction_5');
          break;
        case '6':
          navigation.navigate('introduction_6');
          break;

        case '7':
          navigation.navigate('introduction_7');
          break;

        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const continueIntro = () => {
    setShowModal(false);
    removeData();
    storeData('1');
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
            onPress={goChallenge}
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
              onPress={continueIntro}
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
