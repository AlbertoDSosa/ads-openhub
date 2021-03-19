export const consumerInitialState = {}

export const consumerReducers = (actions) => {
  return {
    [actions.ADD_CONSUMER]: (state, action) => {
      const { consumer } = action.payload
      const { consumers } = state

      return { ...state, consumers: { ...consumers, [consumer.id]: consumer } }
    },
    [actions.REMOVE_CONSUMER]: (state, action) => {
      const { consumerId } = action.payload
      const { consumers } = state

      const newState = { ...consumers }

      delete newState[consumerId]

      return { ...state, consumers: newState }
    },
    [actions.SET_CONSUMER_PAUSED]: (state, action) => {
      const { consumerId, originator } = action.payload
      const { consumers } = state
      const consumer = consumers[consumerId]

      let newConsumer

      if (originator === 'local')
        newConsumer = { ...consumer, locallyPaused: true }
      else newConsumer = { ...consumer, remotelyPaused: true }

      return {
        ...state,
        consumers: { ...consumers, [consumerId]: newConsumer },
      }
    },
    [actions.SET_CONSUMER_RESUMED]: (state, action) => {
      const { consumerId, originator } = action.payload
      const { consumers } = state
      const consumer = consumers[consumerId]

      let newConsumer

      if (originator === 'local')
        newConsumer = { ...consumer, locallyPaused: false }
      else newConsumer = { ...consumer, remotelyPaused: false }

      return {
        ...state,
        consumers: { ...consumers, [consumerId]: newConsumer },
      }
    },
    [actions.SET_CONSUMER_CURRENT_LAYERS]: (state, action) => {
      const { consumerId, spatialLayer, temporalLayer } = action.payload
      const { consumers } = state
      const consumer = consumers[consumerId]
      const newConsumer = {
        ...consumer,
        preferredSpatialLayer: spatialLayer,
        preferredTemporalLayer: temporalLayer,
      }

      return {
        ...state,
        consumers: { ...consumers, [consumerId]: newConsumer },
      }
    },
    [actions.SET_CONSUMER_PREFERRED_LAYERS]: (state, action) => {
      const { consumerId, spatialLayer, temporalLayer } = action.payload
      const { consumers } = state
      const consumer = consumers[consumerId]
      const newConsumer = {
        ...consumer,
        preferredSpatialLayer: spatialLayer,
        preferredTemporalLayer: temporalLayer,
      }

      return {
        ...state,
        consumers: { ...consumers, [consumerId]: newConsumer },
      }
    },
    [actions.SET_CONSUMER_PRIORITY]: (state, action) => {
      const { consumerId, priority } = action.payload
      const { consumers } = state
      const consumer = consumers[consumerId]
      const newConsumer = { ...consumer, priority }

      return {
        ...state,
        consumers: { ...consumers, [consumerId]: newConsumer },
      }
    },
    [actions.SET_CONSUMER_TRACK]: (state, action) => {
      const { consumerId, track } = action.payload
      const { consumers } = state
      const consumer = consumers[consumerId]
      const newConsumer = { ...consumer, track }

      return {
        ...state,
        consumers: { ...consumers, [consumerId]: newConsumer },
      }
    },
    [actions.SET_CONSUMER_SCORE]: (state, action) => {
      const { consumerId, score } = action.payload
      const { consumers } = state
      const consumer = consumers[consumerId]

      if (!consumer) return state

      const newConsumer = { ...consumer, score }

      return {
        ...state,
        consumers: { ...consumers, [consumerId]: newConsumer },
      }
    },
  }
}

export const dataConsumerInitialState = {}

export const dataConsumerReducers = (actions) => {
  return {
    [actions.ADD_DATA_CONSUMER]: (state, action) => {
      const { dataConsumer } = action.payload
      const { dataConsumers } = state

      return {
        ...state,
        dataConsumers: { ...dataConsumers, [dataConsumer.id]: dataConsumer },
      }
    },
    [actions.REMOVE_DATA_CONSUMER]: (state, action) => {
      const { dataConsumerId } = action.payload
      const { dataConsumers } = state
      const newState = { ...dataConsumers }

      delete newState[dataConsumerId]

      return { ...state, dataConsumers: newState }
    },
  }
}
