import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Challenge2_slice1 from './Challenge2_slice1';
import Challenge2_slice2 from './Challenge2_slice2';
import Challenge2_slice3 from './Challenge2_slice3';
import Challenge2_slice4 from './Challenge2_slice4';
import Challenge2_slice5 from './Challenge2_slice5';
import Challenge2_slice6 from './Challenge2_slice6';
import Challenge2_slice7 from './Challenge2_slice7';
import Challenge2_slice8 from './Challenge2_slice8';
import Challenge2_slice9 from './Challenge2_slice9';
import Challenge2_slice10 from './Challenge2_slice10';
import Challenge2_slice11 from './Challenge2_slice11';
import Challenge2_slice12 from './Challenge2_slice12';
import Challenge2_slice13 from './Challenge2_slice13';
import Challenge2_slice14 from './Challenge2_slice14';

export default function ChallengeController2({navigation}) {
  const [slice, setSlice] = useState(0);

  const nextText = () => {
    setSlice(slice + 1);
  };

  const previousText = () => {
    setSlice(slice - 1);
  };

  return (
    <View style={styles.viewBody}>
      {slice === 0 && (
        <Challenge2_slice1 nextText={nextText} setSlice={setSlice} />
      )}
      {slice === 1 && (
        <Challenge2_slice2 previousText={previousText} nextText={nextText} />
      )}
      {slice === 2 && (
        <Challenge2_slice3 previousText={previousText} nextText={nextText} />
      )}
      {slice === 3 && (
        <Challenge2_slice4
          previousText={previousText}
          nextText={nextText}
          navigation={navigation}
        />
      )}
      {slice === 4 && (
        <Challenge2_slice5
          previousText={previousText}
          nextText={nextText}
          navigation={navigation}
        />
      )}
      {slice === 5 && (
        <Challenge2_slice6
          previousText={previousText}
          nextText={nextText}
          navigation={navigation}
        />
      )}
      {slice === 6 && (
        <Challenge2_slice7
          previousText={previousText}
          nextText={nextText}
          navigation={navigation}
        />
      )}
      {slice === 7 && (
        <Challenge2_slice8
          previousText={previousText}
          nextText={nextText}
          navigation={navigation}
        />
      )}
      {slice === 8 && (
        <Challenge2_slice9
          previousText={previousText}
          nextText={nextText}
          navigation={navigation}
        />
      )}
      {slice === 9 && (
        <Challenge2_slice10
          previousText={previousText}
          nextText={nextText}
          navigation={navigation}
        />
      )}
      {slice === 10 && (
        <Challenge2_slice11
          previousText={previousText}
          nextText={nextText}
          navigation={navigation}
        />
      )}
      {slice === 11 && (
        <Challenge2_slice12
          previousText={previousText}
          nextText={nextText}
          navigation={navigation}
        />
      )}
      {slice === 12 && (
        <Challenge2_slice13
          previousText={previousText}
          nextText={nextText}
          navigation={navigation}
        />
      )}
      {slice === 13 && <Challenge2_slice14 navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {flex: 1},
});
