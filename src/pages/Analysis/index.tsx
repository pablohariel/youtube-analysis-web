import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'

import { AnalysisContext, ICompleteAnalysis, IDefaultAnalysis, IMiningAnalysis } from '../../contexts/analysis'
import { AuthContext } from '../../contexts/auth'

import { Analysis as AnalysisCard } from '../../components/Analysis'
import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'

import { CompleteResponse, DefaultResponse, MiningResponse } from '../../interfaces/responseData'
import { useEffect } from 'react'
import { api } from '../../services/api'

import styles from './styles.module.scss'
import { Spinner } from '@chakra-ui/react'

const Analysis: React.FC = () => {
  const { id } = useParams() as { id: string }

  const [analysis, setAnalysis] = useState<IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis>()
  const [loading, setLoading] = useState<boolean>(true)

  const { user } = useContext(AuthContext)


  useEffect(() => {
    if(analysis) {
      api.patch<IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis>(`/analysis/${analysis.id}/views`, { views: analysis.viewCount }).then(result => {
      })
    }

  }, [])

  useEffect(() => {
    api.get<IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis>(`/analysis/${id}`).then(result => {
      setAnalysis(result.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div className={styles.analysisWrapper}>
      <LeftBar user={user} />
      <div className={styles.main}>
        <TopBar user={user} />
          {loading && <div className={styles.loading}><Spinner size='xl' color='#8981D8' /></div>}
          {!loading && <main className={styles.main}>
            <h1 className={styles.title}>Dados da análise:</h1>
            {analysis ? (
                <div>
                  <AnalysisCard analysis={analysis as (DefaultResponse | MiningResponse | CompleteResponse)} />
                </div>
              ) 
                :
              (
                <h3>Análise não encontrada</h3>
              )
            }
          </main>
          }
      </div>
    </div>
  )
}

export { Analysis }