import { useContext, useState } from 'react'
import styles from './styles.module.scss'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { SecondaryTopBar } from '../../components/SecondaryTopBar'
import { CardList } from '../../components/CardList'
import { AuthContext } from '../../contexts/auth'
import { useLocation } from 'react-router-dom'

const Search: React.FC = (props) => {
  const [open, setOpen] = useState<boolean>(false)

  const query = new URLSearchParams(useLocation().search)
  const queryValue = query.get('query')

  const { user, signIn } = useContext(AuthContext)

  return (
    <div className={open ? styles.searchWrapperOpen : styles.searchWrapperClosed}>
      <LeftBar open={open} setOpen={setOpen} user={user} />
      <main>
        <TopBar user={user} />
        <SecondaryTopBar title={`Análises encontradas com o título "${queryValue}"`} />
        <CardList />
      </main>
    </div>
  )
}

export { Search }