import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import styles from './styles.module.scss'

import logo from '../../assets/logo-white.svg'

const SimpleHeader: React.FC = () => {
  return (
    <header className={styles.simpleHeaderWrapper}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link className={styles.logoWrapper} to='/' >
            <img src={logo} />
          </Link>
        </li>
      </ul>
        {/* <button className='btn-return' type='button' onClick={goBack}>Voltar</button> */}
    </header>
  )
}

export { SimpleHeader }