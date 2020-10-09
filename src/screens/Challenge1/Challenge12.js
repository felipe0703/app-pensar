import React, {useContext, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  challengeText_12_1,
  challengeText_12_2,
  challengeText_12_3,
} from './challengeText';
import Argument from './Argument';
import globalStyles from '../../styles/global';
import {ChallengeContext} from '../../navigations/ChallengeContext';

export default function Challenge12({nextText, thesis}) {
  const [argument, setArgument] = useState([]);
  const {thesis1, thesis2} = challengeText_12_3;
  const {challenge, setChallenge} = useContext(ChallengeContext);

  const setContext = () => {
    setChallenge({...challenge, argument});
    nextText();
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.title}>{challengeText_12_1}</Text>
        <Text style={globalStyles.content}>{challengeText_12_2}</Text>
        <ScrollView>
          {thesis === 1 &&
            thesis1.map((text, id) => (
              <Argument
                key={id}
                id={id}
                text={text}
                argument={argument}
                setArgument={setArgument}
              />
            ))}
          {thesis === 2 &&
            thesis2.map((text, id) => (
              <Argument
                key={id}
                id={id}
                text={text}
                argument={argument}
                setArgument={setArgument}
              />
            ))}
        </ScrollView>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={setContext}
          title="Siguiente"
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
