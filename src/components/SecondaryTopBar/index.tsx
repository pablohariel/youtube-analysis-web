import { Link } from 'react-router-dom'
import { ButtonGroup, Button, IconButton, filter } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { IListAnalysisFilters, IListAnalysisOrderOptions, IHistoryFilters, IHistoryFilterOptions } from '../../interfaces/filters'

import styles from './styles.module.scss'

interface IProps {
  title: string
  page: {
    home?: {
      filters: IListAnalysisFilters
      handleFilterChange: (option: IListAnalysisOrderOptions) => void
    }
    search?: {
      filters: IListAnalysisFilters
      handleFilterChange: (option: IListAnalysisOrderOptions) => void
    }
    history?: {
      filters: IListAnalysisFilters
      handleFilterChange: (option: IListAnalysisOrderOptions) => void
    }
  }
}

const SecondaryTopBar: React.FC<IProps> = ({ title, page }) => {
  const { home, search, history } = page

  return (
    <div className={styles.secondaryTopBarWrapper}>
      <div className={styles.filtersWrapper}>
        <span className={styles.filterText}>Filtras análises</span>
        <div className={styles.btnGroup}>
          {home && (
            <> 
              <button className={home.filters.options.orderBy === 'created_at' ? styles.btnSelected : styles.btnUnselected} onClick={() => home.handleFilterChange('created_at')}>Mais recentes</button>
              <button className={home.filters.options.orderBy === 'viewCount' ? styles.btnSelected : styles.btnUnselected} onClick={() => home.handleFilterChange('viewCount')}>Populares</button>
            </>
          )}
          {search && (
            <> 
              <button className={search.filters.options.orderBy === 'created_at' ? styles.btnSelected : styles.btnUnselected} onClick={() => search.handleFilterChange('created_at')}>Mais recentes</button>
              <button className={search.filters.options.orderBy === 'viewCount' ? styles.btnSelected : styles.btnUnselected} onClick={() => search.handleFilterChange('viewCount')}>Populares</button>
            </>
          )}
          {history && (
            <>
              <button className={history.filters.options.orderBy === 'created_at' ? styles.btnSelected : styles.btnUnselected} onClick={() => history.handleFilterChange('created_at')}>Mais recentes</button>
              <button className={history.filters.options.orderBy === 'viewCount' ? styles.btnSelected : styles.btnUnselected} onClick={() => history.handleFilterChange('viewCount')}>Populares</button>
            </>
          )}
        </div>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.btnCreateAnalysis}>
        
        <Link to='/analysis/create'>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button mr="-px">Criar nova análise</Button>
            <IconButton aria-label="Add to friends" icon={<AddIcon />} />
          </ButtonGroup>
        </Link>
      </div>
    </div>
  )
}

export { SecondaryTopBar }