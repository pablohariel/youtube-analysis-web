import { JoinedWord } from "../../../../../interfaces/word"

interface IProps {
  words: JoinedWord[] | undefined
}

import styles from './styles.module.scss'

const ListWords: React.FC<IProps> = ({ words }) => {
  if(words === undefined || words.length < 1) {
    return (
      <div className={styles.listWordsWrapper}>
        <h3>Palavras mineradas</h3>
        <p className={styles.noWordsText}>Não foram encontradas palavras.</p>
      </div>
    )
  }

  return (
    <div className={styles.listWordsWrapper}>
      <h3>Palavras mineradas</h3>
      <ul className={styles.wordList}>
        {words.map(word => <li className={styles.word}><p className={styles.text}>Palavra <strong>{word.content}</strong> encontrada, foi utilizada <span className={styles.wordCount}>{word.timesUsed}</span> vezes.</p></li>)}
      </ul>
    </div>
  )
}

export { ListWords }