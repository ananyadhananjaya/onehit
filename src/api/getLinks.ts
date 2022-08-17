import { doc, getDoc, getDocs, getFirestore } from 'firebase/firestore'
import { app, db } from './firebase.config'
import { addDoc, collection } from 'firebase/firestore'

export default async (userId: any) => {
  const querySnapshot = await getDocs(collection(getFirestore(app), userId))
  let dataArray: any[] = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())
    dataArray.push(doc.data())
  })
  return dataArray
}
