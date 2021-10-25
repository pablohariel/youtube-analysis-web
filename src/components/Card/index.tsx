import { AiFillLike, AiFillDislike } from 'react-icons/ai'

import styles from './styles.module.scss'

const Card: React.FC = () => {
  return (
    <div className={styles.cardWrapper}>
      <header className={styles.header}>
        <span className={styles.analysisData}>20 Junho, 2017</span>
        <span className={styles.analysisUser}>User</span>
      </header>
      <main className={styles.main}>
        <h1 className={styles.videoTitle}>Twiiter Responsivo com ReactJS | UI CLone #6</h1>
        <p className={styles.videoDescription}>
          Faala dev!
          Você já criou interfaces responsivas?
          Bora aprimorar as habilidades?
          Nesse episódio eu, Guilherme Rodz, desenvolvi uma aplicação em React reproduzindo a interface do Twitter!

          Valeu! 💜
        </p>
      </main>
      <footer className={styles.footer}>
        <div>
          <AiFillLike />
          <span>2.6K</span>
        </div>
        <div>  
          <AiFillDislike />
          <span>19</span>
        </div>
        <div>  
          <span>311</span>
        </div>
      </footer>
    </div>
  )
}

export { Card }