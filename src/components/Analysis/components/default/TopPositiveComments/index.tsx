import { CommentAnalyzed } from "../../../../../interfaces/comment"

import { Comment } from '../Comment'

import styles from './styles.module.scss'

interface IProps {
  comments: CommentAnalyzed[] | undefined
}

const TopPositiveComments: React.FC<IProps> = ({ comments }) => {

  if(comments === undefined) {
    return (
      <div className={styles.topPositiveCommentsWrapper}>
        <h3>Principais comentários positivos</h3>
        <p className={styles.noCommentsText}>Não foram encontrados comentários.</p>
      </div>
    )
  }

  return (
    <div className={styles.topPositiveCommentsWrapper}>
      <h3>Principais comentários positivos</h3>
      <ul className={styles.commentList}>
        {comments.map((comment, index) => <li key={index}><Comment comment={comment} /></li>)}
      </ul>
    </div>
  )
}

export { TopPositiveComments }