const firebase = require('firebase/app')
require('firebase/database')

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'goiaba-clothes.firebaseapp.com',
  databaseURL: 'https://goiaba-clothes.firebaseio.com',
  projectId: 'goiaba-clothes',
  storageBucket: 'goiaba-clothes.appspot.com',
  messagingSenderId: '1026609985722',
  appId: '1:1026609985722:web:dc05c08ed116ec3f',
}

firebase.initializeApp(config)

const database = firebase.database()

const writeContactOnDb = ({ uuid, clientDetails = {}, cart = {} }) => {
  return database.ref('/' + uuid)
    .set({ clientDetails, cart })
    .then(() => ({ dbsaved: true }))
    .catch(dbError => ({ dbsaved: false, dbError }))
}

module.exports = writeContactOnDb
