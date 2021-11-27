import { CommentsGroupedByPolarityNoComments } from "../../../../../interfaces/comment"

import styles from './styles.module.scss'

interface IProps {
  commentsPolarity: CommentsGroupedByPolarityNoComments | undefined
}

const CommentsPolarity: React.FC<IProps> = ({ commentsPolarity }) => {

  if(commentsPolarity === undefined) {
    return (
      <div className={styles.commentsPolarityWrapper}>
        <h3>Polaridade dos comentários</h3>
        <p>Análise de polaridade não encontrada.</p>
      </div>
    )
  }

  const { positive, neutral, negative } = commentsPolarity

  const commentCount = positive.totalCount + neutral.totalCount + negative.totalCount

  return (
    <div className={styles.commentsPolarityWrapper}>
      <h3>Polaridade dos comentários</h3>
      <p>Baseado em {commentCount} comentários</p>
      <span>Positivos: {positive.totalCount}</span>
      <span>Neutros: {neutral.totalCount}</span>
      <span>Negativos: {negative.totalCount}</span>
    </div>
  )
}

export { CommentsPolarity }