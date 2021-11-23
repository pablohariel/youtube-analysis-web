import { useParams } from 'react-router-dom'
import { useContext } from 'react'

import { AnalysisContext, ICompleteAnalysis, IDefaultAnalysis, IMiningAnalysis } from '../../contexts/analysis'
import { AuthContext } from '../../contexts/auth'

import { Analysis as AnalysisCard } from '../../components/Analysis'
import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'

import styles from './styles.module.scss'
import { CompleteResponse, DefaultResponse, MiningResponse } from '../../interfaces/responseData'
import { useEffect } from 'react'
import { api } from '../../services/api'

const Analysis: React.FC = () => {
  const { id } = useParams() as { id: string }

  const { analysis: allAnalysis, setAnalysis } = useContext(AnalysisContext)
  const { user } = useContext(AuthContext)

  const analysisToShow = allAnalysis.filter(a => a.privacy === 'public' || a.userId === user?.id)

  const analysis = analysisToShow.filter(a => a.id === id)[0]

  useEffect(() => {
    api.patch<IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis>(`/analysis/${analysis.id}/views`, { views: analysis.viewCount }).then(result => {
      setAnalysis(allAnalysis.map(a => {
        if(a.id === analysis.id) {
          return result.data
        } else {
          return a
        }
      }))
    })
  }, [])

  return (
    <div className={styles.analysisWrapper}>
      <LeftBar user={user} />
      <div className={styles.main}>
        <TopBar user={user} />
          <main className={styles.main}>
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
        
      </div>
     
    </div>
  )
}

export { Analysis }