import { useParams } from 'react-router-dom'
import { useContext } from 'react'

import { AnalysisContext } from '../../contexts/analysis'
import { AuthContext } from '../../contexts/auth'

import { Analysis as AnalysisCard } from '../../components/Analysis'
import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'

import styles from './styles.module.scss'
import { CompleteResponse, DefaultResponse, MiningResponse } from '../../interfaces/responseData'

const Analysis: React.FC = () => {
  const { id } = useParams() as { id: string }

  const { analysis: allAnalysis } = useContext(AnalysisContext)
  const { user } = useContext(AuthContext)

  const analysis = allAnalysis.filter(a => a.id === id)[0]

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