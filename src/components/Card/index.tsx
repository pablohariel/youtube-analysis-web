import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'

import { AnalysisContext, IDefaultAnalysis, IMiningAnalysis, ICompleteAnalysis } from '../../contexts/analysis'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { api } from '../../services/api'

import styles from './styles.module.scss'

interface IProps {
  analysis: IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis
  isHistory: boolean
}

const Card: React.FC<IProps> = ({ analysis, isHistory }) => {
  const { videoData, id } = analysis

  const { analysis: allAnalysis, setAnalysis } = useContext(AnalysisContext)

  const history = useHistory()
  console.log(isHistory)

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/analysis/${analysis.id}`)
      setAnalysis(allAnalysis.filter(a => a.id !== analysis.id))
    } catch(error) {
      alert('Não foi possível deletar a análise')
    }
    console.log('handle delete')
  }

  
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
            <MenuItem onClick={handleDelete}>Deletar</MenuItem>
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
          <AiFillDislike />
          <span>{videoData.statistics.dislikeCount}</span>
        </div>
        <div>  
          <span>{videoData.statistics.viewCount}</span>
        </div>
      </footer>
    </div>
  )
}

export { Card }