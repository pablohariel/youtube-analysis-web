import { LanguagesCount } from '../../../../../interfaces/languages'
import styles from './styles.module.scss'

interface IProps {
  languages: LanguagesCount | undefined 
}

const CommentsLanguage: React.FC<IProps> = ({ languages }) => {
  if(languages === undefined) {
    return (
      <div className={styles.commentsLanguageWrapper}>
        <h3>Idioma dos comentários</h3>
        <p>Idioma dos comentários não encontrado.</p>
      </div>
    )
  }


  const { pt, en, es, fr, ru, notFound } = languages

  return (
    <div className={styles.commentsLanguageWrapper}>
      <h3>Idioma dos comentários</h3>
      <h6>Número de comentários por idioma</h6>
      <div>
        <ul>
          <li>pt: {pt.count}</li>
          <li>en: {en.count}</li>
          <li>es: {es.count}</li>
          <li>fr: {fr.count}</li>
          <li>ru: {ru.count}</li>
          <li>not found: {notFound.count}</li>
        </ul>
      </div>
    </div>
  )
}

export { CommentsLanguage }