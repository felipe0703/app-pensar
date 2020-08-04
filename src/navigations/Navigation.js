import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import ChallengesStack from './ChallengesStack';
import HomeStack from './HomeStack';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: '#0E0326',
    background: '#196674',
    card: '#196674',
    text: 'white',
    border: '#0E0326',
    notification: '#0E0326',
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        initialRouteName="home"
        tabBarOptions={{
          showLabel: false,
          inactiveTintColor: '#777',
          activeTintColor: '#196674',
          activeBackgroundColor: '#C2DDC7',
          inactiveBackgroundColor: '#C2DDC7',
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => screenOptions(route, focused),
        })}>
        <Tab.Screen
          name="home"
          component={HomeStack}
          options={{
            title: 'Inicio',
          }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{title: 'Cuenta'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, focused) {
  let iconName;
  let color;

  switch (route.name) {
    case 'account':
      iconName = focused ? 'account-circle' : 'account-circle-outline';
      color = focused ? '#196674' : '#777';
      break;
    case 'home':
      iconName = focused ? 'home' : 'home-outline';
      color = focused ? '#196674' : '#777';
      break;
    case 'challenges':
      iconName = focused ? 'alert-decagram' : 'alert-decagram-outline';
      color = focused ? '#ffc800' : '#777';
      break;
    default:
      break;
  }

  return (
    <Icon type="material-community" name={iconName} size={30} color={color} />
  );
}
