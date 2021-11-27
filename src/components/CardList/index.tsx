import { IDefaultAnalysis, IMiningAnalysis, ICompleteAnalysis  } from '../../contexts/analysis'
import { Card } from '../Card'
import { api } from '../../services/api'
import { IListAnalysis } from '../../pages/Home'
import { useToast } from "@chakra-ui/react"

import styles from './styles.module.scss'

interface IProps {
  data: IListAnalysis
  setAnalysis: React.Dispatch<React.SetStateAction<IListAnalysis>>
  isHistory: boolean
  selectedFilter: 'created_at' | 'viewCount'
}

const CardList: React.FC<IProps> = ({ data, isHistory, selectedFilter, setAnalysis }) => {
  const { analysis, analysisCount } = data
  const toast = useToast()

  let selectedFilterFormatted = 'undefined'
  switch(selectedFilter) {
    case 'created_at':
      selectedFilterFormatted = 'Mais recentes'
      break
    case 'viewCount':
      selectedFilterFormatted = 'Populares'
      break
    default:
      break
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/analysis/${id}`)
      toast({
        title: 'Análise deletada com sucesso',
        status: 'success',
        isClosable: true,
      })
      setAnalysis({
        analysisCount: analysisCount - 1,
        analysis: analysis.filter(a => a.id !== id)
      })
    } catch(error) {
      console.log(error)
      toast({
        title: 'Não foi possível deletar análise',
        description: `Tente novamente ou entre em contato com a administração.`,
        status: 'error',
        isClosable: true,
      })
    }
  }

  const handlePrivacy = async (id: string, privacy: string) => {
    try {
      const result = await api.patch<IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis>(`/analysis/${id}/privacy`, { privacy })
      toast({
        title: 'Privacidade alterada com sucesso',
        description: `Agora a análise é ${result.data.privacy}.`,
        status: 'success',
        isClosable: true,
      })
      setAnalysis({
        analysisCount,
        analysis: analysis.map(a => {
          if(a.id === id) {
            return result.data
          } else {
            return a
          }
        })
      })
    } catch(error) {
      console.log(error)
      toast({
        title: 'Não foi possível alterar privacidade',
        description: 'Tente novamente ou entre em contato com a administração.',
        status: 'error',
        isClosable: true,
      })
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const result = await api.put<IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis>(`/analysis/${id}`)
      toast({
        title: 'Análise atualizada com sucesso',
        description: 'Todas as opções foram atualizadas',
        status: 'success',
        isClosable: true,
      })
      setAnalysis({
        analysisCount,
        analysis: analysis.map(a => {
          if(a.id === id) {
            return result.data
          } else {
            return a
          }
        })
      })
    } catch(error) {
      console.log(error)
      toast({
        title: 'Não foi possível atualizar análise',
        description: 'Tente novamente ou entre em contato com a administração.',
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <div className={styles.cardListWrapper}>
      <div className={styles.header}>
        <span className={styles.resultText}>Total de <strong className={styles.resultCount}>{analysisCount}</strong> resultados</span>
        <div className={styles.divider} />
        <span className={styles.selectedFilter}>{selectedFilterFormatted}</span>
      </div>
      <div className={styles.cardList}>
        {analysis.map(a => <li key={a.id}><Card analysis={a} handleUpdate={handleUpdate} handleDelete={handleDelete} handlePrivacy={handlePrivacy} isHistory={isHistory} /></li>)}
      </div>
    </div>
  )
}

export { CardList } 