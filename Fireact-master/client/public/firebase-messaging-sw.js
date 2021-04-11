importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyAPJsJ4G-Fmdn1uetF1FqH58aA3ODKly3s",
  authDomain: "cloude-messaging-f113b.firebaseapp.com",
  projectId: "cloude-messaging-f113b",
  storageBucket: "cloude-messaging-f113b.appspot.com",
  messagingSenderId: "1017915725495",
  appId: "1:1017915725495:web:0a6dc57a8254f0fd1cdf32"

};
console.log("why i'm running!")
firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };
  console.log("Background Message: Title:", notificationTitle, "Message", notificationOptions.body)
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  let url = 'https://google.com';
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
