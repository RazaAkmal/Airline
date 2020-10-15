import firebase from 'firebase';

  let firebaseConfig = {
    apiKey: "AIzaSyAXTPCSulFQc56cEWAVkvaIN_iX_yPQtME",
    authDomain: "air-line-app.firebaseapp.com",
    databaseURL: "https://air-line-app.firebaseio.com",
    projectId: "air-line-app",
    storageBucket: "air-line-app.appspot.com",
    messagingSenderId: "568290494005",
    appId: "1:568290494005:web:7124c46b7048e804d0d37c"
  };

const fire =   firebase.initializeApp(firebaseConfig);

export default fire;
