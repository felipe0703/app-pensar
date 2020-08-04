import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Challenge7(props) {
  const {nextText} = props;
  return (
    <ScrollView>
      <View style={styles.viewBody}>
        <Text style={styles.text}>¡Bien hecho!</Text>
        <Text style={styles.text}>
          Sin embargo, no basta con tener una postura sobre algo. El PR requiere
          que seas capaz de fundamentar dicha elección. ¿Qué argumentos usarías
          para apoyar tu idea?
        </Text>
        <Text style={styles.text}>Argumentos</Text>
        <Text style={styles.text}>
          Sí, las redes sociales afectan las relaciones interpersonales y el
          aprendizaje.
        </Text>
        <Text style={styles.text}>
          • Algunos estudios indican que las personas destinan menos tiempo a
          estar con sus parejas, amigos e incluso hijos por estar en las redes,
          lo cual tiene un impacto negativo a nivel interpersonal y en esferas
          primarias de socialización como la familia.
        </Text>
        <Text style={styles.text}>
          • Las redes funcionan como amplificadoras de violencia verbal y
          bullying, con consecuencias graves en la salud mental de las víctimas
          de estos hechos.
        </Text>
        <Text style={styles.text}>
          • Las redes aumentan la sensación de soledad y generan una falsa
          percepción de amistad, lo cual afecta en mayor medida a quienes ya
          tienen antecedentes de vulnerabilidad psicosocial.
        </Text>
        <Text style={styles.text}>
          • Las redes funcionan para capturar la atención de las personas y se
          retroalimentan de la información que les entregamos gratuitamente para
          personalizar la captura de dicha atención. En consecuencia, más que
          mejorar las interacciones debilitan la capacidad limitada que tenemos
          los seres humanos de poner atención a otras cosas como la requerida
          para entablar relaciones de calidad con otros, estudiar, realizar una
          actividad demandante, y otras.
        </Text>
        <Text style={styles.text}>
          • Las redes simplifican y contribuyen a exaltar aspectos de la imagen
          y de vidas perfectas que difieren de la realidad. En esto los
          algoritmos pueden tener control, puesto que a nivel de identidad
          social tenemos aversión a mostrar nuestras debilidades y, por lo
          tanto, proyectamos una vida de fantasía que contrasta con la realidad.
        </Text>
        <Text style={styles.text}>
          • Además de la pérdida de atención, las redes moldean nuestro cerebro
          para recibir gratificación rápida a través de los ‘likes’. Esto es
          contrario a lo que sucede en actividades como el aprendizaje, las que
          requieren un esfuerzo sostenido en el tiempo y auto-regulación para la
          obtención de una meta futura y gratificante eventualmente en el largo
          plazo. Este modelamiento cerebral de gratificaciones rápidas puede
          generar mucha frustración y resistencia cuando se extrapola al proceso
          de aprendizaje.{' '}
        </Text>
        <Text style={styles.text}>
          • Pese a que las redes parecieran estar a nuestro servicio, en la gran
          mayoría de los casos generan adicción a sus usuarios, lo cual puede
          tener consecuencias mayores en el aprendizaje futuro de recién nacidos
          y menores de 4 años.
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
