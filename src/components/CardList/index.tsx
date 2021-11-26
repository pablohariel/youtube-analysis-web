import { IDefaultAnalysis, IMiningAnalysis, ICompleteAnalysis  } from '../../contexts/analysis'
import { Card } from '../Card'
import { api } from '../../services/api'
import { IListAnalysis } from '../../pages/Home'

import styles from './styles.module.scss'

interface IProps {
  data: IListAnalysis
  setAnalysis: React.Dispatch<React.SetStateAction<IListAnalysis>>
  isHistory: boolean
  selectedFilter: 'created_at' | 'viewCount'
}

const CardList: React.FC<IProps> = ({ data, isHistory, selectedFilter, setAnalysis }) => {
  const { analysis, analysisCount } = data

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
      setAnalysis({
        analysisCount: analysisCount - 1,
        analysis: analysis.filter(a => a.id !== id)
      })
    } catch(error) {
      alert('Não foi possível deletar análise')
    }
  }

  const handlePrivacy = async (id: string, privacy: string) => {
    try {
      const result = await api.patch<IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis>(`/analysis/${id}/privacy`, { privacy })
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
      alert('Não foi possível mudar a privacidade da análise')
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const result = await api.put<IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis>(`/analysis/${id}`)
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
      alert('Não foi possível atualizar análise')
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