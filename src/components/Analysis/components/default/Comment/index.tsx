import { Text, Avatar } from '@chakra-ui/react'
import dateFormat from "dateformat";

import { RepliesModal } from '../RepliesModal'
import { CommentModal } from '../CommentModal'
import { CommentAnalyzed, Comment as IComment, Reply as IReply } from '../../../../../interfaces/comment'

import styles from './styles.module.scss'

interface IProps {
  comment: CommentAnalyzed | IComment | IReply
}

export const formatDate = (date: string): string => {
  const dateNow = new Date()
  const dateObject = new Date(date)
  const difference = dateNow.getTime() - dateObject.getTime()
  const days = Math.ceil(difference / (1000 * 3600 * 24)) - 1

  if(days < 30) {
    return `${days} dias atrás`
  } else {
    const months = Math.ceil(days / 30)
    return months > 1 ? `${months} meses atrás` : `${months} mês atrás`
  }
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
          <span className={styles.authorName}>{author.name}</span> <span className={styles.commentDate}>{formatDate(published_at)}</span>
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