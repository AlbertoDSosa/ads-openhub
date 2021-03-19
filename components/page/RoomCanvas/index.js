import Meeting from './templates/Meeting'

const templates = {
  meeting: Meeting,
}

const RoomWrapper = (props) => {
  const RoomCanvas = templates[props.template]

  if (RoomCanvas !== null) {
    return <RoomCanvas {...props} />
  }

  return null
}

export default RoomWrapper
