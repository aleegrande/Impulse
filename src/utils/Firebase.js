import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: 'AIzaSyAn_wt1WzT1rL1gn1xr5D9asrftqDYSB1c',
  authDomain: 'impulse-ac197.firebaseapp.com',
  projectId: 'impulse-ac197',
  storageBucket: 'impulse-ac197.appspot.com',
  messagingSenderId: '641113532603',
  appId: '1:641113532603:web:26cf42e8f904a1c1b5a19e',
};

class Firebase {
  constructor() {
    this.firebase = firebase.initializeApp(firebaseConfig);
  }
}

export default Firebase;
