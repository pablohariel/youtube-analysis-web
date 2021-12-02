import { CommentsFromUser as ICommentsFromUser } from "../../../../../interfaces/commentFromData"

import { CommentsModal } from '../CommentsModal'

interface IProps {
  comments: ICommentsFromUser[] | undefined
}

import styles from './styles.module.scss'

const CommentsFromUsers: React.FC<IProps> = ({ comments }) => {
  if(comments === undefined || comments.length < 1) {
    return (
      <div className={styles.commentsFromUsersWrapper}>
        <h3>Comentários de usuários</h3>
        <p className={styles.noCommentsText}>Não foram encontrados comentários.</p>
      </div>
    )
  }

  console.log(comments)

  return (
    <div className={styles.commentsFromUsersWrapper}>
      <h3>Comentários de usuários</h3>
      <ul>
        {comments.map(comment => <li>Foram encontrados <strong>{comment.commentsCount}</strong> comentários do usuário <strong>{comment.user.name}</strong>. <CommentsModal comments={comment.comments} /></li>)}
      </ul>
    </div>
  )
}

export { CommentsFromUsers }