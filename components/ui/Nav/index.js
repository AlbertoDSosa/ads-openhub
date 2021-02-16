import { List, Link } from 'components/ui'

export default function CustomNav({ items, config = {}, ...rest }) {
  const { Item } = List
  const { color = 'inherit' } = config
  return (
    <List component="nav" {...rest}>
      {items.map((item, index) => {
        const { value, to, as } = item
        return (
          <Item key={index}>
            <Link color={color} to={to} as={as}>
              {value}
            </Link>
          </Item>
        )
      })}
    </List>
  )
}
