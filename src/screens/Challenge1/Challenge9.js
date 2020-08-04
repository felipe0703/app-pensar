import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Challenge8(props) {
  const {nextText} = props;
  return (
    <ScrollView>
      <View style={styles.viewBody}>
        <Text style={styles.text}>Contraargumentos </Text>
        <Text style={styles.text}>
          • Las redes, más que afectar, modifican los patrones clásicos de
          interacción. Hoy en día podemos comunicarnos con otros incluso estando
          lejos. Algo que nos ha permitido estar conectados pese a la distancia,
          por ejemplo, durante la pandemia de la COVID -19.
        </Text>
        <Text style={styles.text}>
          • Las relaciones a través de redes sociales cumplen un rol fundamental
          en las personas, situándose casi al mismo nivel que la interacción
          personal y/o cara a cara.
        </Text>
        <Text style={styles.text}>
          • Las redes pueden tener beneficios sociales y cívicos como, por
          ejemplo, mayor acceso y uso de información, influencia, credenciales
          sociales, reforzamiento de la identidad y reconocimiento, así como
          mayor sensación de pertenencia y de compromiso cívico.
        </Text>
        <Text style={styles.text}>
          • Las redes aumentan la confianza en la sociedad, en tanto cada uno
          puede ser reportero de información que sucede al instante y puede
          distribuirla ampliamente. Tradicionalmente, la información ha estado
          monopolizada por grandes empresas de comunicación, mientras que hoy
          las personas tienen un número más amplio de fuentes desde donde
          encontrar, verificar y distribuir información.
        </Text>
        <Text style={styles.text}>
          • Las redes permiten aprendizajes en espacios informales, mientras que
          antes estos aprendizajes estaban limitados a espacios tradicionales
          como la escuela o la universidad.
        </Text>
        <Text style={styles.text}>
          • Las redes sociales sirven para apoyar el aprendizaje de diversas
          formas, por ejemplo, a través de la validación y aprecio de trabajo
          creativo o de información que pueden ser compartidos con otros en una
          esfera global. Además, son muy útiles para estar informados, por
          ejemplo, en un grupo de curso donde aparecen todas las novedades de la
          asignatura, las dudas entre los estudiantes, apoyando la formación de
          una comunidad de aprendizaje entre estudiantes.{' '}
        </Text>

        <Button
          title="Siguiente"
          type="solid"
          icon={<Icon name="arrow-right" size={15} color="#196674" />}
          iconRight
          buttonStyle={styles.btn}
          titleStyle={styles.btnText}
          onPress={nextText}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    paddingHorizontal: 20,
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
