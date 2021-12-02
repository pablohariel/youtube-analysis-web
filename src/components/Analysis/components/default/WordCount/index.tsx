import { DefaultRequestWordFilters } from '../../../../../interfaces/requestData'
import { InfoIcon } from '@chakra-ui/icons'
import { 
  Button, 
  Popover, 
  PopoverArrow, 
  PopoverBody, 
  PopoverCloseButton, 
  PopoverContent, 
  PopoverHeader, 
  PopoverTrigger 
} from '@chakra-ui/react'

import styles from './styles.module.scss'

interface IProps {
  count: number | undefined
  requestData: {
    checked: boolean
    includeCommentReplies: boolean
    countRepeatedWords: boolean
  }
}

const WordCount: React.FC<IProps> = ({ count, requestData }) => {
  if(count === undefined) {
    return (
      <div className={styles.wordCountWrapper}>
        <h3>Contagem de palavras</h3>
        <p className={styles.noWordsText}>Não foram encontradas palavras.</p>
      </div>
    )
  }

  const { includeCommentReplies, countRepeatedWords } = requestData

  const filtersMessage = includeCommentReplies ? 'incluindo as respostas' : 'sem incluir as repostas'

  const filtersInfoWrapper = 
  <ul>
    {!includeCommentReplies && !countRepeatedWords && <li>Nenhum filtro selecionado</li> }
    {includeCommentReplies && <li>'Incluir respostas dos comentários'</li>}
    {countRepeatedWords && <li>'Contar palavras repetidas'</li>}
  </ul>

  return (
    <div className={styles.wordCountWrapper}>
      <div className={styles.titleWrapper}>
        <h3>Contagem de Palavras</h3>
        {/* <Popover>
          <PopoverTrigger>
            <Button className={styles.infoBtn}><InfoIcon /></Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Filtros utilizados</PopoverHeader>
            <PopoverBody>{filtersInfoWrapper}</PopoverBody>
          </PopoverContent>
        </Popover> */}
      </div>
      <p className={styles.text}>Foram encontrados um total de <strong className={styles.wordCount}>{count}</strong> palavras {filtersMessage}.</p>
    </div>
  )
}

export { WordCount }