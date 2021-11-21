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
        <h3>Comentários contendo frases específicas</h3>
        <p>Não foram encontrados comentários.</p>
      </div>
    )
  }

  console.log(comments)

  return (
    <div className={styles.commentsFromPhrasesWrapper}>
      <h3>Comentários contendo frases específicas</h3>
      <ul>
        {comments.map(comment => <li>Foram encontrados <strong>{comment.commentsCount}</strong> comentários a partir da frase {comment.phrase}. <CommentsModal comments={comment.comments} /></li>)}
      </ul>
    </div>
  )
}

export { CommentsFromPhrases }