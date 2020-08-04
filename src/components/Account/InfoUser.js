import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';

export default function InfoUser(props) {
  const {
    userInfo: {photoUrl, displayName, email},
  } = props;

  const changeAvatar = () => {
    console.log('Canche Avatar...');
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showAccessory={false}
        onAccessoryPress={() => changeAvatar()}
        containerStyle={StyleSheet.userInfoAvatar}
        source={
          photoUrl
            ? {uri: photoUrl}
            : require('../../assets/img/avatar-default.jpg')
        }
      />
      <View style={styles.displayInfo}>
        <Text style={styles.displayName}>
          {displayName ? displayName : 'Anónimo'}
        </Text>
        <Text style={styles.displayEmail}>
          {email ? email : 'Social Login'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayInfo: {
    marginLeft: 20,
  },
  displayName: {
    fontWeight: 'bold',
    paddingBottom: 5,
    color: '#3c3c3c',
  },
  displayEmail: {
    color: '#3c3c3c',
  },
});
