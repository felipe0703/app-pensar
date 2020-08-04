import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Intro1 from './Intro1';
import Intro2 from './Intro2';
import Intro3 from './Intro3';
import Intro4 from './Intro4';
import Intro5 from './Intro5';
import Intro6 from './Intro6';
import Intro7 from './Intro7';

export default function Intro(props) {
  const {navigation} = props;
  const [idIntro, setIdIntro] = useState(0);

  const NextText = () => {
    setIdIntro(idIntro + 1);
  };

  const PreviousText = () => {
    setIdIntro(idIntro - 1);
  };

  return (
    <View style={styles.view}>
      {idIntro === 0 && <Intro1 NextText={NextText} setIdIntro={setIdIntro} />}
      {idIntro === 1 && (
        <Intro2
          NextText={NextText}
          PreviousText={PreviousText}
          setIdIntro={setIdIntro}
        />
      )}
      {idIntro === 2 && (
        <Intro3
          NextText={NextText}
          PreviousText={PreviousText}
          setIdIntro={setIdIntro}
        />
      )}
      {idIntro === 3 && (
        <Intro4
          NextText={NextText}
          PreviousText={PreviousText}
          setIdIntro={setIdIntro}
        />
      )}
      {idIntro === 4 && (
        <Intro5
          NextText={NextText}
          PreviousText={PreviousText}
          setIdIntro={setIdIntro}
        />
      )}
      {idIntro === 5 && (
        <Intro6
          NextText={NextText}
          PreviousText={PreviousText}
          setIdIntro={setIdIntro}
        />
      )}
      {idIntro === 6 && <Intro7 navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
