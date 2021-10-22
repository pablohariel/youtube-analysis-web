import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import styles from './styles.module.scss'

const SimpleHeader: React.FC = () => {
  return (
    <header className={styles.simpleHeaderWrapper}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link className={styles.logoWrapper} to='/' >
            <MdOutlineKeyboardArrowRight size={'4.5rem'} color={'#1AAE9F'} />
            <p className={styles.logoTitle}>Youmine</p>
          </Link>
        </li>
      </ul>
        {/* <button className='btn-return' type='button' onClick={goBack}>Voltar</button> */}
    </header>
  )
}

export { SimpleHeader }