import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMINIAN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
}

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

export const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
}

export const auth = firebaseApp.auth()
