import { JoinedPhrase as IJoinedPhrase } from "../../../../../interfaces/joinedPhrase"

import { CommentsModal } from '../CommentsModal'

interface IProps {
  phrases: IJoinedPhrase[] | undefined
}

import styles from './styles.module.scss'

const ListPhrases: React.FC<IProps> = ({ phrases }) => {
  if(phrases === undefined || phrases.length < 1) {
    return (
      <div className={styles.listPhrasesWrapper}>
        <h3>Frases mineradas</h3>
        <p>Não foram encontradas frases.</p>
      </div>
    )
  }

  return (
    <div className={styles.listPhrasesWrapper}>
      <h3>Frases mineradas</h3>
      <ul>
        {phrases.map(phrase => <li>Frase <strong>{phrase.content}</strong> encontrada, foi utilizada {phrase.timesUsed} vezes. <CommentsModal comments={phrase.comments} /></li>)}
      </ul>
    </div>
  )
}

export { ListPhrases }