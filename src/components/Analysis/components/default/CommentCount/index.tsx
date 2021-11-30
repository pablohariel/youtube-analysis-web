import { DefaultRequestCommentFilters } from '../../../../../interfaces/requestData'
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
  requestData: DefaultRequestCommentFilters
}

const CommentCount: React.FC<IProps> = ({ count, requestData }) => {
  const { includeCommentReplies } = requestData

  if(count === undefined) {
    return (
      <div className={styles.commentCountWrapper}>
        <h3>Contagem de comentários</h3>
        <p>Não foram encontrados comentários.</p>
      </div>
    )
  }

  const filtersMessage = includeCommentReplies ? 'incluindo as respostas' : 'sem incluir as repostas'

  const filtersInfoWrapper = 
    <ul>
      <li>{includeCommentReplies && 'Incluir respostas dos comentários'}</li>
    </ul>

  return (
    <div className={styles.commentCountWrapper}>
      <div className={styles.titleWrapper}>
        <h3>Contagem de comentários</h3>
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

      <p className={styles.text}>Foram encontrados um total de <strong className={styles.commentCount}>{count}</strong> comentários {filtersMessage}.</p>

    </div>
  )
}

export { CommentCount }