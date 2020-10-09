import React, {useContext} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {challengeText_17} from './challengeText';
import {ChallengeContext} from '../../navigations/ChallengeContext';
import globalStyles from '../../styles/global';

export default function Challenge17({nextText}) {
  const {challenge} = useContext(ChallengeContext);
  const {argument, counterargument, conclusion, thesis} = challenge;

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
              ✔<Text style={styles.argument}> {thesis}</Text>
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
