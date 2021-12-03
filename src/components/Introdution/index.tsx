import styles from './styles.module.scss'

import IntroImg from '../../assets/introImg.svg'

const Introdution: React.FC = () => {
  return (
    <div className={styles.introdutionWrapper}>
      <div className={styles.introTextWrapper}>
        <h1 className={styles.title}>Análises de Comentários do YouTube</h1>
        <h2 className={styles.subtitle}>Procure e crie análises relacionadas a comentários de vídeos no YouTube</h2>
      </div>
      <img src={IntroImg} alt="" />
    </div>
  )
}

export { Introdution }