import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { auth, uiConfig } from 'config/firebase/client'

import SignInCustomForm from './custom'

export default function SignInForm({ formType = 'firebaseui' }) {
  if (formType === 'custom') {
    return <SignInCustomForm />
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
}
