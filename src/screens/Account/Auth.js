import React, {useState, useRef} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Toast from 'react-native-easy-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const toastRef = useRef();

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.viewBody}>
        <View>
          <Text style={styles.title}>PENSAR</Text>
          <Image
            style={styles.logo}
            source={require('../../assets/img/cerebrito/cerebro-saludando-rosa.png')}
          />
        </View>
        {isLogin ? (
          <LoginForm changeForm={changeForm} />
        ) : (
          <RegisterForm changeForm={changeForm} toastRef={toastRef} />
        )}
        <Toast ref={toastRef} position="center" opacity={0.9} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 200,
    resizeMode: 'contain',
    maxWidth: 180,
    marginBottom: 20,
  },
  title: {
    marginTop: 30,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewBody: {
    flex: 1,
    alignItems: 'center',
  },
});
