import { useState } from 'react'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'

import styles from './styles.module.scss'

const Home: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={open ? styles.homeWrapperOpen : styles.homeWrapper}>
      <LeftBar open={open} setOpen={setOpen} />
      <div className={styles.main}>
        <TopBar />
      </div>
    </div>
  )
}

export { Home }