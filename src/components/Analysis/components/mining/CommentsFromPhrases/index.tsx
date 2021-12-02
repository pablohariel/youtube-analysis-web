import { CommentsFromPhrase as ICommentsFromPhrase } from "../../../../../interfaces/commentFromData"

import { CommentsModal } from '../CommentsModal'

interface IProps {
  comments: ICommentsFromPhrase[] | undefined
}

import styles from './styles.module.scss'

const CommentsFromPhrases: React.FC<IProps> = ({ comments }) => {
  if(comments === undefined || comments.length < 1) {
    return (
      <div className={styles.commentsFromPhrasesWrapper}>
        <h3>Comentários contendo frases</h3>
        <p className={styles.noCommentsText}>Não foram encontrados comentários.</p>
      </div>
    )
  }

  return (
    <div className={styles.commentsFromPhrasesWrapper}>
      <h3>Comentários contendo frases específicas</h3>
      <ul className={styles.commentList}>
        {comments.map(comment => <li className={styles.comment}><p className={styles.text}>Foram encontrados <strong className={styles.commentCount}>{comment.commentsCount}</strong> comentários a partir da frase <strong>{comment.phrase}</strong>.</p> <CommentsModal comments={comment.comments} /> </li>)}
      </ul>
    </div>
  )
}

export { CommentsFromPhrases }