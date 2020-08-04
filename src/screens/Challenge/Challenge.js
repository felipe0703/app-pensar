import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Image} from 'react-native-elements';
import Loading from '../../components/Loading';

import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get('window').width;

export default function Challenge(props) {
  const {navigation, route} = props;
  const {id, nombre} = route.params;
  const [challenge, setChallenge] = useState(null);
  console.log(challenge);

  navigation.setOptions({title: nombre});

  useEffect(() => {
    db.collection('challenges')
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setChallenge(data);
      });
  }, []);

  if (!challenge) return <Loading isVisible={true} text="Cargando" />;

  return (
    <ScrollView vertical style={styles.viewBody}>
      <Image
        resizeMode="cover"
        PlaceholderContent={<ActivityIndicator color="#ffc800" />}
        source={
          challenge.image
            ? {uri: challenge.image}
            : require('../../assets/img/image.png')
        }
        style={styles.imageChallenge}
      />
      <TitleChallenge
        name={challenge.nombre}
        description={challenge.descripcion}
      />
    </ScrollView>
  );
}

function TitleChallenge(props) {
  const {name, description} = props;

  return (
    <View style={styles.viewChallengeTitle}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.nameChallenge}>{name}</Text>
      </View>
      <Text style={styles.descriptionChallenge}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageChallenge: {
    width: screenWidth,
    height: 250,
  },
  viewChallengeTitle: {
    padding: 15,
  },
  nameChallenge: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionChallenge: {
    marginTop: 5,
    color: '#c3c3c3',
  },
});
