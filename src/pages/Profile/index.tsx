import styles from './styles.module.scss'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { Card } from './Card'

import { AuthContext } from '../../contexts/auth'
import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Profile: React.FC = () => {
  const history = useHistory()

  const [open, setOpen] = useState<boolean>(false)

  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    if(!user) {
      history.push('/')
    }
  }, [user])

  return (
    <div className={styles.profileWrapper}>
      {user && (
        <>
          <LeftBar open={open} setOpen={setOpen} user={user} />
          <div className={styles.main}>
            <TopBar user={user} />
              <div className={styles.userInfo}>
                <h1 className={styles.title}>Meu Perfil</h1>
                <Card user={user} setUser={setUser} />
                <button className={styles.btnDeleteAccount}>Deletar Conta</button>
              </div>
          </div>
        </>
      )}
    </div>
  )
}

export { Profile }