import { Link, useHistory } from 'react-router-dom'

import { api } from '../../services/api'

import { SimpleHeader } from '../../components/SimpleHeader'

import styles from './styles.module.scss'
import { FormEvent, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { useEffect } from 'react'

interface IAuthResponse {
  token: string,
  user: {
    id: string,
    email: string,
    name: string,
    isAdmin: boolean,
    updated_at: string
  }
}

const Login: React.FC = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, signIn } = useContext(AuthContext)

  useEffect(() => {
    if(user) {
      history.push('/')
    }
  }, [user])


  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    await signIn(email, password)
  }

  return (
    <div className={styles.loginWrapper}>
      <SimpleHeader />

      <main className={styles.main}>
        <h1 className={styles.title}>Bem Vindo!</h1>
        <div className={styles.card}>
          <form className={styles.cardForm} onSubmit={handleLogin}>
            <input 
              className={styles.input}
              type='email' 
              placeholder='Email' 
              value={email} 
              onChange={event => setEmail((event.target as HTMLInputElement).value)} 
            />
            <input 
              className={styles.input}
              style={{ marginTop: '1.125rem' }} 
              type='password' 
              placeholder='Senha' 
              value={password} 
              onChange={event => setPassword((event.target as HTMLInputElement).value)} 
            />

            <button className={styles.btnLoginSubmit} type='submit'>Entrar</button>
          </form>

          <a className={styles.linkForgotPassword} href="/">Esqueceu senha?</a>

          <div className={styles.divider}>
            <span className={styles.borderLeft}></span>
            <span className={styles.text}>OU</span>
            <span className={styles.borderRight}></span>
          </div>
          

          <button className={styles.btnLoginWithGoogle} type='submit' disabled>Entrar com o Google</button>
        </div>

        <p className={styles.textSignUp}>Não possui conta? <Link to="/signup" className={styles.linkSignUp}>Cadastrar</Link></p>

      </main>
    </div>
  )
}

export { Login }