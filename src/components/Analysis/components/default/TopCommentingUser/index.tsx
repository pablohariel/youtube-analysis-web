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
        <p>Usuário com mais respostas não encontrado.</p>
    </div>
    )
  }

  const { profileImage, name, commentCount } = user

  return (
    <div className={styles.topCommentingUserWrapper}>
      <h3>Usuário com mais comentários</h3>
      <div>
        <img src={profileImage} />
        <span>{name}</span>
        <p>Com um total de <strong>{commentCount}</strong> comentários</p>
      </div>

    </div>
  )
}

export { TopCommentingUser }