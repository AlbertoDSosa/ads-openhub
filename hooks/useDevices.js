import { useState, useEffect } from 'react'

export default function useUserMedia() {
  const [mediaDevices, setMediaDevices] = useState(null)

  useEffect(() => {
    async function getDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        setMediaDevices(devices)
      } catch (err) {
        console.log(err)
      }
    }

    if (!mediaDevices) {
      getDevices()
    } else {
      return function cleanup() {}
    }
  }, [mediaDevices])

  return { mediaDevices }
}
