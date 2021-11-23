import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { SecondaryTopBar } from '../../components/SecondaryTopBar'
import { CardList } from '../../components/CardList'

import { AuthContext } from '../../contexts/auth'
import { AnalysisContext, IDefaultAnalysis, IMiningAnalysis, ICompleteAnalysis } from '../../contexts/analysis'

import { IFilters, IFilterOptions } from '../../interfaces/filters'

import { useEffect } from 'react'
import { filterAnalysis } from '../../utils/filterAnalysis'

import styles from './styles.module.scss'

const Search: React.FC = (props) => {
  const [ filters, setFilters ] = useState<IFilters>({ active: 'time', options: {
    time: true,
    popularity: false,
    own: false
  }})
  const [analysisFound, setAnalysisFound] = useState<(IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]>([])
  const [filteredAnalysis, setfilteredAnalysis] = useState<(IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]>([])

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

  useEffect(() => {
    switch(filters.active) {
      case 'time': {
        setfilteredAnalysis([...filterAnalysis({ analysis: analysisFound, orderBy: 'time', userId: user?.id }).filteredAnalysis])
        break
      }
      case 'popularity': {
        setfilteredAnalysis([...filterAnalysis({ analysis: analysisFound, orderBy: 'popularity', userId: user?.id }).filteredAnalysis])
        break
      }
      case 'own': {
        setfilteredAnalysis([...filterAnalysis({ analysis: analysisFound, orderBy: 'own', userId: user?.id }).filteredAnalysis])
        break
      }
    }
  }, [analysisFound, filters])

  const handleFilterChange = (option: IFilterOptions) => {
    switch(option) {
      case 'time': {
        setFilters({
          active: 'time',
          options: {
            time: true,
            popularity: false,
            own: false
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
            own: false
          }
        })
        break
      }
      case 'own': {
        setFilters({
          active: 'own',
          options: {
            time: false,
            popularity: false,
            own: true
          }
        })
        break
      }
      default: 
        break
    }
  }

  return (
    <div className={styles.searchWrapperClosed}>
      <LeftBar user={user} />
      <main>
        <TopBar user={user} />
        <SecondaryTopBar 
          title={`Análises encontradas`} 
          page={{
            search: {
              filters: filters,
              handleFilterChange: handleFilterChange
            }
          }}
        />
        <CardList analysis={filteredAnalysis} isHistory={false} />
      </main>
    </div>
  )
}

export { Search }