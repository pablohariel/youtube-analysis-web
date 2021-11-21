import { Comment as IComment } from '../../../../../interfaces/comment'
import { Comment } from '../Comment'

import styles from './styles.module.scss'

interface IProps {
  comment: IComment | undefined
}

const MostRepliesComment: React.FC<IProps> = ({ comment }) => {
  if(comment === undefined) {
    return (
      <div className={styles.mostRepliesCommentWrapper}>
        <h3>Comentário com mais curtidas</h3>
        <p>Comentário com mais respostas não encontrado.</p>
    </div>
    )
  }

  return (
    <div className={styles.mostRepliesCommentWrapper}>
      <h3>Comentário com mais respostas</h3>
      <Comment comment={comment} />
    </div>
  )
}

export { MostRepliesComment }