import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AgainstArguments({route, navigation}) {
  const {challenge} = route.params;
  const {thesis2} = challenge;
  const argument = thesis2.arguments;

  const goConclusion = () => {
    navigation.navigate('home');
  };

  return (
    <ScrollView style={styles.viewBody}>
      {argument.map((argument, index) => (
        <Text style={styles.argument}>
          {index + 1}) {argument}
        </Text>
      ))}
      <View style={styles.viewBtns}>
        <Button
          onPress={goConclusion}
          title="siguiente"
          icon={<Icon name="arrow-right" size={15} color="#196674" />}
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
          iconRight
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    padding: 30,
  },
  argument: {
    marginBottom: 20,
    textAlign: 'justify',
    color: '#000',
    backgroundColor: '#fff',
    padding: 10,
  },
  viewBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
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
