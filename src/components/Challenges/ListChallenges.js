import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native-elements';
import {size} from 'lodash';
import {useNavigation} from '@react-navigation/native';

export default function ListChallenges(props) {
  const {challenges, handleLoadMore, isLoading} = props;
  const navigation = useNavigation();
  //   const challenges = [];
  return (
    <View>
      {size(challenges) > 0 ? (
        <FlatList
          data={challenges}
          renderItem={(challenge) => (
            <Challenge challenge={challenge} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderChallenges}>
          <ActivityIndicator size="large" color="#ffc800" />
          <Text>Cargando Desafíos</Text>
        </View>
      )}
    </View>
  );
}

function Challenge(props) {
  const {challenge, navigation} = props;
  const {id, image, nombre, descripcion, available} = challenge.item;
  const imageChallenge = image;

  const goChallenge = () => {
    navigation.navigate('challenge', {
      id,
      nombre,
    });
  };
  return (
    <TouchableOpacity onPress={goChallenge}>
      <View style={styles.viewChallenge}>
        <View style={styles.viewChallengeImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#ffc800" />}
            source={
              imageChallenge
                ? {uri: imageChallenge}
                : require('../../assets/img/image.png')
            }
            style={styles.imageChallenge}
          />
        </View>
        <View>
          <Text style={styles.challengeName}>{nombre}</Text>
          <Text style={styles.challengeDescription}>
            {descripcion.substr(0, 60)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const {isLoading} = props;

  if (isLoading) {
    return (
      <View style={styles.loaderChallenges}>
        <ActivityIndicator size="large" color="#ffc800" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundChallenges}>
        <Text>No quedan Desafíos por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderChallenges: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  viewChallenge: {
    flexDirection: 'row',
    margin: 10,
  },
  viewChallengeImage: {
    marginRight: 15,
  },
  imageChallenge: {
    width: 80,
    height: 80,
  },
  challengeName: {
    fontWeight: 'bold',
  },
  challengeDescription: {
    paddingTop: 2,
    color: '#c3c3c3',
    width: 300,
  },
  notFoundChallenges: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
});
