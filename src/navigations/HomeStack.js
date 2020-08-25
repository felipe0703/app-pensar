import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Challenge from '../screens/Challenge/ChallengeTest';
import Thesis from '../screens/Challenge1/Thesis';
import Arguments from '../screens/Challenge1/Arguments';
import AgainstArguments from '../screens/Challenge1/AgainstArguments';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} options={{title: 'Inicio'}} />
      <Stack.Screen name="challenge" component={Challenge} />
      <Stack.Screen
        name="thesis"
        component={Thesis}
        options={{title: 'Tesis'}}
      />
      <Stack.Screen
        name="arguments"
        component={Arguments}
        options={{title: 'Argumentos'}}
      />
      <Stack.Screen
        name="against-arguments"
        component={AgainstArguments}
        options={{title: 'Contra Argumentos'}}
      />
    </Stack.Navigator>
  );
}
