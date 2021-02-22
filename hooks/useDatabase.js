import firebase, { firestore } from 'config/firebase/client'

export default function useDatabase({ collection }) {
  const db = firestore.collection(collection)
  const add = ({ user, ...rest }) => {
    const date = new Date()

    return db
      .add({
        createdAt: firebase.firestore.Timestamp.fromDate(date),
        createdBy: user,
        ...rest,
      })
      .then((doc) => {
        return doc.id
      })
  }

  const get = ({ id }) => {
    if (id) {
      return db
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return {
              ...doc.data(),
              id: doc.id,
            }
          } else {
            throw new Error('Document not exists')
          }
        })
    }

    return db.get().then(({ docs }) => {
      console.log(docs)
    })
  }

  return { add, get }
}
