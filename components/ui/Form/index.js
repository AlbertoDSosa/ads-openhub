import {
  FormControl as MuiFormControl,
  FormGroup as MuiFormGroup,
  FormHelperText as MuiFormHelperText,
  Select as MuiSelect,
} from '@material-ui/core'

export default function CustomForm({ children, ...rest }) {
  return <form {...rest}>{children}</form>
}

export const FormControl = MuiFormControl
export const FormHelperText = MuiFormHelperText
export const FormGroup = MuiFormGroup
export const Select = MuiSelect
