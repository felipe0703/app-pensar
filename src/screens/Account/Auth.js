import React, {useState, useRef} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Toast from 'react-native-easy-toast';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const toastRef = useRef();

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.viewBody}>
      <View>
        <Image
          style={styles.logo}
          source={require('../../assets/img/image.png')}
        />
        {isLogin ? (
          <LoginForm changeForm={changeForm} />
        ) : (
          <RegisterForm changeForm={changeForm} toastRef={toastRef} />
        )}
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 240,
    resizeMode: 'contain',
    marginTop: 50,
    marginBottom: 50,
  },
});
