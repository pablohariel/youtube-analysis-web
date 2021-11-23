import { useEffect, useContext, useState } from 'react'

import { AnalysisContext, ICompleteAnalysis, IDefaultAnalysis, IMiningAnalysis } from "../../contexts/analysis"
import { AuthContext } from "../../contexts/auth"

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { SecondaryTopBar } from '../../components/SecondaryTopBar'
import { CardList } from '../../components/CardList'

import styles from './styles.module.scss'
import { IHistoryFilterOptions, IHistoryFilters } from '../../interfaces/filters'
import { filterAnalysis } from '../../utils/filterAnalysis'

const History: React.FC = () => {
  const [history, setHistory] = useState<(IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]>([])
  const [filteredAnalysis, setfilteredAnalysis] = useState<(IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]>([])
  const [ filters, setFilters ] = useState<IHistoryFilters>({ active: 'time', options: {
    time: true,
    popularity: false
  }})

  const { analysis: allAnalysis } = useContext(AnalysisContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const result = allAnalysis.filter((analysis) => analysis.userId === user?.id)
    setHistory(result)
  }, [allAnalysis])

  useEffect(() => {
    switch(filters.active) {
      case 'time': {
        setfilteredAnalysis([...filterAnalysis({ analysis: history, orderBy: 'time', userId: user?.id }).filteredAnalysis])
        console.log('filtered', filteredAnalysis)
        break
      }
      case 'popularity': {
        setfilteredAnalysis([...filterAnalysis({ analysis: history, orderBy: 'popularity', userId: user?.id }).filteredAnalysis])
        break
      }
    }
  
  }, [history, filters])

  
  const handleFilterChange = (option: IHistoryFilterOptions) => {
    switch(option) {
      case 'time': {
        setFilters({
          active: 'time',
          options: {
            time: true,
            popularity: false,
          }
        })
        break
      }
      case 'popularity': {
        setFilters({
          active: 'popularity',
          options: {
            time: false,
            popularity: true,
          }
        })
        break
      }
      default: 
        break
    }
  }

  return (
    <div className={styles.historyWrapper}>
      <LeftBar user={user} />
      <div className={styles.main}>
        <TopBar user={user} />
        <SecondaryTopBar 
          title='Histórico' 
          page={{ history: {
            filters: filters,
            handleFilterChange: handleFilterChange
          }}} 
        />
        <div>
          {filteredAnalysis.length > 0 ? 
            <CardList analysis={filteredAnalysis} isHistory />
              :
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