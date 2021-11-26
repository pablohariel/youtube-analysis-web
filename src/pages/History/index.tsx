import { useEffect, useContext, useState } from 'react'
import ReactPaginate   from 'react-paginate'
import { Spinner } from '@chakra-ui/react'

import { AuthContext } from "../../contexts/auth"

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { SecondaryTopBar } from '../../components/SecondaryTopBar'
import { CardList } from '../../components/CardList'
import { IListAnalysisFilters, IListAnalysisOrderOptions } from '../../interfaces/filters'
import { api } from '../../services/api'
import { IListAnalysis } from '../Home'

import styles from './styles.module.scss'

const History: React.FC = () => {
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
    api.get<IListAnalysis>(`/analysis/history?orderBy=${filters.options.orderBy}&pageNumber=${filters.options.pageNumber}`)
      .then(result => {
        console.log(result.data.analysis)
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
        {searching && <div className={styles.searching}><Spinner size='xl' color='#8981D8' /></div>}
        {!searching && <CardList data={analysis} selectedFilter={filters.options.orderBy} setAnalysis={setAnalysis} isHistory />}
        {!searching && 
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
        } 
      </div>
    </div>
  )
}

export { History }