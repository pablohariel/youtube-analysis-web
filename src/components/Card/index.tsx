import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { ChevronDownIcon, ViewIcon } from '@chakra-ui/icons'


import { AnalysisContext, IDefaultAnalysis, IMiningAnalysis, ICompleteAnalysis } from '../../contexts/analysis'
import { api } from '../../services/api'

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
        <Menu>
          <MenuButton
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
            _focus={{ boxShadow: "outline" }}
          >
            <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleUpdate(id)}>Atualizar</MenuItem>
            <MenuItem onClick={() => handlePrivacy(id, analysis.privacy)}>{analysis.privacy}</MenuItem>
            <MenuItem onClick={() => handleDelete(id)}>Deletar</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <header className={styles.header}>
        <span className={styles.analysisData}>{analysis.created_at}</span>
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
          <AiFillLike />
          <span>{videoData.statistics.likeCount}</span>
        </div>
        <div>  
          <ViewIcon />
          <span>{viewCount}</span>
        </div>
        <div>  
          <span>{videoData.statistics.viewCount}</span>
        </div>
      </footer>
    </div>
  )
}

export { Card }