import { JoinedWord } from "../../../../../interfaces/word"

import styles from './styles.module.scss'

interface IProps {
  words: JoinedWord[] | undefined
}

const TopWords: React.FC<IProps> = ({ words }) => {

  if(words === undefined) {
    return (
      <div className={styles.topWordsWrapper}>
        <h3>Principais palavras</h3>
        <p>Principais palavras não encontradas.</p>
      </div>
    )
  }

  const topWords = words.slice(0, 10)

  return (
    <div className={styles.topWordsWrapper}>
      <h3>Principais palavras</h3>
        <ul>
          {topWords.map(word => (
            <li>{word.content}</li>
          ))}
        </ul>
    </div>
  )
}

export { TopWords }