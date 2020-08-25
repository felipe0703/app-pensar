import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Challenges from '../screens/Challenges';
import Challenge from '../screens/Challenge/ChallengeTest';
import Thesis from '../screens/Challenge1/Thesis';

const Stack = createStackNavigator();

export default function ChallengesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="challenges"
        component={Challenges}
        options={{title: 'Desafíos'}}
      />
      <Stack.Screen name="challenge" component={Challenge} />
    </Stack.Navigator>
  );
}
