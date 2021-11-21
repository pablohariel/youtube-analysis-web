import { JoinedWord } from "../../../../../interfaces/word"

import { CommentsModal } from '../CommentsModal'

interface IProps {
  words: JoinedWord[] | undefined
}

import styles from './styles.module.scss'

const ListWords: React.FC<IProps> = ({ words }) => {
  if(words === undefined || words.length < 1) {
    return (
      <div className={styles.listWordsWrapper}>
        <h3>Palavras mineradas</h3>
        <p>Não foram encontradas palavras.</p>
      </div>
    )
  }

  return (
    <div className={styles.listWordsWrapper}>
      <h3>Palavras mineradas</h3>
      <ul>
        {words.map(word => <li>Palavra <strong>{word.content}</strong> encontrada, foi utilizada {word.timesUsed} vezes. <CommentsModal comments={word.comments} /></li>)}
      </ul>
    </div>
  )
}

export { ListWords }