import 'fontsource-roboto'
import useAuth from 'hooks/useAuth'

import authStyles from 'styles/firebaseui/auth.module.css'
// import 'styles/globals.css'

import SignInForm from 'components/SignInForm'
import { Spinner } from 'components/custom'

function App({ Component, pageProps }) {
  const { isSignedIn } = useAuth()

  if (isSignedIn === undefined) {
    return <Spinner />
  }

  if (!isSignedIn) {
    return (
      <div className={authStyles.container}>
        <SignInForm />
      </div>
    )
  }

  return <Component {...pageProps} />
}

export default App
