export const producerInitialState = {}

export const producerReducers = (actions) => {
  return {
    [actions.ADD_PRODUCER]: (state, action) => {
      const { producer } = action.payload
      const { producers } = state

      return { ...state, producers: { ...producers, [producer.id]: producer } }
    },
    [actions.REMOVE_PRODUCER]: (state, action) => {
      const { producerId } = action.payload
      const { producers } = state

      const newState = { ...producers }

      delete newState[producerId]

      return { ...state, producers: newState }
    },
    [actions.SET_PRODUCER_PAUSED]: (state, action) => {
      const { producerId } = action.payload
      const { producers } = state
      const producer = producers[producerId]
      const newProducer = { ...producer, paused: true }

      return {
        ...state,
        producers: { ...producers, [producerId]: newProducer },
      }
    },
    [actions.SET_PRODUCER_RESUMED]: (state, action) => {
      const { producerId } = action.payload
      const { producers } = state
      const producer = producers[producerId]
      const newProducer = { ...producer, paused: false }

      return {
        ...state,
        producers: { ...producers, [producerId]: newProducer },
      }
    },
    [actions.SET_PRODUCER_TRACK]: (state, action) => {
      const { producerId, track } = action.payload
      const { producers } = state
      const producer = producers[producerId]
      const newProducer = { ...producer, track }

      return {
        ...state,
        producers: { ...producers, [producerId]: newProducer },
      }
    },
    [actions.SET_PRODUCER_SCORE]: (state, action) => {
      const { producerId, score } = action.payload
      const { producers } = state
      const producer = producers[producerId]

      if (!producer) return state

      const newProducer = { ...producer, score }

      return {
        ...state,
        producers: { ...producers, [producerId]: newProducer },
      }
    },
  }
}

export const dataProducerInitialState = {}

export const dataProducerReducers = (actions) => {
  return {
    [actions.ADD_DATA_PRODUCER]: (state, action) => {
      const { dataProducer } = action.payload
      const { dataProducers } = state

      return {
        ...state,
        dataProducers: { ...dataProducers, [dataProducer.id]: dataProducer },
      }
    },
    [actions.REMOVE_DATA_PRODUCER]: (state, action) => {
      const { dataProducerId } = action.payload
      const { dataProducers } = state
      const newState = { ...dataProducers }

      delete newState[dataProducerId]

      return { ...state, dataProducers: newState }
    },
  }
}
