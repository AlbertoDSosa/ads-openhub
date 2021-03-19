const protooPort = 4443

export function getProtooUrl({ roomId, peerId, hostname }) {
  return `wss://${hostname}:${protooPort}/?roomId=${roomId}&peerId=${peerId}`
}
