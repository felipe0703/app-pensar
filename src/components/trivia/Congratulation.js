import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';

export default function Congratulation({navigation}) {
  const go = () => {
    navigation.navigate('home');
  };
  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.title}>🎉¡Felicidades!🎉</Text>
        <Text style={styles.content}>Terminaste el primer desafío</Text>
      </View>
      <View style={styles.viewBtns}>
        <Button
          onPress={go}
          title="Continuar"
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewBtns: {
    flexDirection: 'row',
  },
  btn: {
    borderRadius: 10,
    backgroundColor: '#c2ddc7',
    paddingVertical: 10,
  },
  btnContainer: {
    width: 150,
    marginVertical: 30,
    marginHorizontal: 10,
  },
  btnText: {
    color: '#196674',
    marginHorizontal: 10,
  },
});
