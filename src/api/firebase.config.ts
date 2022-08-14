import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDhoeYZ3XT01VDlKxoHH9YbFS6uWbQVFc4',
  authDomain: 'onehit-c321d.firebaseapp.com',
  projectId: 'onehit-c321d',
  storageBucket: 'onehit-c321d.appspot.com',
  messagingSenderId: '731852775280',
  appId: '1:731852775280:web:57768a539d85e76b29b9b5'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

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
