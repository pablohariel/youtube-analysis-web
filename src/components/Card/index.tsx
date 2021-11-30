import { useHistory } from 'react-router-dom'
import { 
  Text, 
  Menu,
  MenuButton, 
  MenuList, 
  MenuItem, 
  Popover, 
  PopoverTrigger, 
  Button, 
  PopoverContent, 
  PopoverArrow, 
  PopoverCloseButton ,
  PopoverHeader,
  PopoverBody
} from '@chakra-ui/react'
import { RiThumbUpFill, RiQuestionAnswerFill } from 'react-icons/ri'
import { ChevronDownIcon, ViewIcon, DeleteIcon, ViewOffIcon, RepeatClockIcon } from '@chakra-ui/icons'


import { AnalysisContext, IDefaultAnalysis, IMiningAnalysis, ICompleteAnalysis } from '../../contexts/analysis'
import { formatDate } from '../../utils/formatDate'

import { IListAnalysis } from '../../pages/Home'

import styles from './styles.module.scss'

interface IProps {
  analysis: IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis
  handlePrivacy: (id: string, privacy: string) => Promise<void>
  handleDelete: (id: string) => Promise<void>
  handleUpdate: (id: string) => Promise<void>
  isHistory: boolean
}

const Card: React.FC<IProps> = ({ analysis, isHistory, handleDelete, handlePrivacy, handleUpdate }) => {
  const { videoData, id, viewCount } = analysis

  const history = useHistory()
  
  return (
    <div className={`${styles.cardWrapper}  ${isHistory === true && styles.historyCardWrapper}`}>
      <div className={styles.analysisHandler}>
        {/* <Popover>
          <PopoverTrigger>
            <Button><InfoIcon /></Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>{`Análise do tipo ${analysis.requestData.type}`}</PopoverHeader>
            <PopoverBody>{JSON.stringify(analysis.requestData.options)}</PopoverBody>
          </PopoverContent> 
        </Popover> */}
        <Menu>
          <MenuButton
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
          >
            <ChevronDownIcon />
          </MenuButton>
          <MenuList className={styles.menuList}>
            <MenuItem 
              className={styles.listItem} 
              onClick={() => handleUpdate(id)}
            > 
              <div>
                <RepeatClockIcon />
                <span>Atualizar</span>
              </div>
            </MenuItem>
            <MenuItem 
              className={styles.listItem} 
              onClick={() => handlePrivacy(id, analysis.privacy)}
            >
              {analysis.privacy === 'public' ? 
                <div>
                  <ViewIcon />
                  <span>Privar</span>
                </div> : 
                <div>
                  <ViewOffIcon /> 
                  <span>Publicar</span>
                </div>
              }
            </MenuItem>
            <MenuItem 
              className={styles.listItem} 
              onClick={() => handleDelete(id)}
            >
              <div>
                <DeleteIcon />
                <span>Deletar</span>
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <header className={styles.header}>
        <span className={styles.analysisData}>{formatDate(analysis.created_at)}</span>
        <span className={styles.analysisUser}>{analysis.user.name}</span>
      </header>
      <main className={styles.main}>
        <Text className={styles.videoTitle} noOfLines={2} onClick={() => history.push(`/analysis/${id}`)}>{videoData.title}</Text>
        <Text className={styles.videoDescription} noOfLines={videoData.description && videoData.title.length > 26 ? 5 : 6}>
          {videoData.description} 💜
        </Text>
      </main>
      <footer className={styles.footer}>
        <div>
          <RiThumbUpFill />
          <span>{videoData.statistics.likeCount}</span>
        </div>
        <div>  
          <ViewIcon />
          <span>{videoData.statistics.viewCount}</span>
        </div>
        <div>  
          <RiQuestionAnswerFill />
          <span>{videoData.statistics.commentCount}</span>
        </div>
      </footer>
    </div>
  )
}

export { Card }