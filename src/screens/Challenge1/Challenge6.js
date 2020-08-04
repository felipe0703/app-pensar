import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Challenge6(props) {
  const {nextText} = props;
  return (
    <View style={styles.viewBody}>
      <View>
        <Text style={styles.text}>
          Frente al siguiente planteamiento, ¿cuál sería tu posición?
        </Text>
        <Text style={styles.text}>
          ¿Crees que las redes sociales afectan tanto las relaciones entre las
          personas como el aprendizaje o es más bien una forma de relacionarse y
          aprender propia del s. XXI?
        </Text>
        <Text style={styles.text}>Tesis:</Text>
        <Text style={styles.text}>
          Sí, las redes sociales afectan las relaciones interpersonales y el
          aprendizaje.
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
