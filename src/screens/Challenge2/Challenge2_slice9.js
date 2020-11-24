import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {challege2Text_9} from './challenge2text';
import globalStyles from '../../styles/global';
import {ChallengeContext} from '../../contexts/ChallengeContext';

export default function Challenge2_slice9({
  previousText,
  nextText,
  navigation,
}) {
  const {challenge} = useContext(ChallengeContext);
  const {argument, counterargument} = challenge;
  const [argumentAsync, setArgumentAsync] = useState([]);
  const [counterargumentAsync, setCounterargumentAsync] = useState([]);

  useEffect(() => {
    storeData('@page_challenge_2', '9');
    getData();
  }, []);

  useEffect(() => {
    navigation.setParams({name: 'Contraargumentos', progress: 0.7});
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      if (argument === undefined) {
        const value1 = await AsyncStorage.getItem('@challenge_2_slice7_data');
        const arg = JSON.parse(value1);
        if (arg !== null) {
          setArgumentAsync(arg[0]);
        }
      }
      if (counterargument === undefined) {
        const value2 = await AsyncStorage.getItem('@challenge_2_slice8_data');
        const counter = JSON.parse(value2);
        if (counter !== null) {
          setCounterargumentAsync(counter[0]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={globalStyles.viewBody}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
          marginLeft: 20,
          marginRight: 30,
        }}>
        <Text style={globalStyles.title}>{challege2Text_9}</Text>
        <View style={globalStyles.viewOptions}>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Argumentos:</Text>
            {argument !== undefined
              ? argument.map((item, index) => (
                  <Text key={index} style={styles.tick}>
                    ✔ <Text style={styles.argument}>{item.argument}</Text>
                  </Text>
                ))
              : argumentAsync.map((item, index) => (
                  <Text key={index} style={styles.tick}>
                    ✔ <Text style={styles.argument}>{item.argument}</Text>
                  </Text>
                ))}
          </View>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Contra-argumentos:</Text>
            {counterargument !== undefined
              ? counterargument.map((item, index) => (
                  <Text key={index} style={styles.tick}>
                    ✔ <Text style={styles.argument}>{item.argument}</Text>
                  </Text>
                ))
              : counterargumentAsync.map((item, index) => (
                  <Text key={index} style={styles.tick}>
                    ✔ <Text style={styles.argument}>{item.argument}</Text>
                  </Text>
                ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.viewBtns}>
        <View style={{marginTop: 5}}>
          <Icon name="arrow-down" size={15} color="#fff" icon />
        </View>
        <View style={globalStyles.viewBtns}>
          <Button
            onPress={previousText}
            title="Anterior"
            buttonStyle={globalStyles.btn}
            containerStyle={styles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-left" size={15} color="#196674" icon />}
          />
          <Button
            onPress={nextText}
            title="Siguiente"
            buttonStyle={globalStyles.btn}
            containerStyle={styles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  argument: {
    color: '#3c3c3c',
    marginBottom: 10,
    textAlign: 'justify',
  },
  btnContainer: {
    width: 150,
    marginBottom: 25,
    marginTop: 10,
    marginHorizontal: 10,
  },
  textModal: {
    marginBottom: 10,
    textAlign: 'justify',
  },
  tick: {
    color: '#F2A922',
  },
  title: {
    color: '#3c3c3c',
    fontSize: 18,
    marginBottom: 10,
  },
  viewArgument: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
  },
  viewBtns: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
