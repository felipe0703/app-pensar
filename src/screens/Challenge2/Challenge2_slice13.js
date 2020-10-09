import React, {useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ChallengeContext} from '../../navigations/ChallengeContext';
import {challenge2Text_13} from './challenge2text';
import globalStyles from '../../styles/global';

export default function Challenge2_slice13({nextText}) {
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
              ✔ <Text style={styles.argument}>{proposal}</Text>
            </Text>
          </View>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Selección de información:</Text>
            {selectionURL.map((item, index) => (
              <Text key={index} style={styles.tick}>
                ✔ <Text style={styles.argument}>{item.url}</Text>
              </Text>
            ))}
          </View>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Tesis:</Text>
            <Text style={styles.tick}>
              ✔ <Text style={styles.argument}>{thesis}</Text>
            </Text>
          </View>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Argumentos:</Text>
            {argument.map((item, index) => (
              <Text key={index} style={styles.tick}>
                ✔ <Text style={styles.argument}>{item.argument}</Text>
              </Text>
            ))}
          </View>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Contra-argumentos:</Text>
            {counterargument.map((item, index) => (
              <Text key={index} style={styles.tick}>
                ✔ <Text style={styles.argument}>{item.argument}</Text>
              </Text>
            ))}
          </View>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Conclusión:</Text>
            <Text style={styles.tick}>
              ✔ <Text style={styles.argument}>{conclusion}</Text>
            </Text>
          </View>
          <View style={styles.viewArgument}>
            <Text style={styles.title}>Sesgo:</Text>
            <Text style={styles.tick}>
              ✔ <Text style={styles.argument}>{slant}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={nextText}
          title="Siguiente"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
          icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
          iconRight
        />
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
});
