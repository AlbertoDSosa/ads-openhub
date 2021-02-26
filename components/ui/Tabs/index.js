import { Tabs, Tab as MuiTab } from '@material-ui/core'
function CustomTabs({ children, ...rest }) {
  return <Tabs {...rest}>{children}</Tabs>
}

export const TabPanel = (props) => {
  const { children, value, index, ...rest } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...rest}
    >
      {value === index && children}
    </div>
  )
}

export const Tab = MuiTab

export default CustomTabs
