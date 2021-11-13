import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { ButtonGroup, Button, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import styles from './styles.module.scss'

interface IProps {
  title: string
}

const SecondaryTopBar: React.FC<IProps> = ({ title }) => {
  return (
    <div className={styles.secondaryTopBarWrapper}>
      <div className={styles.filtersWrapper}>
        <span className={styles.filterText}>Filtras análises</span>
        <div className={styles.btnGroup}>
          <button className={styles.btnSelected}>Todas</button>
          <button className={styles.btnUnselected}>Populares</button>
          <button className={styles.btnUnselected}>Minhas</button>
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