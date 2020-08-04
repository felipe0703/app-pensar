import React, {useState} from 'react';
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

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CorouselChallenge(props) {
  const {arrayChallenges, navigation} = props;
  const [activeChallenge, setActiveChallenge] = useState(0);

  const renderItem = ({item}) => {
    const {nombre, descripcion, image, id} = item;
    const onNavigation = () => {
      navigation.navigate('challenge', {id, nombre});
    };

    return (
      <TouchableWithoutFeedback onPress={onNavigation}>
        <View style={styles.card}>
          <Text style={styles.title}>{nombre}</Text>
          <Image
            resizeMode="contain"
            PlaceholderContent={<ActivityIndicator color="#196674" />}
            source={image ? {uri: image} : require('../assets/img/image.png')}
            style={styles.imageChallenge}
          />
          <Text style={styles.description}>
            {descripcion.substring(0, 60)}...
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Carousel
      layout={'default'}
      data={arrayChallenges}
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
    borderRadius: 20,
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
    resizeMode: 'cover',
  },
  description: {
    marginVertical: 20,
    paddingHorizontal: 30,
    textAlign: 'center',
    color: '#196674',
    fontSize: 15,
  },
});
