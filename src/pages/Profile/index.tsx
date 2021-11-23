import styles from './styles.module.scss'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { DeleteAccountBtn } from '../../components/DeleteAccountBtn'
import { Card } from './Card'

import { AuthContext } from '../../contexts/auth'
import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { api } from '../../services/api'

const Profile: React.FC = () => {
  const [passwordToDelete, setPasswordToDelete] = useState('')
  const history = useHistory()

  const { user, setUser, signOut } = useContext(AuthContext)

  useEffect(() => {
    if(!user) {
      history.push('/')
    }
  }, [user])

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${user?.id}`, {   
        data: {
          email: user?.email,
          password: passwordToDelete
        }
      })

      signOut()
    } catch(error) {
      alert('Senha incorreta')
    }
  }

  return (
    <div className={styles.profileWrapper}>
      {user && (
        <>
          <LeftBar user={user} />
          <div className={styles.main}>
            <TopBar user={user} />
              <div className={styles.userInfo}>
                <h1 className={styles.title}>Meu Perfil</h1>
                <Card user={user} setUser={setUser} />
                <DeleteAccountBtn handleDelete={handleDelete} passwordToDelete={passwordToDelete} setPasswordToDelete={setPasswordToDelete} />
              </div>
          </div>
        </>
      )}
    </div>
  )
}

export { Profile }