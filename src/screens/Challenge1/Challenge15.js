import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  challengeText_15_1,
  challengeText_15_2,
  challengeText_15_3,
  challengeText_15_4,
} from './challengeText';
import globalStyles from '../../styles/global';

export default function Challenge15({nextText}) {
  const [showNext, setShowNext] = useState(false);
  const [checkedThesis1, setCheckedThesis1] = useState(false);
  const [checkedThesis2, setCheckedThesis2] = useState(false);

  const resp = (thesis) => {
    if (thesis === 1) {
      setCheckedThesis1(true);
      setCheckedThesis2(false);
    } else if (thesis === 2) {
      setCheckedThesis1(false);
      setCheckedThesis2(true);
    }
    setShowNext(true);
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.title}>{challengeText_15_1}</Text>
        <Text style={globalStyles.content}>{challengeText_15_2}</Text>
        <View style={globalStyles.viewOptions}>
          <CheckBox
            title={challengeText_15_3}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedThesis1}
            // checkedColor="red"
            onPress={() => resp(1)}
          />
          <CheckBox
            title={challengeText_15_4}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedThesis2}
            onPress={() => resp(2)}
          />
        </View>
      </View>
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
