import { db } from './firebase.config'
import { addDoc, setDoc, collection, doc } from 'firebase/firestore/lite'

export default async (userId: any, linkType: string, link: string) => {
  try {
    let res = await setDoc(doc(db, userId, linkType), {
      link: link,
      linkType: linkType
    })
    return 1
  } catch (e) {
    console.log('Error adding doc', e)
    return 0
  }
}
