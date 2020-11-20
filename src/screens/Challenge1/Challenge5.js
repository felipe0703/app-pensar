import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Image, Button} from 'react-native-elements';
import {challengeText_5} from './challengeText';
import globalStyles from '../../styles/global';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

export default function Challenge5(props) {
  const {nextText, navigation} = props;

  const textIntro = challengeText_5.split('|');

  useEffect(() => {
    navigation.setParams({name: 'Selección', progress: 0.28});
  }, []);

  useEffect(() => {
    storeData('@page_challenge_1', '5');
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Image
          style={globalStyles.icon}
          source={require('../../assets/iconos/icono-selección.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={[globalStyles.content, {paddingTop: 10}]}>
          {textIntro}
        </Text>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={nextText}
          title="Vamos"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
          icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
          iconRight
        />
      </View>
    </View>
  );
}
