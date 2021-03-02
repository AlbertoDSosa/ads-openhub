import { useState, useEffect } from 'react'

const parseDevice = (item, isAudioOutput) => {
  const { deviceId, groupId, label } = item

  if (!isAudioOutput) {
    const capabilities = item.getCapabilities()

    return {
      groupId,
      deviceId,
      label,
      capabilities,
    }
  }

  return {
    groupId,
    deviceId,
    label,
  }
}

export default function useUserMedia() {
  const [mediaDevices, setMediaDevices] = useState(null)

  useEffect(() => {
    async function getDevices() {
      try {
        const deviceList = await navigator.mediaDevices.enumerateDevices()
        const devices = {
          audioInputs: [],
          audioOutputs: [],
          videoInputs: [],
        }

        deviceList.forEach((device) => {
          const isAudioInput = device.kind === 'audioinput'
          const isAudioOutput = device.kind === 'audiooutput'
          const isVideoInput = device.kind === 'videoinput'

          const newDevice = parseDevice(device, isAudioOutput)

          if (isAudioInput) {
            devices.audioInputs = [...devices.audioInputs, newDevice]
          } else if (isAudioOutput) {
            devices.audioOutputs = [...devices.audioOutputs, newDevice]
          } else if (isVideoInput) {
            devices.videoInputs = [...devices.videoInputs, newDevice]
          }
        })

        setMediaDevices(devices)
      } catch (err) {
        console.log(err)
      }
    }

    if (!mediaDevices) {
      getDevices()
    }
  }, [])

  return { mediaDevices }
}
