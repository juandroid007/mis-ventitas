import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyDMdPB0eqK7FHrWCzRK9KldF5ntjpzlRFM",
  authDomain: "mis-ventitas.firebaseapp.com",
  databaseURL: "https://mis-ventitas.firebaseio.com",
  projectId: "mis-ventitas",
  storageBucket: "mis-ventitas.appspot.com",
  messagingSenderId: "829342889887",
  appId: "1:829342889887:web:db6abe2f147f12fa25efaa",
  measurementId: "G-M4X1XPH7DS"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export const db = firebase.firestore()
