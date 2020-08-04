import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Challenge5(props) {
  const {nextText} = props;
  return (
    <View style={styles.viewBody}>
      <Text style={styles.text}>
        ¿Quieres probar tu capacidad de elaboración de una tesis?
      </Text>

      <Button
        title="Siguiente"
        type="solid"
        icon={<Icon name="arrow-right" size={15} color="#196674" />}
        iconRight
        buttonStyle={styles.btn}
        titleStyle={styles.btnText}
        onPress={nextText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    marginVertical: 10,
    color: '#fff',
    textAlign: 'justify',
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: '#C2DDC7',
    marginTop: 10,
    marginBottom: 20,
  },
  btnText: {
    color: '#196674',
    marginRight: 10,
  },
});
