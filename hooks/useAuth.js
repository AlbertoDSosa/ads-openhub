import { useState, useEffect } from 'react'

export default function useAuth(auth) {
  const [isSignedIn, setIsSignedIn] = useState(undefined)

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user)
    })
    return () => {
      unregisterAuthObserver()
    }
  }, [])
  return { isSignedIn, setIsSignedIn }
}
