import { doc, getDoc, getDocs, getFirestore } from 'firebase/firestore'
import { app, db } from './firebase.config'
import { addDoc, collection } from 'firebase/firestore'

export default async (userId: any) => {
  const querySnapshot = await getDocs(collection(getFirestore(app), userId))
  let dataArray: any[] = []
  querySnapshot.forEach((doc) => {
    dataArray.push(doc.data())
  })
  return dataArray
}
