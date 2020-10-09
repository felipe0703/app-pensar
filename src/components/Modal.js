import React from 'react';
import {StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';

export default function Modal(props) {
  const {
    isVisible,
    setIsVisible,
    children,
    backPrees = true,
    withPadding = false,
  } = props;

  const closeModal = () => {
    if (backPrees) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={withPadding ? styles.overlay2 : styles.overlay}
      onBackdropPress={closeModal}>
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 'auto',
    width: '90%',
  },
  overlay2: {
    height: 'auto',
    width: '90%',
    // margin: 0,
    padding: 0,
  },
});
