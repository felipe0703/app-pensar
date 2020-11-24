import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {
  challengeText_17,
  challengeText_10_3,
  challengeText_10_4,
  challengeText_16_3,
  challengeText_16_4,
} from './challengeText';
import {ChallengeContext} from '../../contexts/ChallengeContext';
import globalStyles from '../../styles/global';

export default function Challenge17({previousText, nextText, navigation}) {
  const {challenge} = useContext(ChallengeContext);
  const {argument, counterargument, conclusion, thesis} = challenge;
  const [argumentAsync, setArgumentAsync] = useState([]);
  const [counterargumentAsync, setCounterargumentAsync] = useState([]);
  const [conclusionAsync, setConclusionAsync] = useState('');
  const [thesisAsync, setThesisAsync] = useState('');

  useEffect(() => {
    storeData('@page_challenge_1', '17');
    getData();
  }, []);

  useEffect(() => {
    navigation.setParams({name: 'Conclusión', progress: 0.84});
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
        const value1 = await AsyncStorage.getItem('@challenge_1_slice12_data');
        const arg = JSON.parse(value1);
        if (arg !== null) {
          setArgumentAsync(arg[1]);
        }
      }

      if (counterargument === undefined) {
        const value2 = await AsyncStorage.getItem('@challenge_1_slice14_data');
        const counter = JSON.parse(value2);
        if (counter !== null) {
          setCounterargumentAsync(counter[1]);
        }
      }

      if (conclusion === undefined) {
        const value3 = await AsyncStorage.getItem(
          '@challenge_1_slice16_conclusion',
        );
        const conclu = JSON.parse(value3);
        if (conclu === 1) {
          setConclusionAsync(challengeText_16_3);
        } else if (conclu === 2) {
          setConclusionAsync(challengeText_16_4);
        }
      }

      if (thesis === undefined) {
        const value = await AsyncStorage.getItem('@challenge_1_slice10_thesis');
        const thesi = JSON.parse(value);
        if (thesi === 1) {
          setThesisAsync(challengeText_10_3);
        } else if (thesi === 2) {
          setThesisAsync(challengeText_10_4);
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
        <Text style={globalStyles.title}>{challengeText_17}</Text>
        <View style={globalStyles.viewOptions}>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Tesis:</Text>
            <Text style={styles.tick}>
              ✔
              {thesis !== undefined ? (
                <Text style={styles.argument}> {thesis}</Text>
              ) : (
                <Text style={styles.argument}> {thesisAsync}</Text>
              )}
            </Text>
          </View>
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
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Conclusión:</Text>
            <Text style={styles.tick}>
              ✔{' '}
              {conclusion !== undefined ? (
                <Text style={styles.argument}>{conclusion}</Text>
              ) : (
                <Text style={styles.argument}>{conclusionAsync}</Text>
              )}
            </Text>
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
