import { useForm } from 'react-hook-form'
import { Input, Button, Box } from 'components/custom'
import authStyles from 'styles/firebaseui/auth.module.css'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { auth, uiConfig } from 'config/firebase/client'

export default function SignInForm({ formType = 'firebaseui' }) {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  if (formType === 'custom') {
    return (
      <Box component="div" bgcolor="white" p={2} borderRadius={16}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={authStyles.signedIn}
          autoComplete="off"
        >
          <Box p={1}>
            <Input
              required
              error={!!errors.email}
              label="Email"
              type="email"
              name="email"
              helperText={errors.email?.message}
              config={{
                ref: register({ required: 'El campo Email es requerido' }),
              }}
            />
          </Box>
          <Box p={1}>
            <Input
              required
              error={!!errors.password}
              label="Password"
              type="password"
              name="password"
              helperText={errors.password?.message}
              config={{
                ref: register({ required: 'El campo Password es requerido' }),
              }}
            />
          </Box>
          <Box p={1}>
            <Button
              variant="contained"
              componet="input"
              type="submit"
              color="primary"
              p={1}
            >
              Entrar
            </Button>
          </Box>
        </form>
      </Box>
    )
  }

  return (
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={auth}
      uiCallback={(ui) => console.log(ui)}
    />
  )
}
