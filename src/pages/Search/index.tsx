import { useState } from 'react'
import styles from './styles.module.scss'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { SecondaryTopBar } from '../../components/SecondaryTopBar'
import { CardList } from '../../components/CardList'

const Search: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={open ? styles.searchWrapperOpen : styles.searchWrapperClosed}>
      <LeftBar open={open} setOpen={setOpen} />
      <div>
        <TopBar user={null} />
        <SecondaryTopBar title='Análises encontradas' />
        <CardList />
      </div>
    </div>
  )
}

export { Search }