import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ChallengeContext} from '../../navigations/ChallengeContext';
import globalStyles from '../../styles/global';
import {challege2Text_11} from './challenge2text';

export default function Challenge2_slice11({nextText, navigation}) {
  const [value, setValue] = useState('');
  const [showBtnNext, setShowBtnNext] = useState(true);
  const [error, setError] = useState(false)
  const {challenge, setChallenge} = useContext(ChallengeContext);

  useEffect(() => {
    navigation.setParams({name: 'Conclusión', progress: 0.84});
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setShowBtnNext(false);
  };

  const _keyboardDidHide = () => {
    setShowBtnNext(true);
  };

  const goNextText = () => {
    if(value){
      setError(false)
      setChallenge({...challenge, conclusion: value});
      nextText();
    }else{
      setError(true)
    }
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challege2Text_11}</Text>
        <TextInput
          multiline
          numberOfLines={4}
          editable
          onChangeText={(text) => setValue(text)}
          value={value}
          style={error ? styles.inputError: styles.input}
        />
      </View>
      <View style={globalStyles.viewBtns}>
        {showBtnNext && (
          <Button
            onPress={goNextText}
            title="Listo"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 30,
    width: 300,
  },
  inputError: {
    backgroundColor: '#fff',
    borderColor: '#ff4b4b',
    borderWidth: 2,
    marginTop: 30,
    width: 300,
  },

});
