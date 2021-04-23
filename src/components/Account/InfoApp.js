import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';

const text1 =
  'Esta aplicación fue realizada en el marco del Proyecto de Innovación en Docencia Universitaria DEP202006, y financiado por el Departamento de Aseguramiento de la Calidad e Innovación Curricular de la Universidad Austral de Chile.';

const InfoApp = ({setShowModal}) => {
  return (
    <View>
      <ScrollView>
        <Text style={styles.info}>{text1}</Text>
        <Text style={styles.title}>Equipo de proyecto</Text>
        <Text style={styles.item}>
          <Text style={styles.subtitle}>Directora responsable: </Text> Patricia
          Thibaut, Instituto de Historia y Ciencias Sociales, Facultad de
          Filosofía y Humanidades, UACH
        </Text>
        <Text style={styles.item}>
          <Text style={styles.subtitle}>Directora alterna: </Text> Andrea
          Lizasoain, Instituto de Lingüística y Comunicación, Facultad de
          Filosofía y Humanidades, UACH
        </Text>
        <Text style={styles.item}>
          <Text style={styles.subtitle}>Idea y contenido de la app: </Text>
          Patricia Thibaut
        </Text>
        <Text style={styles.item}>
          <Text style={styles.subtitle}>Equipo consultor contenido: </Text>
          Andrea Lizasoain, Sebastián Hurtado-Torres, Instituto de Historia,
          Universidad San Sebastián; Cristian Olivares-Rodríguez, Instituto de
          Informática, UACH
        </Text>
        <Text style={styles.item}>
          <Text style={styles.subtitle}>Coordinación desarrollo app: </Text>
          Cristian Olivares-Rodríguez
        </Text>
        <Text style={styles.item}>
          <Text style={styles.subtitle}>Desarrollador: </Text>Felipe Aguilera
        </Text>
        <Text style={styles.item}>
          <Text style={styles.subtitle}>Diseño gráficas de la app: </Text>Felipe
          Aguilera
        </Text>
        <Text style={styles.item}>
          <Text style={styles.subtitle}>
            Diseño personaje cerebrito de la app:{' '}
          </Text>
          Antonia Aravena
        </Text>
        <Button
          title="Listo"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => setShowModal(false)}
        />
      </ScrollView>
    </View>
  );
};

export default InfoApp;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  item: {
    marginVertical: 8,
    marginLeft: 5,
  },
  info: {
    marginTop: 10,
    textAlign: 'justify',
    paddingHorizontal: 5,
  },
  btnContainer: {
    marginTop: 20,
    width: '95%',
  },
  btn: {
    backgroundColor: '#196674',
  },
});
