import { useEffect, useContext, useState } from 'react'

import { AnalysisContext, IDefaultAnalysis, IMiningAnalysis } from "../../contexts/analysis"
import { AuthContext } from "../../contexts/auth"

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { SecondaryTopBar } from '../../components/SecondaryTopBar'
import { CardList } from '../../components/CardList'

import styles from './styles.module.scss'

const History: React.FC = () => {
  const [history, setHistory] = useState<(IDefaultAnalysis | IMiningAnalysis)[]>([])

  const { analysis: allAnalysis } = useContext(AnalysisContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const result = allAnalysis.filter((analysis) => analysis.userId === user?.id)
    setHistory(result)
  })

  return (
    <div className={styles.historyWrapper}>
      <LeftBar user={user} />
      <div className={styles.main}>
        <TopBar user={user} />
        <SecondaryTopBar title='Histórico' />
        <div>
          {history.length > 0 ? <CardList analysis={history} />:
          (
            <h1>No analysis found</h1>
          )
          }
        </div>
        
      </div>
    </div>
  )
}

export { History }