import {
  Input,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
} from '@material-ui/core'

const CustomInput = ({ config = {}, ...rest }) => {
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

CustomInput.Adornment = InputAdornment
CustomInput.FormControl = FormControl
CustomInput.InputLabel = InputLabel
CustomInput.FormHelperText = FormHelperText

export default CustomInput
