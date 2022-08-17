import { db } from './firebase.config'
import { updateDoc, doc } from 'firebase/firestore/lite'

export default async (userId: any, linkType: string) => {
  const ref = doc(db, userId, linkType)
  try {
    await updateDoc(ref, {
      linkType: linkType
    })
  } catch (e) {
    console.log('Error adding doc', e)
    return 0
  }
}
