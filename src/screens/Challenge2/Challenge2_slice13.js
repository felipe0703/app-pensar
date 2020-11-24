import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {ChallengeContext} from '../../contexts/ChallengeContext';
import {
  challenge2Text_13,
  challege2Text_4_1,
  challege2Text_4_2,
  challege2Text_4_3,
} from './challenge2text';
import globalStyles from '../../styles/global';

export default function Challenge2_slice13({
  previousText,
  nextText,
  navigation,
}) {
  const {challenge} = useContext(ChallengeContext);
  const {
    argument,
    counterargument,
    proposal,
    selectionURL,
    thesis,
    conclusion,
    slant,
  } = challenge;
  const [proposalAsync, setProposalAsync] = useState('');
  const [selectionURLAsync, setSelectionURLAsync] = useState([]);
  const [thesisAsync, setThesisAsync] = useState('');
  const [argumentAsync, setArgumentAsync] = useState([]);
  const [counterargumentAsync, setCounterargumentAsync] = useState([]);
  const [conclusionAsync, setConclusionAsync] = useState('');
  const [slantAsync, setSlantAsync] = useState('');

  useEffect(() => {
    storeData('@page_challenge_2', '13');
    getData();
  }, []);

  useEffect(() => {
    navigation.setParams({name: 'Sesgo', progress: 1});
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
      if (proposal === undefined) {
        const value = await AsyncStorage.getItem(
          '@challenge_2_slice4_question',
        );
        const prop = JSON.parse(value);
        if (prop === 1) {
          setProposalAsync(challege2Text_4_1);
        } else if (prop === 2) {
          setProposalAsync(challege2Text_4_2);
        } else if (prop === 3) {
          setProposalAsync(challege2Text_4_3);
        }
      }

      if (selectionURL === undefined) {
        const value1 = await AsyncStorage.getItem('@challenge_2_slice5_data');
        const urls = JSON.parse(value1);
        if (urls !== null) {
          setSelectionURLAsync(urls[0]);
        }
      }

      if (thesis === undefined) {
        const value = await AsyncStorage.getItem('@challenge_2_slice6_tesis');
        const thesi = JSON.parse(value);
        if (thesi !== '') setThesisAsync(thesi);
      }

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

      if (conclusion === undefined) {
        const value3 = await AsyncStorage.getItem(
          '@challenge_2_slice11_conclusion',
        );
        const conclu = JSON.parse(value3);
        if (conclu !== '') setConclusionAsync(conclu);
      }

      if (slant === undefined) {
        const value = await AsyncStorage.getItem('@challenge_2_slice12_sesgo');
        const sla = JSON.parse(value);
        if (sla !== '') setSlantAsync(sla);
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
        <Text style={globalStyles.title}>{challenge2Text_13}</Text>
        <View style={globalStyles.viewOptions}>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Propuesta:</Text>
            <Text style={styles.tick}>
              ✔{' '}
              {proposal !== undefined ? (
                <Text style={styles.argument}> {proposal}</Text>
              ) : (
                <Text style={styles.argument}> {proposalAsync}</Text>
              )}
            </Text>
          </View>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Selección de información:</Text>
            {selectionURL !== undefined
              ? selectionURL.map((item, index) => (
                  <Text key={index} style={styles.tick}>
                    ✔ <Text style={styles.argument}>{item.url}</Text>
                  </Text>
                ))
              : selectionURLAsync.map((item, index) => (
                  <Text key={index} style={styles.tick}>
                    ✔ <Text style={styles.argument}>{item.url}</Text>
                  </Text>
                ))}
          </View>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Tesis:</Text>
            <Text style={styles.tick}>
              ✔{' '}
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
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Sesgo:</Text>
            <Text style={styles.tick}>
              ✔{' '}
              {slant !== undefined ? (
                <Text style={styles.argument}>{slant}</Text>
              ) : (
                <Text style={styles.argument}>{slantAsync}</Text>
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
