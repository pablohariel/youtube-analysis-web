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
        <p>Não foram encontrados comentários.</p>
      </div>
    )
  }

  return (
    <div className={styles.topNegativeCommentsWrapper}>
      <h3>Principais comentários negativos</h3>
      {comments.map((comment, index) => <Comment key={index} comment={comment} />)}
    </div>
  )
}

export { TopNegativeComments }