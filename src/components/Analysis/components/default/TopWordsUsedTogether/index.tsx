import { WordsTogether } from "../../../../../interfaces/wordsTogether"

import styles from './styles.module.scss'

interface IProps {
  words: WordsTogether[] | undefined
}

const TopWordsUsedTogether: React.FC<IProps> = ({ words }) => {

  if(words === undefined) {
    return (
      <div className={styles.topWordsWrapper}>
        <h3>Principais palavras usadas em conjunto</h3>
        <p>Principais palavras usadas em conjunto não encontradas.</p>
      </div>
    )
  }

  const topWords = words.slice(0, 5)

  return (
    <div className={styles.topWordsWrapper}>
      <h3>Principais palavras usadas em conjunto</h3>
        <ul>
          {topWords.map(word => (
            <li><strong>{word.words[0]}</strong> e <strong>{word.words[1]}</strong></li>
          ))}
        </ul>
    </div>
  )
}

export { TopWordsUsedTogether }