import {
  Input,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core'

export default function CustomInput({ config, ...rest }) {
  const {
    cType = 'default',
    ref,
    helperText = '',
    label = '',
    id = '',
  } = config
  return cType === 'default' ? (
    <TextField inputRef={ref} {...rest} />
  ) : (
    <FormControl>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input id={id} inputRef={ref} {...rest} />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}