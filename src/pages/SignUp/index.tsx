import { Link } from 'react-router-dom'

import { SimpleHeader } from '../../components/SimpleHeader'
import { Input } from '../../components/Input'
import { Footer } from '../../components/Footer'

import styles from './styles.module.scss'

const SignUp: React.FC = () => {
  return (
    <div className={styles.signUpWrapper}>
      <SimpleHeader />

      <main className={styles.main}>
        <h1 className={styles.title}>Bem Vindo!</h1>
        <div className={styles.card}>
          <form className={styles.cardForm} onSubmit={(e) => e.preventDefault()}>
            <Input formType='signup' type='email' placeholder='Email' />
            <Input style={{ marginTop: '1.125rem' }} formType='signup' type='text' placeholder='Nome' />
            <Input style={{ marginTop: '1.125rem' }} formType='signup' type='password' placeholder='Senha' />

            <label className={styles.checkboxWrapper} >
                <input className={styles.checkboxInput} id='terms' type="checkbox" />
                Concordo com os termos de serviço
            </label>

            <button className={styles.btnSignUpSubmit} type='submit'>Cadastrar</button>
          </form>

          <div className={styles.divider}>
            <span className={styles.borderLeft}></span>
            <span className={styles.text}>OU</span>
            <span className={styles.borderRight}></span>
          </div>
          

          <button className={styles.btnLoginWithGoogle} type='submit' disabled>Entrar com o Google</button>
        </div>

        <p className={styles.textLogin}>Já possui conta? <Link to="/login" className={styles.linkLogin}>Login</Link></p>

      </main>
    </div>
  )
}

export { SignUp }