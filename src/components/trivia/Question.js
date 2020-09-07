import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Question() {
  return (
    <View style={styles.viewBody}>
      <View style={styles.viewContent}>
        <Text style={styles.content}>{question}</Text>
      </View>
      <View style={styles.viewBtns}>
        <Button
          onPress={() => resp(true)}
          title="Verdadero"
          icon={<Icon name="thumbs-o-up" size={15} color="#196674" />}
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
        />
        <Button
          onPress={() => resp(false)}
          title="Falso"
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
          icon={<Icon name="thumbs-o-down" size={15} color="#196674" icon />}
          iconRight
        />
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <View style={correct ? styles.correct : styles.incorrect}>
          <Text style={styles.textTitleFeedback}>{feedbackTitle}</Text>
          <Text style={styles.textFeedback}>{feedback}</Text>
          <Button
            // onPress={go}
            title="test"
            buttonStyle={styles.btn}
            containerStyle={styles.btnContainer}
            titleStyle={styles.btnText}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
