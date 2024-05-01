export const peerInitialState = {}

export const peerReducers = (actions) => {
  return {
    [actions.ADD_PEER]: (state, action) => {
      const peer = action.payload
      const { peers } = state

      return { ...state, peers: { ...peers, [peer.id]: peer } }
    },
    [actions.REMOVE_PEER]: (state, action) => {
      const { peerId } = action.payload
      const { peers } = state
      const newState = { ...peers }

      delete newState[peerId]

      return { ...state, peers: newState }
    },
    [actions.SET_PEER_DISPLAY_NAME]: (state, action) => {
      const { displayName, peerId } = action.payload
      const { peers } = state
      const peer = peers[peerId]

      if (!peer) throw new Error('no Peer found')

      const newPeer = { ...peer, displayName }

      return { ...state, peers: { ...peers, [newPeer.id]: newPeer } }
    },
    [actions.ADD_CONSUMER_TO_PEER]: (state, action) => {
      const { consumer, peerId } = action.payload
      const { peers } = state
      const peer = peers[peerId]

      if (!peer) throw new Error('no Peer found for new Consumer')

      const newConsumers = [...peer.consumers, consumer.id]
      const newPeer = { ...peer, consumers: newConsumers }

      return { ...state, peers: { ...peers, [newPeer.id]: newPeer } }
    },
    [actions.REMOVE_CONSUMER_TO_PEER]: (state, action) => {
      const { consumerId, peerId } = action.payload
      const { peers } = state
      const peer = peers[peerId]

      // NOTE: This means that the Peer was closed before, so it's ok.
      if (!peer) return state

      const idx = peer.consumers.indexOf(consumerId)

      if (idx === -1) throw new Error('Consumer not found')

      const newConsumers = peer.consumers.slice()

      newConsumers.splice(idx, 1)

      const newPeer = { ...peer, consumers: newConsumers }

      return { ...state, peers: { ...peers, [newPeer.id]: newPeer } }
    },
    [actions.ADD_DATA_CONSUMER_TO_PEER]: (state, action) => {
      const { dataConsumer, peerId } = action.payload

      // special case for bot DataConsumer.
      if (!peerId) return state

      const { peers } = state
      const peer = peers[peerId]

      if (!peer) throw new Error('no Peer found for new DataConsumer')

      const newDataConsumers = [...peer.dataConsumers, dataConsumer.id]
      const newPeer = { ...peer, dataConsumers: newDataConsumers }

      return { ...state, peers: { ...peers, [newPeer.id]: newPeer } }
    },
    [actions.REMOVE_DATA_CONSUMER_TO_PEER]: (state, action) => {
      const { dataConsumerId, peerId } = action.payload

      // special case for bot DataConsumer.
      if (!peerId) return state

      const { peers } = state
      const peer = peers[peerId]

      // NOTE: This means that the Peer was closed before, so it's ok.
      if (!peer) return state

      const idx = peer.dataConsumers.indexOf(dataConsumerId)

      if (idx === -1) throw new Error('DataConsumer not found')

      const newDataConsumers = peer.dataConsumers.slice()

      newDataConsumers.splice(idx, 1)

      const newPeer = { ...peer, dataConsumers: newDataConsumers }

      return { ...state, peers: { ...peers, [newPeer.id]: newPeer } }
    },
  }
}
