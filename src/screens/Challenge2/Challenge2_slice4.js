import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  challege2Text_4,
  challege2Text_4_1,
  challege2Text_4_2,
  challege2Text_4_3,
} from './challenge2text';
import globalStyles from '../../styles/global';
import {ChallengeContext} from '../../navigations/ChallengeContext';

export default function Challenge2_slice4({nextText, navigation}) {
  const [question1, setQuestion1] = useState(false);
  const [question2, setQuestion2] = useState(false);
  const [question3, setQuestion3] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const {challenge, setChallenge} = useContext(ChallengeContext);

  useEffect(() => {
    navigation.setParams({name: 'Selección', progress: 0.28});
  }, []);

  const resp = (question) => {
    if (question === 1) {
      setChallenge({...challenge, proposal: challege2Text_4_1});
      setQuestion1(true);
      setQuestion2(false);
      setQuestion3(false);
    } else if (question === 2) {
      setChallenge({...challenge, proposal: challege2Text_4_2});
      setQuestion1(false);
      setQuestion2(true);
      setQuestion3(false);
    } else {
      setChallenge({...challenge, proposal: challege2Text_4_3});
      setQuestion1(false);
      setQuestion2(false);
      setQuestion3(true);
    }
    setShowNext(true);
  };

  return (
    <View style={globalStyles.viewBody}>
      <ScrollView
        contentContainerStyle={{
          marginVertical: 10,
          marginLeft: 20,
          marginRight: 30,
        }}>
        <Text style={globalStyles.content}>{challege2Text_4}</Text>
        <View style={globalStyles.viewOptions}>
          <CheckBox
            title={challege2Text_4_1}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={question1}
            onPress={() => resp(1)}
          />
          <CheckBox
            title={challege2Text_4_2}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={question2}
            onPress={() => resp(2)}
          />
          <CheckBox
            title={challege2Text_4_3}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={question3}
            onPress={() => resp(3)}
          />
        </View>
      </ScrollView>
      <View style={globalStyles.viewBtns}>
        {showNext && (
          <Button
            onPress={nextText}
            title="siguiente"
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
  content2: {
    color: '#fff',
    // fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'justify',
    marginLeft: 30,
    marginTop: 15,
  },
});
