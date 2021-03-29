export const roomActions = {
  SET_ROOM_URL: 'room->setUrl',
  SET_ROOM_STATE: 'room->setState',
  SET_ROOM_ACTIVE_SPEAKER: 'room->setActiveSpeaker',
  SET_ROOM_STATS_PEER_ID: 'room->setStatsPeerId',
  SET_FACE_DETECTION: 'room->setFaceDetection',
  REMOVE_PEER_TO_ROOM: 'room->removePeer',
}

export const meActions = {
  SET_ME: 'me->set',
  SET_MEDIA_CAPABILITIES: 'me->setMediaCapabilities',
  SET_CAN_CHANGE_WEBCAM: 'me->setCanChangeWebcam',
  SET_DISPLAY_NAME: 'me->setDisplayName',
  SET_AUDIO_ONLY_STATE: 'me->setAudioOnlyState',
  SET_AUDIO_ONLY_IN_PROGRESS: 'me->setAudioOnlyInProgress',
  SET_AUDIO_MUTED_STATE: 'me->setAudioMuteState',
  SET_RESTART_ICE_IN_PROGRESS: 'me->setRestartIceInProgress',
  SET_WEBCAM_IN_PROGRESS: 'me->setWebcamInProgress',
  SET_SHARE_IN_PROGRESS: 'me->setShareInProgress',
}

export const producerActions = {
  ADD_PRODUCER: 'producer->add',
  REMOVE_PRODUCER: 'producer->remove',
  SET_PRODUCER_PAUSED: 'producer->setPaused',
  SET_PRODUCER_RESUMED: 'producer->setResumed',
  SET_PRODUCER_TRACK: 'producer->setTrack',
  SET_PRODUCER_SCORE: 'producer->setScore',
  ADD_DATA_PRODUCER: 'producer->addData',
  REMOVE_DATA_PRODUCER: 'producer->removeData',
}

export const peerActions = {
  ADD_PEER: 'peer->add',
  REMOVE_PEER: 'peer->remove',
  SET_PEER_DISPLAY_NAME: 'peer->setDisplayName',
  ADD_CONSUMER_TO_PEER: 'peer->addConsumer',
  REMOVE_CONSUMER_TO_PEER: 'peer->removeConsumer',
  ADD_DATA_CONSUMER_TO_PEER: 'peer->addDataConsumer',
  REMOVE_DATA_CONSUMER_TO_PEER: 'peer->removeDataConsumer',
}

export const consumerActions = {
  ADD_CONSUMER: 'consumer->add',
  REMOVE_CONSUMER: 'consumer->remove',
  SET_CONSUMER_PAUSED: 'consumer->setPaused',
  SET_CONSUMER_RESUMED: 'consumer->setResumed',
  SET_CONSUMER_CURRENT_LAYERS: 'consumer->setCurrentLayers',
  SET_CONSUMER_PREFERRED_LAYERS: 'consumer->setPreferredLayers',
  SET_CONSUMER_PRIORITY: 'consumer->setPriority',
  SET_CONSUMER_TRACK: 'consumer->setTrack',
  SET_CONSUMER_SCORE: 'consumer->setScore',
  ADD_DATA_CONSUMER: 'consumer->addData',
  REMOVE_DATA_CONSUMER: 'consumer->removeData',
}

export const notifyActions = {
  ADD_NOTIFICATION: 'notify->add',
  REMOVE_NOTIFICATION: 'notify->remove',
  REMOVE_ALL_NOTIFICATIONS: 'notify->removeAll',
}
