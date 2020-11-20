import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import globalStyles from '../../styles/global';

export default function Challenge4({nextText}) {
  useEffect(() => {
    storeData('@page_challenge_1', '4');
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
        <Text style={globalStyles.content}>Empecemos el Desafío 1</Text>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          title="Vamos"
          type="solid"
          icon={<Icon name="arrow-right" size={15} color="#196674" />}
          iconRight
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
          onPress={nextText}
        />
      </View>
    </View>
  );
}
