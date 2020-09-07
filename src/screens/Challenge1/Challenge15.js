import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  challengeText_15_1,
  challengeText_15_2,
  challengeText_15_3,
  challengeText_15_4,
} from './challengeText';

export default function Challenge15({nextText}) {
  const [showNext, setShowNext] = useState(false);
  const [checkedThesis1, setCheckedThesis1] = useState(false);
  const [checkedThesis2, setCheckedThesis2] = useState(false);

  const resp = (thesis) => {
    if (thesis === 1) {
      setCheckedThesis1(true);
      setCheckedThesis2(false);
    } else if (thesis === 2) {
      setCheckedThesis1(false);
      setCheckedThesis2(true);
    }
    setShowNext(true);
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.title}>{challengeText_15_1}</Text>
        <Text style={styles.content}>{challengeText_15_2}</Text>
        <View style={styles.viewOptions}>
          <CheckBox
            title={challengeText_15_3}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedThesis1}
            // checkedColor="red"
            onPress={() => resp(1)}
          />
          <CheckBox
            title={challengeText_15_4}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedThesis2}
            onPress={() => resp(2)}
          />
        </View>
      </View>
      <View style={styles.viewBtns}>
        {showNext && (
          <Button
            onPress={nextText}
            title="Siguiente"
            buttonStyle={styles.btn}
            containerStyle={styles.btnContainer}
            titleStyle={styles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        )}
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
  viewOptions: {
    marginVertical: 20,
  },
  touchable: {
    backgroundColor: '#fff',
    marginVertical: 10,
    width: 350,
    padding: 10,
    borderRadius: 8,
  },
  textInfo: {
    color: '#3c3c3c',
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
  textFeedback: {
    marginVertical: 10,
  },
});
