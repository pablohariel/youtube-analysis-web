import { Comment as IComment, Reply as IReply } from '../../../../../interfaces/comment'
import styles from './styles.module.scss'

interface IProps {
  comment: IComment | IReply
}

const Comment: React.FC<IProps> = ({ comment }) => {
  const { author, content, likeCount, published_at } = comment

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
        </div>
      </div>  
    </div>
  )
}

export { Comment }