import { useContext, useState } from 'react'

import { LeftBar } from '../../components/LeftBar'
import { SecondaryTopBar } from '../../components/SecondaryTopBar'
import { TopBar } from '../../components/TopBar'
import { CardList } from '../../components/CardList'
import { Introdution } from '../../components/Introdution'

import { filterAnalysis } from '../../utils/filterAnalysis'

import { IFilters, IFilterOptions } from '../../interfaces/filters'

import { AuthContext } from '../../contexts/auth'
import { AnalysisContext, IDefaultAnalysis, IMiningAnalysis, ICompleteAnalysis } from '../../contexts/analysis'

import styles from './styles.module.scss'
import { useEffect } from 'react'
import { api } from '../../services/api'

const Home: React.FC = () => {
  const [ filters, setFilters ] = useState<IFilters>({ active: 'time', options: {
    time: true,
    popularity: false,
    own: false
  }})

  const { user, signOut } = useContext(AuthContext)
  const { analysis, setAnalysis } = useContext(AnalysisContext)

  useEffect(() => {
    api.get<(IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]>('/analysis').then(result => setAnalysis(result.data))
  }, [])

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

  

  const analysisToShow = analysis.filter(a => a.privacy === 'public')
  let filteredAnalysis = [] as (IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]

  switch(filters.active) {
    case 'time': {
      filteredAnalysis = filterAnalysis({ analysis: analysisToShow, orderBy: 'time', userId: user?.id }).filteredAnalysis
      break
    }
    case 'popularity': {
      filteredAnalysis = filterAnalysis({ analysis: analysisToShow, orderBy: 'popularity', userId: user?.id }).filteredAnalysis
      break
    }
    case 'own': {
      filteredAnalysis = filterAnalysis({ analysis: analysisToShow, orderBy: 'own', userId: user?.id }).filteredAnalysis
      break
    }
  }

  return (
    <div className={styles.homeWrapper}>
      <LeftBar user={user} />
      <div className={styles.main}>
        <TopBar user={user} />
        {!user && <Introdution />}
        <SecondaryTopBar 
          title='Análises' 
          page={{
            home: {
              filters: filters,
              handleFilterChange: handleFilterChange
            }
          }}
        />
        <CardList analysis={filteredAnalysis} isHistory={false} />
      </div>
    </div>
  )
}

export { Home }