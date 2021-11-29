import { WordRelatedToVideoTitle } from '../../../../../interfaces/wordRelatedToVideoTitle'
import styles from './styles.module.scss'

interface IProps {
  words: WordRelatedToVideoTitle[] | undefined
}

const WordsRelatedToVideoTitle: React.FC<IProps> = ({ words }) => {

  if(words === undefined || words.length < 1) {
    return (
      <div className={styles.wordsRelatedToVideoTitleWrapper}>
        <h3>Palavras relacionadas ao titulo do vídeo</h3>
        <p>Não foram encontradas palavras.</p>
      </div>
    )
  }

  const topWords = words.slice(0, 10)

  return (
    <div className={styles.wordsRelatedToVideoTitleWrapper}>
      <h3>Palavras relacionadas ao titulo do vídeo</h3>
      <ul>
        {topWords.map(word => (
          <li>{word.word} - utilizada - {word.timesUsed} vezes</li>
        ))}
      </ul>
    </div>
  )
}

export { WordsRelatedToVideoTitle }