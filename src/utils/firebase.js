import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBuJjjzVg6w_XTxi1tGV-A8oS8W0PyUlnE',
  authDomain: 'pensamiento-critico.firebaseapp.com',
  databaseURL: 'https://pensamiento-critico.firebaseio.com',
  projectId: 'pensamiento-critico',
  storageBucket: 'pensamiento-critico.appspot.com',
  messagingSenderId: '329133039386',
  appId: '1:329133039386:web:fe7874e4cc58d29a6f16a3',
  measurementId: 'G-CPPVYRR6F7',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
