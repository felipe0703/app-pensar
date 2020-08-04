import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Intro1(props) {
  const {NextText} = props;
  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.title}>Hola</Text>
        <Text style={styles.content}>Hoy comienza tu aventura</Text>
        <Text style={styles.content}>¡Felicidades!</Text>
      </View>
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
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  content: {
    color: '#fff',
    marginVertical: 20,
    fontSize: 18,
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
  },
});
