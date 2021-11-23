import { IDefaultAnalysis, IMiningAnalysis, ICompleteAnalysis  } from '../../contexts/analysis'
import { Card } from '../Card'

import styles from './styles.module.scss'

interface IProps {
  analysis: (IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]
  isHistory: boolean
}

const CardList: React.FC<IProps> = ({ analysis, isHistory }) => {
  console.log('cardlist', analysis)

  return (
    <div className={styles.cardListWrapper}>
      <div className={styles.header}>
        <span className={styles.resultText}>Total de <strong className={styles.resultCount}>{analysis.length}</strong> resultados</span>
        <div className={styles.divider} />
        <span className={styles.selectedFilter}>Todas</span>
      </div>
      <div className={styles.cardList}>
        {analysis.map(a => <li key={a.id}><Card analysis={a} isHistory={isHistory} /></li>)}
      </div>
    </div>
  )
}

export { CardList } 