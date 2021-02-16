import 'fontsource-roboto'
import useAuth from 'hooks/useAuth'

import authStyles from 'styles/firebaseui/auth.module.css'
import 'styles/globals.css'

import SignInForm from 'components/page/SignInForm'
import Layout from 'components/page/Layout'
import { Spinner } from 'components/ui'

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

  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
