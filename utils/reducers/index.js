import { roomInitialState, roomReducers } from './room'
import { meInitialState, meReducers } from './me'
import {
  producerInitialState,
  producerReducers,
  dataProducerInitialState,
  dataProducerReducers,
} from './producer'
import { peerInitialState, peerReducers } from './peer'
import {
  consumerReducers,
  consumerInitialState,
  dataConsumerReducers,
  dataConsumerInitialState,
} from './consumer'
import { notifyInitialState, notifyReducers } from './notify'

import {
  roomActions,
  meActions,
  producerActions,
  peerActions,
  consumerActions,
  notifyActions,
} from '../actions'

export const initialState = {
  room: roomInitialState,
  me: meInitialState,
  producers: producerInitialState,
  dataProducers: dataProducerInitialState,
  peers: peerInitialState,
  consumers: consumerInitialState,
  dataConsumers: dataConsumerInitialState,
  notification: notifyInitialState,
}

export const reducers = {
  ...roomReducers(roomActions),
  ...meReducers(meActions),
  ...producerReducers(producerActions),
  ...dataProducerReducers(producerActions),
  ...peerReducers(peerActions),
  ...consumerReducers(consumerActions),
  ...dataConsumerReducers(consumerActions),
  ...notifyReducers(notifyActions),
}
