import { useContext, useState, useEffect } from 'react'
import ReactPaginate   from 'react-paginate'
import { Spinner } from '@chakra-ui/react'

import { LeftBar } from '../../components/LeftBar'
import { SecondaryTopBar } from '../../components/SecondaryTopBar'
import { TopBar } from '../../components/TopBar'
import { CardList } from '../../components/CardList'
import { Introdution } from '../../components/Introdution'
import { IListAnalysisFilters, IListAnalysisOrderOptions } from '../../interfaces/filters'
import { AuthContext } from '../../contexts/auth'
import { api } from '../../services/api'
import { IDefaultAnalysis, IMiningAnalysis, ICompleteAnalysis } from '../../contexts/analysis'

import styles from './styles.module.scss'

export interface IListAnalysis {
  analysisCount: number
  analysis: (IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]
}

const Home: React.FC = () => {
  const [filters, setFilters] = useState<IListAnalysisFilters>({ options: {
    orderBy: 'created_at',
    pageNumber: 1
  }})

  const [analysis, setAnalysis] = useState<IListAnalysis>({
    analysisCount: 0,
    analysis: []
  })

  const [searching, setSearching] = useState<boolean>(false)

  const { user, signOut } = useContext(AuthContext)

  useEffect(() => {
    setSearching(true)
    api.get<IListAnalysis>(`/analysis?orderBy=${filters.options.orderBy}&pageNumber=${filters.options.pageNumber}`)
      .then(result => {
        setAnalysis({ 
          analysisCount: result.data.analysisCount, 
          analysis: [...result.data.analysis]
        })
        setSearching(false)
      })
      .catch(() => setSearching(false)) 
  }, [filters])

  const handleFilterChange = (option: IListAnalysisOrderOptions) => {
    switch(option) {
      case 'created_at': {
        setFilters({
          options: {
            orderBy: 'created_at',
            pageNumber: 1
          }
        })
        
        break
      }
      case 'viewCount': {
        setFilters({
          options: {
            orderBy: 'viewCount',
            pageNumber: 1
          }
        })
        break
      }
      default: 
        break
    }
  }
  
  const handlePageClick = (event: { selected: number }) => {
    setFilters({
      options: {
        pageNumber: event.selected + 1,
        orderBy: filters.options.orderBy
      }
    })
  }

  const pageCount = Math.ceil(analysis.analysisCount / 10)

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
        {searching && <div className={styles.searching}><Spinner size='xl' color='#8981D8' /></div>}
        {!searching && <CardList data={{ analysisCount: analysis.analysisCount, analysis: analysis.analysis }} setAnalysis={setAnalysis} isHistory={false} selectedFilter={filters.options.orderBy} />}
        {(analysis.analysisCount > 0 && !searching) && (
            <div className={styles.pagination}>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                forcePage={filters.options.pageNumber - 1}
                onPageChange={handlePageClick}
                pageCount={pageCount}
                previousLabel="<"
                pageRangeDisplayed={5}
                containerClassName='paginate-container'
                activeLinkClassName='paginate-link-active'
                marginPagesDisplayed={50}
                nextClassName='paginate-next'
                previousClassName='paginate-previous'
                pageLinkClassName='paginate-page-link'
              />
            </div>
        )}
      </div>
    </div>
  )
}

export { Home }