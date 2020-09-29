import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Challenge from '../screens/Challenge1/ChallengeController';
import Challenge2 from '../screens/Challenge2/ChallengeController2';
import Thesis from '../screens/Challenge1/Thesis';
import Arguments from '../screens/Challenge1/Arguments';
import AgainstArguments from '../screens/Challenge1/AgainstArguments';
import Introduction from '../screens/Intro/Introduction_1';
import FeedbackIntro from '../screens/Intro/Introduction_2';
import Introduction_3 from '../screens/Intro/Introduction_3';
import Introduction_4 from '../screens/Intro/Introduction_4';
import Introduction_5 from '../screens/Intro/Introduction_5';
import Introduction_6 from '../screens/Intro/Introduction_6';
import Introduction_7 from '../screens/Intro/Introduction_7';
import Trivia from '../components/trivia/Trivia';
import Congratulation from '../components/trivia/Congratulation';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="home" component={Home} options={{title: 'Inicio'}} />
      <Stack.Screen
        name="challenge"
        component={Challenge}
        options={{title: 'Desafío 1'}}
      />
      <Stack.Screen
        name="challenge2"
        component={Challenge2}
        options={{title: 'Desafío 2'}}
      />
      <Stack.Screen
        name="introduction"
        component={Introduction}
        options={{title: 'Introducción'}}
      />
      <Stack.Screen
        name="feedback-intro"
        component={FeedbackIntro}
        options={{title: 'Introducción'}}
      />
      <Stack.Screen
        name="introduction_3"
        component={Introduction_3}
        options={{title: 'Introducción'}}
      />
      <Stack.Screen
        name="introduction_4"
        component={Introduction_4}
        options={{title: 'Introducción'}}
      />
      <Stack.Screen
        name="introduction_5"
        component={Introduction_5}
        options={{title: 'Introducción'}}
      />
      <Stack.Screen
        name="introduction_6"
        component={Introduction_6}
        options={{title: 'Introducción'}}
      />
      <Stack.Screen
        name="introduction_7"
        component={Introduction_7}
        options={{title: 'Introducción'}}
      />
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
      <Stack.Screen
        name="trivia"
        component={Trivia}
        options={{title: 'Trivia'}}
      />
      <Stack.Screen
        name="congratulation"
        component={Congratulation}
        options={{title: 'Trivia'}}
      />
    </Stack.Navigator>
  );
}
