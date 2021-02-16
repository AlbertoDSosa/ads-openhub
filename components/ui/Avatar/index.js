import Avatar from '@material-ui/core/Avatar'

export default function CustomAvatar({ src, alt, name }) {
  return (
    <>
      {src && <Avatar src={src} alt={alt} />}
      {name && <strong>{name}</strong>}
    </>
  )
}
