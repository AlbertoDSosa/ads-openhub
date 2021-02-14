import { useState, useEffect } from 'react'
import { auth } from 'config/firebase/client'
export default function useAuth() {
  const [isSignedIn, setIsSignedIn] = useState(undefined)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((resUser) => {
      setIsSignedIn(!!resUser)
      setUser(resUser)
    })
    return () => {
      unregisterAuthObserver()
    }
  }, [])
  return { isSignedIn, user, auth }
}
