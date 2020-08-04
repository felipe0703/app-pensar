import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Intro4(props) {
  const {PreviousText, NextText} = props;
  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.content}>¿Qué es el pensamiento reflexivo?</Text>
        <Text style={styles.content}>Def.</Text>
        <Text style={styles.content}>
          Es un juicio auto regulado, autónomo y concreto que permite la
          evaluación, análisis y síntesis de información, promoviendo la
          fundamentación de ideas y la resolución de problemas en contextos
          cambiantes, con altos niveles de información. El pensamiento reflexivo
          considera el contexto para su evaluación, utiliza criterios y es
          metacognitivo.
        </Text>
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
