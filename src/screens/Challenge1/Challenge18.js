import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {challengeText_18_1, challengeText_18_2} from './challengeText';
import globalStyles from '../../styles/global';

export default function Challenge18({navigation}) {
  useEffect(() => {
    navigation.setParams({name: 'Sesgo', progress: 1});
  }, []);
  const go = () => {
    navigation.navigate('trivia', {challenge: 1});
  };
  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.title}>{challengeText_18_1}</Text>
        <Text style={globalStyles.content}>{challengeText_18_2}</Text>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={go}
          title="Vamos"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
        />
      </View>
    </View>
  );
}
