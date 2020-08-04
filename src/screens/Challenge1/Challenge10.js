import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Challenge10(props) {
  const {nextText, navigation} = props;
  const goChallenge = () => {
    navigation.navigate('home');
  };
  return (
    <View style={styles.viewBody}>
      <View>
        <Text style={styles.text}>
          Ya has llegado casi al final de la 1a etapa. ¡Sólo falta el último
          desafío! ¿Te imaginas cuál es?
        </Text>
        <Text style={styles.text}>
          Exacto, es el desarrollo de conclusiones.
        </Text>
        <Text style={styles.text}>Conclusión:</Text>
        <Text style={styles.text}>
          Considerando los argumentos elaborados, así como los contrargumentos
          incluidos en el análisis, se puede inferir que las redes sociales
          afectan negativamente las relaciones interpersonales y el aprendizaje.
          Este impacto se resume en el menor tiempo que le dedicamos a construir
          relaciones humanas y a generar conocimiento de calidad.
        </Text>
      </View>
      <Button
        title="Terminar"
        type="solid"
        buttonStyle={styles.btn}
        titleStyle={styles.btnText}
        onPress={goChallenge}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    marginVertical: 10,
    color: '#fff',
    textAlign: 'justify',
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: '#C2DDC7',
    marginTop: 10,
    marginBottom: 20,
  },
  btnText: {
    color: '#196674',
    marginRight: 10,
  },
});
