import { firestore } from 'config/firebase/admin'

const Database = ({ collection }) => {
  const db = firestore.collection(collection)
  const get = ({ id }) => {
    if (id) {
      return db
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return {
              id: doc.id,
              ...doc.data(),
            }
          } else {
            throw new Error('Document not exists')
          }
        })
    } else {
      return db.get().then(({ docs }) => {
        // console.log(docs)
      })
    }
  }
  return { get }
}

export default Database
