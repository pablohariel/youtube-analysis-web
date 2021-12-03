import { CommentsFromWord as ICommentsFromWord } from "../../../../../interfaces/commentFromData"

import { CommentsModal } from '../CommentsModal'

interface IProps {
  comments: ICommentsFromWord[] | undefined
}

import styles from './styles.module.scss'

const CommentsFromWords: React.FC<IProps> = ({ comments }) => {
  if(comments === undefined || comments.length < 1) {
    return (
      <div className={styles.commentsFromWordsWrapper}>
        <h3>Comentários contendo palavras específicas</h3>
        <p className={styles.noCommentsText}>Não foram encontrados comentários.</p>
      </div>
    )
  }

  console.log(comments)

  return (
    <div className={styles.commentsFromWordsWrapper}>
      <h3>Comentários contendo palavras específicas</h3>
      <ul className={styles.commentList}>
        {comments.map(comment => <li className={styles.comment}><p className={styles.text}>Foram encontrados <strong className={styles.commentCount}>{comment.commentsCount}</strong> comentários a partir da palavra <strong>{comment.word}</strong>.</p> <CommentsModal comments={comment.comments} /></li>)}
      </ul>
    </div>
  )
}

export { CommentsFromWords }