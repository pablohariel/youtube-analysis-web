import { Link } from 'react-router-dom'

import { SimpleHeader } from '../../components/SimpleHeader'
import { Input } from '../../components/Input'
import { Footer } from '../../components/Footer'

import styles from './styles.module.scss'

const Login: React.FC = () => {
  return (
    <div className={styles.loginWrapper}>
      <SimpleHeader />

      <main className={styles.main}>
        <h1 className={styles.title}>Bem Vindo!</h1>
        <div className={styles.card}>
          <form className={styles.cardForm} onSubmit={(e) => e.preventDefault()}>
            <Input formType='login' type='email' placeholder='Email' />
            <Input style={{ marginTop: '1.125rem' }} formType='login' type='password' placeholder='Senha' />

            <a className={styles.linkForgotPassword} href="/">Esqueceu senha?</a>
            <button className={styles.btnLoginSubmit} type='submit'>Entrar</button>
          </form>
        </div>

        <p className={styles.textSignUp}>Não possui conta? <Link to="/signup" className={styles.linkSignUp}>Cadastrar</Link></p>

      </main>

      <Footer />
    </div>
  )
}

export { Login }