import React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Arguments({route, navigation}) {
  const {challenge} = route.params;
  const {thesis1} = challenge;
  const argument = thesis1.arguments;
  console.log(argument);

  const goAgainstArguments = () => {
    navigation.navigate('against-arguments', {challenge});
  };

  const renderArgument = (argument) => {
    <Text>{argument} </Text>;
  };

  return (
    <ScrollView style={styles.viewBody}>
      {argument.map((argument, index) => (
        <Text style={styles.argument}>
          {index + 1} ) {argument}
        </Text>
      ))}

      {/* <FlatList data={argument} renderItem={renderArgument}  /> */}

      <View style={styles.viewBtns}>
        <Button
          onPress={goAgainstArguments}
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
