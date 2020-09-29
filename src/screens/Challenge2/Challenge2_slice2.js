import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {challege2Text_2, challege2Text_2_1} from './challenge2text';
import globalStyles from '../../styles/global';

export default function Challenge2_slice2({nextText}) {
  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challege2Text_2}</Text>
        <Text style={styles.content2}>{challege2Text_2_1}</Text>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={nextText}
          title="siguiente"
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
  content2: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'justify',
    marginLeft: 30,
    marginTop: 15,
  },
});
