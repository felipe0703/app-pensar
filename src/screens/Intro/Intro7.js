import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Intro7(props) {
  const {navigation} = props;
  const goChallenge = () => {
    navigation.navigate('home');
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.content}>¿Quieres ir al primer desafío?</Text>
      </View>
      <Button
        title=" Vamos"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        titleStyle={styles.btnText}
        onPress={goChallenge}
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
