import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Button, Image, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Challenge3(props) {
  const {nextText} = props;
  return (
    <ScrollView>
      <View style={styles.viewBody}>
        <Text style={[styles.title, styles.text]}>Seleccionar</Text>
        <Text style={styles.text}>
          Esta etapa es fundamental. El PR se basa en ella. A continuación, te
          daremos algunos ejemplos para que ejercites esta primera fase.
        </Text>

        <Card
          title="Imagen 1"
          image={require('../../assets/img/Selects/img1.png')}
          imageStyle={styles.cardImage}></Card>
        <Card
          title="Imagen 2"
          image={require('../../assets/img/Selects/img2.png')}
          imageStyle={styles.cardImage}></Card>
        <Card
          title="Imagen 3"
          image={require('../../assets/img/Selects/img3.jpg')}
          imageStyle={styles.cardImage}></Card>

        <Card
          title="Imagen 4"
          image={require('../../assets/img/Selects/img4.jpg')}
          imageStyle={styles.cardImage}>
          <Text style={styles.textCard}>
            La imagen muestra lo que describe el texto de la publicación.
          </Text>
          <Text style={styles.textCard}>Respuesta:</Text>
          <Text style={styles.textCard}>
            La imagen muestra un montaje artístico realizado en Alemania el año
            2014. Al observar publicaciones como esta, es aconsejable hacerse
            algunas preguntas para intentar discernir la relación existente
            entre la imagen y la supuesta noticia que presenta. En ese caso, uno
            puede formular preguntas como: ¿por qué hay tanta gente alrededor de
            los supuestos caídos por el Coronavirus que parece no hacer nada al
            respecto? ¿por qué la gente ha caído en el medio de la calzada? ¿por
            qué personas con una enfermedad respiratoria estarían en la calle y
            morirían allí?
          </Text>
        </Card>
        <Card
          title="Imagen 5"
          image={require('../../assets/img/Selects/img5.png')}
          imageStyle={styles.cardImage}>
          <Text style={styles.textCard}>
            ¿Cómo evaluarías esta información?
          </Text>
          <Text style={styles.textCard}>Respuesta:</Text>
          <Text style={styles.textCard}>
            Una de las formas más comunes de transmitir información falsa es a
            través de medios de mensajería instantánea como WhatsApp.
            Usualmente, estas cadenas de información comparten ciertos rasgos
            que permiten ayudarnos a reconocer su falsedad o, al menos, hacernos
            dudar de su veracidad.
          </Text>
          <Text style={styles.textCard}>
            1. Se trata de información que no se puede encontrar en medios de
            comunicación establecidos o canales de comunicación oficial.
          </Text>
          <Text style={styles.textCard}>
            2. Se apela a la idea de que hay una realidad mantenida en secreto
            por intereses que quieren mantenernos en la ignorancia sobre algunos
            temas.
          </Text>
          <Text style={styles.textCard}>
            3. Se exhorta a quienes reciban la información a que la compartan
            con sus contactos, de modo de amplificar su alcance.
          </Text>
          <Text style={styles.textCard}>
            4. Generalmente, se trata de cuestiones muy impactantes o
            potencialmente muy disruptivas, que explotan temores o prejuicios de
            las audiencias receptoras del mensaje.
          </Text>
          <Text style={styles.textCard}>
            5. Generalmente abundan las faltas de ortografía y puntuación, así
            como se incluyen palabras que habitualmente no encontraríamos en un
            tipo de texto determinado.
          </Text>
        </Card>
        <Card
          title="Imagen 6"
          image={require('../../assets/img/Selects/img6.jpg')}
          imageStyle={styles.cardImage}>
          <Text style={styles.textCard}>
            ¿Es este un “dato bueno” que debe compartirse masivamente?
          </Text>
          <Text style={styles.textCard}>Respuesta:</Text>
          <Text style={styles.textCard}>
            La información de la publicación informa de manera muy vaga la
            fuente de la que procede el supuesto hallazgo. Cuando se trata de
            información que resulta de investigación científica, sobre todo
            cuando se refiere a temas de salud, la difusión masiva se realiza a
            través de medios con protocolos exigentes y altos niveles de
            formalidad. Además, el contenido de esta publicación es
            contradictorio: por una parte afirma que la Covid-19 es “inmune a
            organismos con un PH mayor de 5,5” y luego aconseja consumir
            alimentos con un PH mayor a ese índice, lo cual, según este
            razonamiento, crearía un ambiente al que el virus sería inmune. Esto
            es todo lo contrario de lo que se busca.
          </Text>
        </Card>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    marginVertical: 10,
    color: '#fff',
    textAlign: 'justify',
    paddingHorizontal: 20,
  },
  textCard: {
    color: '#3c3c3c',
    marginBottom: 10,
    textAlign: 'justify',
    paddingHorizontal: 15,
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
  imageChallenge: {
    height: 250,
    width: 250,
  },
  cardImage: {
    height: 250,
    resizeMode: 'contain',
  },
});
