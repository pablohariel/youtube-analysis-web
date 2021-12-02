import { JoinedPhrase as IJoinedPhrase } from "../../../../../interfaces/joinedPhrase"

interface IProps {
  phrases: IJoinedPhrase[] | undefined
}

import styles from './styles.module.scss'

const ListPhrases: React.FC<IProps> = ({ phrases }) => {
  if(phrases === undefined || phrases.length < 1) {
    return (
      <div className={styles.listPhrasesWrapper}>
        <h3>Frases mineradas</h3>
        <p className={styles.noPhrasesText}>Não foram encontradas frases.</p>
      </div>
    )
  }

  return (
    <div className={styles.listPhrasesWrapper}>
      <h3>Frases mineradas</h3>
      <ul className={styles.phraseList}>
        {phrases.map(phrase => <li className={styles.phrase}><p className={styles.text}>Frase <strong>{phrase.content}</strong> encontrada, foi utilizada <strong className={styles.phraseCount}>{phrase.timesUsed}</strong> vezes.</p></li>)}
      </ul>
    </div>
  )
}

export { ListPhrases }