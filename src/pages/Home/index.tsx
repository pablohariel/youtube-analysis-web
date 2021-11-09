import { useContext, useState } from 'react'


import { LeftBar } from '../../components/LeftBar'
import { SecondaryTopBar } from '../../components/SecondaryTopBar'
import { TopBar } from '../../components/TopBar'
import { CardList } from '../../components/CardList'
import { Introdution } from '../../components/Introdution'

import styles from './styles.module.scss'
import { AuthContext } from '../../contexts/auth'
import { AnalysisContext } from '../../contexts/analysis'

const Home: React.FC = () => {
  const { user, signOut } = useContext(AuthContext)
  const { analysis } = useContext(AnalysisContext)

  return (
    <div className={styles.homeWrapper}>
      <LeftBar user={user} />
      <div className={styles.main}>
        <TopBar user={user} />
        {!user && <Introdution />}
        <SecondaryTopBar title='Análises' />
        <CardList analysis={analysis} />
      </div>
    </div>
  )
}

export { Home }