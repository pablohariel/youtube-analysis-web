import { AiOutlinePlus } from 'react-icons/ai'

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
        
        <button><AiOutlinePlus /><span>Criar nova análise</span></button>
      </div>
    </div>
  )
}

export { SecondaryTopBar }