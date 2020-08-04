import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import Challenge1 from './Challenge1';
import Challenge2 from './Challenge2';
import Challenge3 from './Challenge3';
import Challenge4 from './Challenge4';
import Challenge5 from './Challenge5';
import Challenge6 from './Challenge6';
import Challenge7 from './Challenge7';
import Challenge8 from './Challenge8';
import Challenge9 from './Challenge9';
import Challenge10 from './Challenge10';

export default function ControllerChallenge(props) {
  const {navigation} = props;
  const [slice, setSlice] = useState(0);

  const nextText = () => {
    setSlice(slice + 1);
  };

  const previousText = () => {
    setSlice(slice - 1);
  };

  return (
    <View style={styles.viewBody}>
      {slice === 0 && <Challenge1 nextText={nextText} />}
      {slice === 1 && <Challenge2 nextText={nextText} />}
      {slice === 2 && <Challenge3 nextText={nextText} />}
      {slice === 3 && <Challenge4 nextText={nextText} />}
      {slice === 4 && <Challenge5 nextText={nextText} />}
      {slice === 5 && <Challenge6 nextText={nextText} />}
      {slice === 6 && <Challenge7 nextText={nextText} />}
      {slice === 7 && <Challenge8 nextText={nextText} />}
      {slice === 8 && <Challenge9 nextText={nextText} />}
      {slice === 9 && (
        <Challenge10 nextText={nextText} navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {flex: 1},
});
