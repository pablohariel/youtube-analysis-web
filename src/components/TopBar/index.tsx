import { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { VscBell } from 'react-icons/vsc'
import { Link } from 'react-router-dom'

import userImg from '../../assets/userImg.png'
import { IUser } from '../../contexts/auth'

import styles from './styles.module.scss'

interface IProps {
  user: IUser | null
}

const TopBar: React.FC<IProps> = ({ user }) => {
  const [search, setSearch] = useState('')

  return (  
    <header className={styles.topBarWrapper}>
      <div className={styles.searchBarWrapper}>
        <Link to={`/search?query=${search}`}><RiSearch2Line size={'2rem'} /></Link>
        <input className={styles.searchBarInput} placeholder='Procurar análise' value={search} onChange={event => setSearch((event.target as HTMLInputElement).value)} />
      </div>

      {user ? (
        <div className={styles.rightGroupWrapper}>
          <div className={styles.userInfoWrapper}>
            <img className={styles.userImg} src={userImg} alt="user" />
            <span className={styles.userName}>Ola, {user.name}!</span>
          </div>
          <VscBell size={'1.4rem'} />
        </div>
      ) : (
        <div className={styles.rightGroupWrapper}>
          <Link to='/signup' className={styles.btnSignUp}>Cadastrar</Link>
          <Link to='/login' className={styles.btnSignIn}>Entrar</Link>
        </div>
      )}

    </header>
  )
}

export { TopBar }