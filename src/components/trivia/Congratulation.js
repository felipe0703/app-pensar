import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import globalStyles from '../../styles/global';
import {congratulation} from '../../screens/Challenge2/challenge2text';

export default function Congratulation({navigation, route}) {
  const {challenge} = route.params;
  const [text, setText] = useState('');

  const go = () => {
    navigation.navigate('home');
  };

  useEffect(() => {
    if (challenge === 1) {
      setText('Terminaste el primer desafío');
    } else if (challenge === 2) {
      setText(congratulation);
    } else {
      setText('Terminaste el desafío');
    }
  }, []);

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.title}>🎉¡Felicidades!🎉</Text>
        <Text style={globalStyles.content}>{text}</Text>
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
