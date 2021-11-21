import styles from './styles.module.scss'

interface IProps {
  count: number | undefined
}

const WordCount: React.FC<IProps> = ({ count }) => {

  if(count === undefined) {
    return (
      <div className={styles.wordCountWrapper}>
        <h3>Contagem de palavras</h3>
        <p>Não foram encontradas palavras.</p>
      </div>
    )
  }

  return (
    <div className={styles.wordCountWrapper}>
      <h3>Contagem de palavras</h3>
      <p>Foram encontrados um total de <strong>{count}</strong> palavras</p>
    </div>
  )
}

export { WordCount }