import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Image} from 'react-native-elements';
import {firebaseApp} from '../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import {useFocusEffect} from '@react-navigation/native';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CorouselChallenge({navigation}) {
  const [logs, setLogs] = useState([]);
  const [idLog, setIdLog] = useState('');

  useFocusEffect(
    useCallback(() => {
      db.collection('new_logs')
        .where('idUser', '==', firebaseApp.auth().currentUser.uid)
        .get()
        .then((response) => {
          const data = response.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data().challenge,
            };
          });
          setLogs(data[0].data);
          setIdLog(data[0].id);
        });
    }, []),
  );

  const newChallenges = [
    {
      id: 0,
      order: 0,
      name: 'Introducción',
      description: 'Esta es el inicio de tu viaje',
      image: '../assets/img/challenge/brainstorming.png',
    },
    {
      id: 1,
      order: 1,
      name: 'Desafío 1',
      description: 'En este desafío, descubrirás como se realiza una tesis',
      // image:
      //   'https://firebasestorage.googleapis.com/v0/b/pensamiento-critico.appspot.com/o/challenges%2F94a39a67-6b26-446b-b731-a94f1dc85a5b.jpg?alt=media&token=efa22293-c255-4980-a8d2-a06249872cf3',
      image: '../assets/img/challenge/brainstorming.png',
    },
    {
      id: 2,
      order: 2,
      name: 'Desafío 2',
      description: 'Segundo desafío',
      // image:
      //   'https://firebasestorage.googleapis.com/v0/b/pensamiento-critico.appspot.com/o/challenges%2Fbfb010c7-d1da-4bed-9e08-604153cf3596.jpg?alt=media&token=96df8cd8-f0ab-43d9-a3c8-0225daf99106',
      image: '../assets/img/challenge/brainstorming.png',
    },
  ];

  const renderItem = ({item}) => {
    const {name, description, image, id} = item;
    const onNavigation = () => {
      if (id === 0) {
        // introducción
        const payload = {
          challenge: [
            ...logs,
            {
              name: 'Introducción',
              state: 'Iniciado',
              stage: '',
              time: Date.now(),
              context: 'Ingreso a la introducción del pensamiento crítico',
              action: 'seleccionar desafío',
            },
          ],
        };
        db.collection('new_logs')
          .doc(idLog)
          .update(payload)
          .then(() => {
            navigation.navigate('introduction');
          });
      } else if (id === 1) {
        const payload = {
          challenge: [
            ...logs,
            {
              name: 'Desafío 1',
              state: 'Iniciado',
              stage: '',
              time: Date.now(),
              context: 'Ingreso al desafío 1',
              action: 'seleccionar desafío',
            },
          ],
        };
        db.collection('new_logs')
          .doc(idLog)
          .update(payload)
          .then(() => {
            navigation.navigate('challenge', {id, name, progress: 0.14});
          });
      } else {
        const payload = {
          challenge: [
            ...logs,
            {
              name: 'Desafío 2',
              state: 'Iniciado',
              stage: '',
              time: Date.now(),
              context: 'Ingreso al desafío 2',
              action: 'seleccionar desafío',
            },
          ],
        };
        db.collection('new_logs')
          .doc(idLog)
          .update(payload)
          .then(() => {
            navigation.navigate('challenge2', {id, name, progress: 0.14});
          });
      }
    };

    return (
      <TouchableWithoutFeedback onPress={onNavigation}>
        <View style={styles.card}>
          <Text style={styles.title}>{name} 😁</Text>
          <Image
            resizeMode="contain"
            PlaceholderContent={<ActivityIndicator color="#196674" />}
            // source={image ? {uri: image} : require('../assets/img/image.png')}
            // source={require('../assets/img/challenge/brainstorming.png')}
            source={
              id === 0
                ? require('../assets/img/challenge/thinking.png')
                : id === 1
                ? require('../assets/img/challenge/brainstorming.png')
                : require('../assets/img/challenge/creative_process.png')
            }
            style={styles.imageChallenge}
          />
          <Text style={styles.description}>
            {description.substring(0, 60)}...
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Carousel
      layout={'default'}
      data={newChallenges}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 0.9,
    backgroundColor: '#f2f2f2',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#196674',
  },
  imageChallenge: {
    width: 250,
    height: 150,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  description: {
    marginVertical: 20,
    paddingHorizontal: 30,
    textAlign: 'center',
    color: '#196674',
    fontSize: 15,
  },
});
