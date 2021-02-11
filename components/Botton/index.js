import Button from '@material-ui/core/Button'

export default function CustomButton({ children, onClick, ...rest }) {
  return (
    <>
      <Button {...rest} onClick={onClick}>
        {children}
      </Button>
    </>
  )
}
