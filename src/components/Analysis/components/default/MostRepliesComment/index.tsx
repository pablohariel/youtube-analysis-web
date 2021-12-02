import { Comment as IComment, Reply as IReply } from '../../../../../interfaces/comment'
import { Comment } from '../Comment'

import styles from './styles.module.scss'

interface IProps {
  comment: IComment | IReply | undefined
}

const MostRepliesComment: React.FC<IProps> = ({ comment }) => {
  if(comment === undefined) {
    return (
      <div className={styles.mostRepliesCommentWrapper}>
        <h3>Comentário com mais curtidas</h3>
        <p className={styles.noCommentText}>Comentário com mais respostas não encontrado.</p>
    </div>
    )
  }

  return (
    <div className={styles.mostRepliesCommentWrapper}>
      <h3>Comentário com mais respostas</h3>
      <div className={styles.comment}>
        <Comment comment={comment} />
      </div>
    </div>
  )
}

export { MostRepliesComment }