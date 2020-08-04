import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Intro6(props) {
  const {PreviousText, NextText} = props;
  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.content}>Estos son algunos pasos esenciales:</Text>
        <View style={styles.options}>
          <Text style={styles.option}>1. Selección de información</Text>
          <Text style={styles.option}>2. Desarrollo de tesis</Text>
          <Text style={styles.option}>3. Creación de argumentos</Text>
          <Text style={styles.option}>4. Creación de contraargumentos</Text>
          <Text style={styles.option}>5. Conclusión</Text>
          <Text style={styles.option}>
            6. Reconocimiento de sesgos cognitivos y heurísticas
          </Text>
        </View>
        <Text style={styles.content}>Te lo iremos explicando de a poco.</Text>
      </View>
      <View style={styles.viewBtn}>
        <Button
          title=" Anterior"
          icon={<Icon name="arrow-left" size={15} color="#196674" />}
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
          onPress={PreviousText}
        />

        <Button
          title=" Siguiente"
          icon={<Icon name="arrow-right" size={15} color="#196674" />}
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
          onPress={NextText}
          iconRight
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewContent: {
    marginVertical: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    color: '#fff',
    marginVertical: 20,
    fontSize: 18,
    paddingHorizontal: 50,
    textAlign: 'center',
  },
  options: {
    alignItems: 'flex-start',
  },
  option: {
    color: '#fff',
    marginVertical: 5,
    fontSize: 18,
    paddingLeft: 80,
    paddingRight: 50,
  },
  viewBtn: {
    flexDirection: 'row',
  },
  btn: {
    borderRadius: 10,
    backgroundColor: '#C2DDC7',
    paddingVertical: 10,
  },
  btnText: {
    color: '#196674',
    marginRight: 10,
  },
  btnContainer: {
    width: 150,
    marginVertical: 30,
    marginHorizontal: 10,
  },
});
