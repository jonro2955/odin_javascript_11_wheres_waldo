const config = {
  apiKey: 'AIzaSyBiQ8vqrGnUn1JCBjCQ68_ep47P5Hnimbo',
  authDomain: 'wheres-waldo-9c518.firebaseapp.com',
  projectId: 'wheres-waldo-9c518',
  storageBucket: 'wheres-waldo-9c518.appspot.com',
  messagingSenderId: '727233430623',
  appId: '1:727233430623:web:fb42cb8cc8c42bd95e47ea',
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.' +
        '\n' +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}