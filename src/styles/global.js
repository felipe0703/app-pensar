import {StyleSheet} from 'react-native';
// #F2A922
// #1cb0f6
// #78c800
// #58a700
// #ff4b4b
// #c2ddc7
// #196674
// #3c3c3c

const globalStyles = StyleSheet.create({
  brain: {
    height: 100,
    width: 110,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  btn: {
    borderRadius: 10,
    backgroundColor: '#c2ddc7',
    paddingVertical: 10,
  },
  btnContainer: {
    width: 150,
    marginVertical: 25,
    marginHorizontal: 10,
  },
  btnText: {
    color: '#196674',
    marginHorizontal: 10,
  },
  cardImage: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  content: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  content2: {
    // color: '#fff',
    color: '#F2A922',
    marginTop: 10,
    textAlign: 'center',
  },
  content3: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'justify',
  },
  correct: {
    backgroundColor: '#78c800',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  incorrect: {
    backgroundColor: '#ff4b4b',
    alignItems: 'center',
  },
  modalFeedback: {
    alignItems: 'center',
  },
  options: {
    marginVertical: 10,
    marginHorizontal: 20,
    color: '#fff',
  },
  textFeedback: {
    marginVertical: 10,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  textInfo: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  touchable: {
    // marginVertical: 6,
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewBody: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  viewOptions: {
    marginTop: 15,
  },
});

export default globalStyles;
