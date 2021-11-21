import { CommentAnalyzed, Comment as IComment } from '../../../../../interfaces/comment'
import styles from './styles.module.scss'

import { RepliesModal } from '../RepliesModal'

interface IProps {
  comment: CommentAnalyzed | IComment
}

const Comment: React.FC<IProps> = ({ comment }) => {
  const { author, content, likeCount, published_at } = comment

  if('replies' in comment) {
    console.log(comment.replies)
  }

  return (
    <div className={styles.commentWrapper}>
      <img src={author.profileImage} />
      <div className={styles.content}>
        <div>
          <span>{author.name}</span> <span>{published_at}</span>
        </div>
        <p>{content}</p>
        <div>
          <span>{likeCount} curtidas</span>
          {'replies' in comment && <span>{comment.replyCount} respostas</span>}
          {'replies' in comment && <RepliesModal replies={comment.replies} />}
        </div>
      </div>  
    </div>
  )
}

export { Comment }