import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Challenge from '../screens/Challenge/ChallengeTest';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} options={{title: 'Inicio'}} />
      <Stack.Screen name="challenge" component={Challenge} />
    </Stack.Navigator>
  );
}
