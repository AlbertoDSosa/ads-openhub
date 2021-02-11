import Head from 'next/head'

import styles from 'styles/Home.module.css'
import authStyles from 'styles/firebaseui/auth.module.css'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { auth, uiConfig } from 'config/firebase/client'
import useAuth from 'hooks/useAuth'

import Spinner from 'components/Spinner'
import Avatar from 'components/Avatar'
import Button from 'components/Botton'

export default function Home() {
  const { isSignedIn } = useAuth(auth)

  if (isSignedIn === undefined) {
    return <Spinner />
  }

  if (!isSignedIn) {
    return (
      <div className={authStyles.container}>
        <StyledFirebaseAuth
          className={styles.firebaseUi}
          uiConfig={uiConfig}
          firebaseAuth={auth}
        />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>ADS OpenHub | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className={authStyles.signedIn}>
          <Avatar
            name={auth.currentUser.displayName}
            alt={auth.currentUser.displayName}
            src={auth.currentUser.photoURL}
          />
          <a className={authStyles.button} onClick={() => auth.signOut()}>
            <Button variant="contained" color="default">
              SingOut
            </Button>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>Home</h1>
        <p className={styles.description}></p>

        <div className={styles.grid}></div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://albertodsosa.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Alberto D.Sosa
        </a>
      </footer>
    </div>
  )
}
