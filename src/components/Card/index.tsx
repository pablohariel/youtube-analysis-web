import { useHistory } from 'react-router-dom'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { IAnalysis } from '../../contexts/analysis'

import styles from './styles.module.scss'

interface IProps {
  analysis: IAnalysis
}

const Card: React.FC<IProps> = ({ analysis }) => {
  const { videoData, id } = analysis

  const history = useHistory()
  
  return (
    <div className={styles.cardWrapper} onClick={() => history.push(`/analysis/${id}`)}>
      <header className={styles.header}>
        <span className={styles.analysisData}>{analysis.created_at}</span>
        <span className={styles.analysisUser}>User</span>
      </header>
      <main className={styles.main}>
        <h1 className={styles.videoTitle}>{videoData.title}</h1>
        <p className={styles.videoDescription}>
          {videoData.description} 💜
        </p>
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