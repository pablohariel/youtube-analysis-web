import { Avatar } from '@chakra-ui/react'

import { CommentUser } from '../../../../../interfaces/commentUser'

import styles from './styles.module.scss'

interface IProps {
  user: CommentUser | undefined
}

const TopCommentingUser: React.FC<IProps> = ({ user }) => {
  if(user === undefined) {
    return (
      <div className={styles.topCommentingUserWrapper}>
        <h3>Usuário com mais comentários</h3>
        <p className={styles.noUserText}>Usuário com mais respostas não encontrado.</p>
    </div>
    )
  }

  const { profileImage, name, commentCount } = user

  return (
    <div className={styles.topCommentingUserWrapper}>
      <h3>Usuário com mais comentários</h3>
      <div className={styles.content}>
        <Avatar src={profileImage} />
        <span className={styles.authorName}>{name}</span>
        <p className={styles.text}>Com um total de <strong className={styles.commentCount}>{commentCount}</strong> comentários</p>
      </div>

    </div>
  )
}

export { TopCommentingUser }