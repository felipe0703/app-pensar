import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CheckBox} from 'react-native-elements';

export default function Argument({id, text}) {
  const [checked, setChecked] = useState(false);
  const resp = () => {
    setChecked(!checked);
  };
  return (
    <View>
      <CheckBox
        title={text}
        checked={checked}
        key={id}
        textStyle={{fontSize: 10, textAlign: 'justify', marginRight: 25}}
        containerStyle={{width: 300}}
        onPress={resp}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
