import { Link, useHistory } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth'

import { SimpleHeader } from '../../components/SimpleHeader'

import styles from './styles.module.scss'
import { api } from '../../services/api'

interface IInputs {
  email: string
  name: string
  password: string
  termsOfService: boolean
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IInputs>()

  const history = useHistory()

  const { user, signIn } = useContext(AuthContext)

  useEffect(() => {
    if(user) {
      history.push('/')
    }
  }, [user])

  const onSubmit: SubmitHandler<IInputs> = async data => {
    try {
      if(!data.termsOfService) {
        alert('Não é possível criar uma conta sem concordar com os termos')
        return
      }

      const result = await api.post('/users', data)

      const { email, password } = data
      await signIn(email, password)
    } catch(error) {
      alert('Não foi possível cadastrar o usuário, altere os dados e tente novamente')
    }
  }

  return (
    <div className={styles.signUpWrapper}>
      <SimpleHeader />

      <div className={styles.main}>
        <h1 className={styles.title}>Bem Vindo!</h1>
        <div className={styles.card}>
          <form className={styles.cardForm} onSubmit={handleSubmit(onSubmit)}>
            <input className={styles.input} type='email' placeholder='Email' {...register('email')} />
            <input className={styles.input} style={{ marginTop: '1.125rem' }} type='text' placeholder='Nome' {...register('name')}  />
            <input className={styles.input} style={{ marginTop: '1.125rem' }} type='password' placeholder='Senha' {...register('password')} />

            <label className={styles.checkboxWrapper} >
                <input className={styles.checkboxInput} id='terms' type="checkbox" {...register('termsOfService')} />
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

      </div>
    </div>
  )
}

export { SignUp }