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

  const analysisToShow = analysis.filter(a => a.privacy === 'public')

  return (
    <div className={styles.homeWrapper}>
      <LeftBar user={user} />
      <div className={styles.main}>
        <TopBar user={user} />
        {!user && <Introdution />}
        <SecondaryTopBar title='Análises' />
        <CardList analysis={analysisToShow} isHistory={false} />
      </div>
    </div>
  )
}

export { Home }