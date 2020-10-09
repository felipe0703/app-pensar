import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Button, Image} from 'react-native-elements';
import globalStyles from '../../styles/global';
import {
  congratulation_challenge1,
  congratulation_challenge2,
} from '../../screens/Challenge2/challenge2text';

export default function Congratulation({navigation, route}) {
  const {challenge} = route.params;
  const [text, setText] = useState('');

  const go = () => {
    navigation.navigate('home');
  };

  useEffect(() => {
    if (challenge === 1) {
      setText(congratulation_challenge1);
    } else if (challenge === 2) {
      setText(congratulation_challenge2);
    } else {
      setText('Terminaste el desafío');
    }
  }, []);

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Image
          style={globalStyles.brain}
          source={require('../../assets/img/cerebrito/cerebro-saludando.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={globalStyles.title}>🎉¡Felicidades!🎉</Text>
        <Text style={globalStyles.content3}>{text}</Text>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={go}
          title="Continuar"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
        />
      </View>
    </View>
  );
}
