import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
import Challenge11 from './Challenge11';
import Challenge12 from './Challenge12';
import Challenge13 from './Challenge13';
import Challenge14 from './Challenge14';
import Challenge15 from './Challenge15';
import Challenge16 from './Challenge16';
import Challenge17 from './Challenge17';
import Challenge18 from './Challenge18';

export default function ControllerChallenge({navigation}) {
  const [slice, setSlice] = useState(0);
  const [thesis, setThesis] = useState({});

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
      {slice === 9 && <Challenge10 nextText={nextText} setThesis={setThesis} />}
      {slice === 10 && <Challenge11 nextText={nextText} />}
      {slice === 11 && <Challenge12 nextText={nextText} thesis={thesis} />}
      {slice === 12 && <Challenge13 nextText={nextText} />}
      {slice === 13 && <Challenge14 nextText={nextText} thesis={thesis} />}
      {slice === 14 && <Challenge15 nextText={nextText} />}
      {slice === 15 && <Challenge16 nextText={nextText} />}
      {slice === 16 && <Challenge17 nextText={nextText} />}
      {slice === 17 && <Challenge18 navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {flex: 1},
});
