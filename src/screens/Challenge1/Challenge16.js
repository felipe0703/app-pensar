import React, {useContext, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  challengeText_16_1,
  challengeText_16_2,
  challengeText_16_3,
  challengeText_16_4,
} from './challengeText';
import globalStyles from '../../styles/global';
import {ChallengeContext} from '../../navigations/ChallengeContext';

export default function Challenge16({nextText}) {
  const [showNext, setShowNext] = useState(false);
  const [checkedThesis1, setCheckedThesis1] = useState(false);
  const [checkedThesis2, setCheckedThesis2] = useState(false);
  const {challenge, setChallenge} = useContext(ChallengeContext);

  const resp = (thesis) => {
    if (thesis === 1) {
      setChallenge({...challenge, conclusion: challengeText_16_3});
      setCheckedThesis1(true);
      setCheckedThesis2(false);
    } else if (thesis === 2) {
      setChallenge({...challenge, conclusion: challengeText_16_4});
      setCheckedThesis1(false);
      setCheckedThesis2(true);
    }
    setShowNext(true);
  };

  return (
    <View style={globalStyles.viewBody}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
          marginLeft: 20,
          marginRight: 30,
        }}>
        <Text style={globalStyles.title}>{challengeText_16_1}</Text>
        <Text style={globalStyles.content}>{challengeText_16_2}</Text>
        <View style={globalStyles.viewOptions}>
          <CheckBox
            title={challengeText_16_3}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedThesis1}
            // checkedColor="red"
            onPress={() => resp(1)}
          />
          <CheckBox
            title={challengeText_16_4}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedThesis2}
            onPress={() => resp(2)}
          />
        </View>
      </ScrollView>
      <View style={globalStyles.viewBtns}>
        {showNext && (
          <Button
            onPress={nextText}
            title="Siguiente"
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
