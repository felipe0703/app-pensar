import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Challenge4(props) {
  const {nextText} = props;
  return (
    <View style={styles.viewBody}>
      <View>
        <Text style={styles.text}>Bien hecho, ¡Andrea!</Text>
        <Text style={styles.text}>
          Vamos paso a paso. Un segundo paso del PR es la elaboración de un
          punto de vista, lo que se denomina ‘elaboración de tesis’ cuando se
          desarrolla académicamente.
        </Text>
      </View>

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
