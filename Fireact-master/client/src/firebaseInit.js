import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
  apiKey: "AIzaSyAPJsJ4G-Fmdn1uetF1FqH58aA3ODKly3s",
  authDomain: "cloude-messaging-f113b.firebaseapp.com",
  projectId: "cloude-messaging-f113b",
  storageBucket: "cloude-messaging-f113b.appspot.com",
  messagingSenderId: "1017915725495",
  appId: "1:1017915725495:web:0a6dc57a8254f0fd1cdf32"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      console.log("Payload", payload)
      resolve(payload);
    });
  });
