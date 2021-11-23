import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { ButtonGroup, Button, IconButton, filter } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'

import { IFilters, IFilterOptions, IHistoryFilters, IHistoryFilterOptions } from '../../interfaces/filters'

import styles from './styles.module.scss'

interface IProps {
  title: string
  page: {
    home?: {
      filters: IFilters
      handleFilterChange: (option: IFilterOptions) => void
    }
    search?: {
      filters: IFilters
      handleFilterChange: (option: IFilterOptions) => void
    }
    history?: {
      filters: IHistoryFilters
      handleFilterChange: (option: IHistoryFilterOptions) => void
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
              <button className={home.filters.options.time ? styles.btnSelected : styles.btnUnselected} onClick={() => home.handleFilterChange('time')}>Data</button>
              <button className={home.filters.options.popularity ? styles.btnSelected : styles.btnUnselected} onClick={() => home.handleFilterChange('popularity')}>Polularidade</button>
              <button className={home.filters.options.own ? styles.btnSelected : styles.btnUnselected} onClick={() => home.handleFilterChange('own')}>Minhas</button>
            </>
          )}
          {search && (
            <> 
              <button className={search.filters.options.time ? styles.btnSelected : styles.btnUnselected} onClick={() => search.handleFilterChange('time')}>Data</button>
              <button className={search.filters.options.popularity ? styles.btnSelected : styles.btnUnselected} onClick={() => search.handleFilterChange('popularity')}>Polularidade</button>
              <button className={search.filters.options.own ? styles.btnSelected : styles.btnUnselected} onClick={() => search.handleFilterChange('own')}>Minhas</button>
            </>
          )}
          {history && (
            <>
              <button className={history.filters.options.time ? styles.btnSelected : styles.btnUnselected} onClick={() => history.handleFilterChange('time')}>Data</button>
              <button className={history.filters.options.popularity ? styles.btnSelected : styles.btnUnselected} onClick={() => history.handleFilterChange('popularity')}>Polularidade</button>
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