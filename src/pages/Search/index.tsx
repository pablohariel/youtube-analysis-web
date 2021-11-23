import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'


import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { SecondaryTopBar } from '../../components/SecondaryTopBar'
import { CardList } from '../../components/CardList'

import { AuthContext } from '../../contexts/auth'
import { AnalysisContext, IDefaultAnalysis, IMiningAnalysis, ICompleteAnalysis } from '../../contexts/analysis'

import styles from './styles.module.scss'
import { useEffect } from 'react'

const Search: React.FC = (props) => {
  const [analysisFound, setAnalysisFound] = useState<(IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]>([])

  const query = new URLSearchParams(useLocation().search)
  const queryValue = query.get('query')

  const { user, signIn } = useContext(AuthContext)
  const { analysis } = useContext(AnalysisContext)

  const analysisToShow = analysis.filter(a => a.privacy === 'public')

  useEffect(() => {
    if(queryValue) {
      setAnalysisFound(analysisToShow.filter(a => a.videoData.title.toLowerCase().includes(queryValue.toLowerCase())))
    } else {
      setAnalysisFound([])
    }
  }, [queryValue])

  return (
    <div className={styles.searchWrapperClosed}>
      <LeftBar user={user} />
      <main>
        <TopBar user={user} />
        <SecondaryTopBar title={`Análises encontradas`} />
        <CardList analysis={analysisFound} isHistory={false} />
      </main>
    </div>
  )
}

export { Search }