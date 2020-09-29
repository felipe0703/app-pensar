import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/global';
import {challege2Text_6} from './challenge2text';

export default function Challenge2_slice6({nextText}) {
  const [value, setValue] = useState('');
  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challege2Text_6}</Text>
        <TextInput
          multiline
          numberOfLines={4}
          editable
          onChange={(text) => setValue(text)}
          value={value}
          style={styles.input}
        />
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={nextText}
          title="Listo"
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

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 30,
    width: 300,
  },
});
