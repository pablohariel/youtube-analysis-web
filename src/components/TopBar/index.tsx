import { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { VscBell } from 'react-icons/vsc'

import userImg from '../../assets/userImg.png'

import styles from './styles.module.scss'

const TopBar: React.FC = () => {
  const [user, setUser] = useState({})

  return (  
    <header className={styles.topBarWrapper}>
      <div className={styles.searchBarWrapper}>
        <RiSearch2Line size={'2rem'} />
        <input className={styles.searchBarInput} placeholder='Procurar análise' />
      </div>

      {user ? (
        <div className={styles.rightGroupWrapper}>
          <div className={styles.userInfoWrapper}>
            <img className={styles.userImg} src={userImg} alt="user" />
            <span className={styles.userName}>Ola, Pablo!</span>
          </div>
          <VscBell size={'1.4rem'} />
        </div>
      ) : (
        <div className={styles.rightGroupWrapper}>
          <button className={styles.btnSignUp}>Cadastrar</button>
          <button className={styles.btnSignIn}>Entrar</button>
        </div>
      )}

    </header>
  )
}

export { TopBar }