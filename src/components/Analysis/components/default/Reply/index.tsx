import { Reply as IReply } from '../../../../../interfaces/comment'
import styles from './styles.module.scss'

interface IProps {
  reply: IReply
}

const Reply: React.FC<IProps> = ({ reply }) => {
  const { author, content, likeCount, published_at } = reply

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

export { Reply }