import { useState } from 'react'
import clsx from 'clsx'

import useAuth from 'hooks/useAuth'
import { Box, Text, Menu, Bar } from 'components/ui'
import { makeStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

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
}))

export default function MainNav({ openDrawer, toogleOpenDrawer }) {
  const { isSignedIn, auth } = useAuth()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
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
        ADS OpenHub
      </Text>
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
            <Item onClick={handleClose}>Profile</Item>
            <Item onClick={handleClose}>My account</Item>
            <Item onClick={onSignOut}>Sing Out</Item>
          </Menu>
        </Box>
      )}
    </Bar>
  )
}
