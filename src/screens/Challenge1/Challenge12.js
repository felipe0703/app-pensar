import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  challengeText_12_1,
  challengeText_12_2,
  challengeText_12_3,
} from './challengeText';
import Argument from './Argument';

export default function Challenge12({nextText, thesis}) {
  const {thesis1, thesis2} = challengeText_12_3;
  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.title}>{challengeText_12_1}</Text>
        <Text style={styles.content}>{challengeText_12_2}</Text>
        <ScrollView>
          {thesis === 1 &&
            thesis1.map((text, id) => (
              <Argument key={id} id={id} text={text} />
            ))}
          {thesis === 2 &&
            thesis2.map((text, id) => (
              <Argument key={id} id={id} text={text} />
            ))}
        </ScrollView>
      </View>
      <View style={styles.viewBtns}>
        <Button
          onPress={nextText}
          title="Siguiente"
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
          icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
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
    marginBottom: 10,
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
    marginBottom: 30,
    marginTop: 10,
    marginHorizontal: 10,
  },
  btnText: {
    color: '#196674',
    marginHorizontal: 10,
  },
});
