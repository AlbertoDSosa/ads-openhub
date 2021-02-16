import { useState } from 'react'
import Footer from '../Footer'
import Content from '../Content'
import MainNav from '../MainNav'
import DrawerNav from '../DrawerNav'
import { Box } from 'components/ui'
import styles from './style.module.css'

export default function DefaultLayout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const toogleOpenDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Box className={styles.container}>
      <MainNav openDrawer={openDrawer} toogleOpenDrawer={toogleOpenDrawer} />
      <DrawerNav openDrawer={openDrawer} toogleOpenDrawer={toogleOpenDrawer} />
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer} />
    </Box>
  )
}
