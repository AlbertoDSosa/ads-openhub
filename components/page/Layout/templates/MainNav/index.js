import { useState } from 'react'
import clsx from 'clsx'

import useAuth from 'hooks/useAuth'
import { Box, Text, Menu, Bar, Link } from 'components/ui'
import { makeStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Settings from '@material-ui/icons/Settings'

import SettingsModal from 'components/page/SettingsModal'

const { Item } = Menu

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white !important',
  },
}))

export default function MainNav({ openDrawer, toogleOpenDrawer }) {
  const { isSignedIn, auth } = useAuth()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const open = Boolean(anchorEl)

  const onSignOut = () => {
    auth.signOut()
  }

  const handleAccountMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Bar position="relative">
      <IconButton
        edge="start"
        className={clsx(classes.menuButton, openDrawer && classes.hide)}
        onClick={toogleOpenDrawer}
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Text variant="h6" className={classes.title}>
        <Link to="/" className={classes.link}>
          ADS OpenHub
        </Link>
      </Text>
      <Box>
        <IconButton color="inherit" onClick={() => setShowSettingsModal(true)}>
          <Settings />
        </IconButton>
        {showSettingsModal && (
          <SettingsModal
            showModal={showSettingsModal}
            onClose={() => setShowSettingsModal(false)}
          />
        )}
      </Box>
      {isSignedIn && (
        <Box>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAccountMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <Item onClick={handleClose}>Perfil</Item>
            <Item onClick={handleClose}>Mi Cuenta</Item>
            <Item onClick={onSignOut}>Salir</Item>
          </Menu>
        </Box>
      )}
    </Bar>
  )
}
