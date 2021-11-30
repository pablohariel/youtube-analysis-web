import { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactPaginate   from 'react-paginate'
import { Spinner } from '@chakra-ui/react'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { SecondaryTopBar } from '../../components/SecondaryTopBar'
import { CardList } from '../../components/CardList'
import { AuthContext } from '../../contexts/auth'
import { IListAnalysisFilters, IListAnalysisOrderOptions } from '../../interfaces/filters'
import { IListAnalysis } from '../Home'
import { api } from '../../services/api'

import styles from './styles.module.scss'

const Search: React.FC = () => {
  const [filters, setFilters] = useState<IListAnalysisFilters>({ options: {
    orderBy: 'created_at',
    pageNumber: 1
  }})
  const [analysis, setAnalysis] = useState<IListAnalysis>({
    analysisCount: 0,
    analysis: []
  })
  const [searching, setSearching] = useState<boolean>(false)

  const query = new URLSearchParams(useLocation().search)
  const queryValue = query.get('query')

  const { user } = useContext(AuthContext)

  useEffect(() => {
    setSearching(true)
    api.get<IListAnalysis>(`/analysis?searchBy=videoTitle&videoTitle=${queryValue}&orderBy=${filters.options.orderBy}&pageNumber=${filters.options.pageNumber}`)
      .then(result => {
        setAnalysis({ 
          analysisCount: result.data.analysisCount, 
          analysis: [...result.data.analysis]
        })
        setSearching(false)
      })
      .catch(() => setSearching(false)) 
  }, [filters, queryValue])

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
    <div className={styles.searchWrapper}>
      <LeftBar user={user} />
      <main className={styles.main}>
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
        {searching && <div className={styles.searching}><Spinner size='xl' color='#8981D8' /></div>}
        {!searching && <CardList data={{ analysisCount: analysis.analysisCount, analysis: analysis.analysis }} setAnalysis={setAnalysis} isHistory={false} selectedFilter={filters.options.orderBy} />}
        {(analysis.analysisCount > 0 && !searching) && 
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
      </main>
    </div>
  )
}

export { Search }