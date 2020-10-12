import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase';
import {Button, Image} from 'react-native-elements';
import {View, Text, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ChangeDisplayNameForm from '../../components/Account/ChangeDisplayNameForm';
import Modal from '../../components/Modal';
import {textIntro_1} from './text_Intro_1';
import globalStyles from '../../styles/global';

export default function Introduction({navigation}) {
  const [userInfo, setUserInfo] = useState(null);
  const [reloadUserInfo, setReloadUserInfo] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const textWithName = textIntro_1.replace('[]', userInfo);
  const allText = textWithName.split('|');

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.displayName);
    })();
  }, [reloadUserInfo]);

  const goChallenge = () => {
    navigation.navigate('feedback-intro');
  };

  return (
    <>
      {userInfo ? (
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
      ) : (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          <ChangeDisplayNameForm
            displayName={userInfo}
            setShowModal={setShowModal}
            setReloadUserInfo={setReloadUserInfo}
          />
        </Modal>
      )}
    </>
  );
}
