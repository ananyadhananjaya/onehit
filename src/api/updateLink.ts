import { db } from './firebase.config'
import { updateDoc, doc } from 'firebase/firestore/lite'

export default async (userId: any, linkType: string, link: string) => {
  const ref = doc(db, userId, linkType)
  console.log(ref)
  try {
    let res = await updateDoc(ref, {
      linkType: linkType
    })
    console.log(res)
  } catch (e) {
    console.log('Error adding doc', e)
    return 0
  }
}
