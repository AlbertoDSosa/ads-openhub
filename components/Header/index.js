import useAuth from 'hooks/useAuth'
import authStyles from 'styles/firebaseui/auth.module.css'
import { Avatar, Button } from 'components/custom'

export default function Header() {
  const { auth } = useAuth()

  const handleSignOut = () => {
    auth.signOut()
  }

  return (
    <header>
      <div className={authStyles.signedIn}>
        {auth.currentUser && (
          <>
            <Avatar
              name={auth.currentUser.displayName}
              alt={auth.currentUser.displayName}
              src={auth.currentUser.photoURL}
            />

            <Button variant="contained" color="default" onClick={handleSignOut}>
              Sing Out
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
