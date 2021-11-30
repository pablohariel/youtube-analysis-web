import { Text, Avatar } from '@chakra-ui/react'

import { RepliesModal } from '../RepliesModal'
import { CommentModal } from '../CommentModal'
import { CommentAnalyzed, Comment as IComment, Reply as IReply } from '../../../../../interfaces/comment'

import styles from './styles.module.scss'

interface IProps {
  comment: CommentAnalyzed | IComment | IReply
}

const Comment: React.FC<IProps> = ({ comment }) => {
  const { author, content, likeCount, published_at } = comment

  if('replies' in comment) {
    console.log(comment.replies)
  }

  return (
    <div className={styles.commentWrapper}>
      <Avatar src={author.profileImage} />
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.authorName}>{author.name}</span> <span className={styles.commentDate}>{published_at}</span>
        </div>
        <Text className={styles.main} noOfLines={4}>{content}</Text>
        <div className={styles.footer}>
          <span className={styles.likeCount}>{likeCount} curtidas</span>
          {content.length > 140 && <CommentModal comment={comment} />}
          {/* {'replies' in comment && <span>{comment.replyCount} respostas</span>}
          {'replies' in comment && <RepliesModal replies={comment.replies} />} */}
        </div>
      </div>  
    </div>
  )
}

export { Comment }