import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

export default function HeaderBar({name, progress}) {
  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      <ProgressBar
        animationType="timing"
        backgroundColor="#c3c3c3"
        borderRadius={10}
        borderWidth={0}
        color="#F2A922"
        height={9}
        indeterminate={false}
        indeterminateAnimationDuration={1000}
        progress={progress}
        progress={progress}
        useNativeDriver={true}
        width={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: '#c3c3c3',
    marginBottom: 5,
  },
});
