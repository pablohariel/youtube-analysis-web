import styles from './styles.module.scss'

const Introdution: React.FC = () => {
  return (
    <div className={styles.introdutionWrapper}>
      <h1 className={styles.title}>Análises de Comentários</h1>
      <h2 className={styles.subtitle}>Procure e crie análises relacionadas a comentários de vídeos no YouTube</h2>
    </div>
  )
}

export { Introdution }