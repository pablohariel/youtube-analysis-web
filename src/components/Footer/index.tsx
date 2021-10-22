import { FaGithub } from 'react-icons/fa'
import styles from './styles.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerWrapper}>
      <a className={styles.githubIcon} href='https://github.com/pablohariel' target='_blank' rel='noreferrer'>
        <FaGithub size={'2.375rem'} color={'#fff'}  />
      </a>
      <p className={styles.githubName}>@pablohariel</p>
    </footer>
  )
}

export { Footer }