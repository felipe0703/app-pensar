import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ShowInfo from '../Challenge/ShowInfo';

export default function Thesis({challenge, navigation}) {
  const {thesis1, thesis2, approach} = challenge;
  const {text, conclusion} = thesis1;
  //   const arguments = thesis1.arguments;
  const thesisText = [approach, text];

  const goChallenge = () => {
    navigation.navigate('arguments', {challenge});
  };

  return <ShowInfo text={thesisText} go={goChallenge} />;
}

const styles = StyleSheet.create({});
