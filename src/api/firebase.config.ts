import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: `{process.env.APIKEY}`,
  authDomain: `{process.env.AUTHDOMAIN}`,
  projectId: `{process.env.PROJECTID}`,
  storageBucket: `{process.env.STORAGEBUCKET}`,
  messagingSenderId: `{process.env.MESSAGINGSENDERID}`,
  appId: `{process.env.APPID}`
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code
//     const errorMessage = error.message
//     // ..
//   })
