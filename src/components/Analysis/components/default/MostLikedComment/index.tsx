import { Comment as IComment, Reply as IReply } from '../../../../../interfaces/comment'
import { Comment } from '../Comment'

import styles from './styles.module.scss'

interface IProps {
  comment: IComment | IReply | undefined
}

const MostLikedComment: React.FC<IProps> = ({ comment }) => {
  if(comment === undefined) {
    return (
      <div className={styles.mostLikedCommentWrapper}>
        <h3>Comentário com mais curtidas</h3>
        <p>Comentário com mais curtidas não encontrado.</p>
      </div>
    )
  }

  return (
    <div className={styles.mostLikedCommentWrapper}>
      <h3 className={styles.title}>Comentário com mais curtidas</h3>
      <Comment comment={comment} />
    </div>
  )
}

export { MostLikedComment }