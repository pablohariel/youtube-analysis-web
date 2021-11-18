import styles from './styles.module.scss'

const Divider: React.FC = () => {
  return (
    <div className={styles.divider}>
      <span className={styles.borderLeft}></span>
      <span className={styles.text}>OU</span>
      <span className={styles.borderRight}></span>
    </div>
  )
}

export { Divider }