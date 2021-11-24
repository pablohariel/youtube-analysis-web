import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'

import { AnalysisContext, IDefaultAnalysis, IMiningAnalysis, ICompleteAnalysis } from '../../contexts/analysis'
import { ChevronDownIcon, ViewIcon } from '@chakra-ui/icons'

import { api } from '../../services/api'

import styles from './styles.module.scss'

interface IProps {
  analysis: IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis
  isHistory: boolean
}

const Card: React.FC<IProps> = ({ analysis, isHistory }) => {
  const { videoData, id, viewCount } = analysis

  const { analysis: allAnalysis, setAnalysis } = useContext(AnalysisContext)

  const history = useHistory()
  console.log(isHistory)

  const handleDelete = async () => {
    try {
      const result = await api.delete(`/analysis/${analysis.id}`)
      setAnalysis(allAnalysis.filter(a => a.id !== analysis.id))
    } catch(error) {
      alert('Não foi possível deletar análise')
    }
  }

  const handlePrivacy = async () => {
    try {
      const result = await api.patch<IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis>(`/analysis/${analysis.id}/privacy`, { privacy: analysis.privacy })
      setAnalysis(allAnalysis.map(a => {
        if(a.id === analysis.id) {
          return result.data
        } else {
          return a
        }
      }))
    } catch(error) {
      alert('Não foi possível mudar a privacidade da análise')
    }
  }

  const handleUpdate = async () => {
    try {
      const result = await api.put<IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis>(`/analysis/${analysis.id}`)
      setAnalysis(allAnalysis.map(a => {
        if(a.id === analysis.id) {
          return result.data
        } else {
          return a
        }
      }))
    } catch(error) {
      alert('Não foi possível atualizar análise')
    }
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
            <MenuItem onClick={handleUpdate}>Atualizar</MenuItem>
            <MenuItem onClick={handlePrivacy}>{analysis.privacy}</MenuItem>
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