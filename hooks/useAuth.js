import { useState, useEffect } from 'react'
import { auth } from 'config/firebase/client'
export default function useAuth() {
  const [isSignedIn, setIsSignedIn] = useState(undefined)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((resUser) => {
      setIsSignedIn(!!resUser)
      const { uid: id, photoURL, phoneNumber, displayName, email } = resUser
      setUser({ id, photoURL, phoneNumber, displayName, email })
    })
    return () => {
      unregisterAuthObserver()
    }
  }, [])
  return { isSignedIn, user, auth }
}
