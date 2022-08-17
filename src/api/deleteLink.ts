import { doc, deleteDoc, getFirestore } from 'firebase/firestore'
import { app } from './firebase.config'

export default async (userId: any, linkType: string) => {
  await deleteDoc(doc(getFirestore(app), userId, linkType))
}
