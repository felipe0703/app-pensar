import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/global';

export default function Challenge4({nextText}) {
  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>Empecemos el Desafío 1</Text>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          title="Vamos"
          type="solid"
          icon={<Icon name="arrow-right" size={15} color="#196674" />}
          iconRight
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
          onPress={nextText}
        />
      </View>
    </View>
  );
}
