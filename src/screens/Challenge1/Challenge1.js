import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Challenge1(props) {
  const {nextText} = props;
  return (
    <ScrollView>
      <View style={styles.viewBody}>
        <Text style={styles.text}>Hola Andrea,</Text>
        <Text style={styles.text}>
          Bienvenida a la exploración de tu mente.
        </Text>
        <Text style={styles.text}>
          Comprender la forma en que pensamos ha sido parte del interés del ser
          humano a lo largo de la historia. Ya en la edad antigua, filósofos
          griegos como Platón y Sócrates reflexionaban sobre las formas
          correctas de guiar el proceso del pensamiento, sus premisas y
          conclusiones. Hoy, atender a los procesos involucrados en pensar
          cobran mayor relevancia dado el contexto global y la ubicuidad de las
          tecnologías, las cuales han aumentado la complejidad del entorno de
          información al que accedemos y que, en consecuencia, interpretamos.
          Observar nuestro proceso de pensamiento no solo permite explicitar la
          información a la cual accedemos y desde la cual generamos opinión u
          argumentación, sino que de manera importante nos ayuda a ser
          conscientes de las creencias, sesgos y valores que permean dicho
          significado y la manera que interpretamos los datos y, en definitiva,
          la realidad. Ejemplos de razonadores reflexivos hay muchos.
        </Text>
        <Text style={styles.text}>
          Martin Luther King Jr.: Promovió la noción de igualdad de derechos en
          EE.UU. con una argumentación y capacidad de persuasión notoria que
          llamaba a soñar con un futuro mejor y a lograr cambios sin violencia.{' '}
        </Text>
        <Text style={styles.text}>
          Simone de Beauvoir: Abogó por la igualdad de derechos. Nacida a
          principios del s. XX, fue una de las precursoras del movimiento
          feminista. Su capacidad reflexiva la llevó a proponer un mundo
          distinto a la estructura de la sociedad de su tiempo.
        </Text>
        <Text style={styles.text}>
          Elena Caffarena: Una de las primeras abogadas chilenas, luchó por la
          expansión de los derechos políticos y civiles de las mujeres chilenas
          a través de una actividad pública enfocada en la organización y la
          exposición de argumentos filosóficos y jurídicos que impactaron a la
          sociedad de su época.
        </Text>
        <Text style={styles.text}>
          Camilo Henríquez: Contribuyó a dar lenguaje y justificación
          intelectual al proceso de independencia de Chile, a través de sus
          razonamientos y reflexiones, expuestos como argumentos en favor de una
          postura política determinada y publicados en los primeros periódicos
          del país.
        </Text>
        <Text style={styles.text}>
          Pensando en tu experiencia previa, ¿qué es lo que haces cuando creas
          un argumento?
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
