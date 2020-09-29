import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  challengeText_14_1,
  challengeText_14_2,
  challengeText_12_3,
} from './challengeText';
import Argument from './Argument';
import globalStyles from '../../styles/global';

export default function Challenge14({nextText, thesis}) {
  const {thesis1, thesis2} = challengeText_12_3;
  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.title}>{challengeText_14_1}</Text>
        <Text style={globalStyles.content}>{challengeText_14_2}</Text>
        <ScrollView>
          {thesis === 1 &&
            thesis2.map((text, id) => (
              <Argument key={id} id={id} text={text} />
            ))}
          {thesis === 2 &&
            thesis1.map((text, id) => (
              <Argument key={id} id={id} text={text} />
            ))}
        </ScrollView>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={nextText}
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
