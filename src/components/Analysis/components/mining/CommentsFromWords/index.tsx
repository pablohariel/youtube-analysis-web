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
        <p>Não foram encontrados comentários.</p>
      </div>
    )
  }

  console.log(comments)

  return (
    <div className={styles.commentsFromWordsWrapper}>
      <h3>Comentários contendo palavras específicas</h3>
      <ul>
        {comments.map(comment => <li>Foram encontrados <strong>{comment.commentsCount}</strong> comentários a partir da palavra {comment.word}. <CommentsModal comments={comment.comments} /></li>)}
      </ul>
    </div>
  )
}

export { CommentsFromWords }