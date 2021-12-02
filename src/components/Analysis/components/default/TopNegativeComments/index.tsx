import { CommentAnalyzed } from "../../../../../interfaces/comment"

import { Comment } from '../Comment'

import styles from './styles.module.scss'

interface IProps {
  comments: CommentAnalyzed[] | undefined
}

const TopNegativeComments: React.FC<IProps> = ({ comments }) => {

  if(comments === undefined) {
    return (
      <div className={styles.topNegativeCommentsWrapper}>
        <h3>Principais comentários negativos</h3>
        <p className={styles.noCommentsText}>Não foram encontrados comentários.</p>
      </div>
    )
  }

  return (
    <div className={styles.topNegativeCommentsWrapper}>
      <h3>Principais comentários negativos</h3>
      <ul className={styles.commentList}>
        {comments.map((comment, index) => <li key={index}><Comment comment={comment} /></li>)}
      </ul>
    </div>
  )
}

export { TopNegativeComments }