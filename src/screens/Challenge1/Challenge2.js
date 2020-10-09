import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  challengeText_2,
  challengeText_2_1,
  textFeedback_2_1,
  textFeedback_2_2,
  textFeedback_2_3,
  textFeedback_2_4,
} from './challengeText';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';

export default function Challenge2({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [textFeedback, setTextFeedback] = useState('');
  const [thinker, setThinker] = useState(1);

  const showInfo = (option) => {
    if (option === 1) {
      setTextFeedback(textFeedback_2_1);
      setThinker(1);
    } else if (option === 2) {
      setTextFeedback(textFeedback_2_2);
      setThinker(2);
    } else if (option === 3) {
      setTextFeedback(textFeedback_2_3);
      setThinker(3);
    } else {
      setTextFeedback(textFeedback_2_4);
      setThinker(4);
    }
    setShowModal(true);
  };

  const thinkers = () => {
    if (thinker === 1) {
      return require('../../assets/img/pensadores/martin-luther-king-jr.jpg');
    } else if (thinker === 2) {
      return require('../../assets/img/pensadores/Simone-de-Beauvoir.jpg');
    } else if (thinker === 3) {
      return require('../../assets/img/pensadores/elena-caffarena.jpg');
    } else {
      return require('../../assets/img/pensadores/camilo-henriquez.jpg');
    }
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challengeText_2}</Text>
        <Text style={globalStyles.content2}>{challengeText_2_1}</Text>
        <View style={styles.viewOptions}>
          <TouchableOpacity
            onPress={() => showInfo(1)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              1.{' '}
              <Text style={globalStyles.textInfo}>Martin Luther King Jr.</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(2)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              2. <Text style={globalStyles.textInfo}>Simone de Beauvoir</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(3)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              3. <Text style={globalStyles.textInfo}>Elena Caffarena</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(4)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              4. <Text style={globalStyles.textInfo}>Camilo Henríquez</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={nextText}
          title="Siguiente"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
          icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
          iconRight
        />
      </View>

      <Modal
        isVisible={showModal}
        setIsVisible={setShowModal}
        withPadding={true}>
        <ImageBackground
          source={require('../../assets/img/Pergamino.jpg')}
          style={styles.background}>
          <View style={globalStyles.modalFeedback}>
            {thinker === 1 ? (
              <Image
                style={[styles.img]}
                source={require('../../assets/img/pensadores/martin-luther-king-jr.jpg')}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={styles.containerImg}
              />
            ) : thinker === 2 ? (
              <Image
                style={[styles.img]}
                source={require('../../assets/img/pensadores/Simone-de-Beauvoir.jpg')}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={styles.containerImg}
              />
            ) : thinker === 3 ? (
              <Image
                style={[styles.img]}
                source={require('../../assets/img/pensadores/elena-caffarena.jpg')}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={styles.containerImg}
              />
            ) : (
              <Image
                style={[styles.img]}
                source={require('../../assets/img/pensadores/camilo-henriquez.jpg')}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={styles.containerImg}
              />
            )}

            <Text style={styles.textFeedback}>{textFeedback}</Text>
          </View>
        </ImageBackground>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  containerImg: {
    borderRadius: 50,
    width: 100,
    marginTop: 10,
  },
  img: {
    height: 100,
    width: 100,
  },
  background: {
    // flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 'auto',
    width: '100%',
  },
  textFeedback: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  viewOptions: {
    marginLeft: 15,
    marginVertical: 20,
  },
});
