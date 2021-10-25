import { Card } from '../Card'

import styles from './styles.module.scss'

const CardList: React.FC = () => {
  return (
    <div className={styles.cardListWrapper}>
      <div className={styles.header}>
        <span className={styles.resultText}>Total de <strong className={styles.resultCount}>403</strong> resultados</span>
        <div className={styles.divider} />
        <span className={styles.selectedFilter}>Todas</span>
      </div>
      <div className={styles.cardList}>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
      </div>
    </div>
  )
}

export { CardList } 