import styles from './styles.module.scss'

interface IProps {
  count: number | undefined
}

const CommentCount: React.FC<IProps> = ({ count }) => {

  if(count === undefined) {
    return (
      <div className={styles.commentCountWrapper}>
        <h3>Contagem de comentários</h3>
        <p>Não foram encontrados comentários.</p>
      </div>
    )
  }

  return (
    <div className={styles.commentCountWrapper}>
      <h3>Contagem de comentários</h3>
      <p>Foram encontrados um total de <strong>{count}</strong> comentários</p>
    </div>
  )
}

export { CommentCount }