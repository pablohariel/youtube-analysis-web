import { useContext, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input, Textarea, Button } from '@chakra-ui/react'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { Divider } from '../../components/Divider'

import { ConfirmationDialog } from '../../components/ConfirmationDialog'
import { ErrorDialog } from '../../components/ErrorDialog'

import { AuthContext } from '../../contexts/auth'

import styles from './styles.module.scss'
import { api } from '../../services/api'

interface IInputs {
  name: string
  email: string
  message: string
}

const Contact: React.FC = () => {
  const [ confirmationDialogIsOpen, setConfirmationDialogIsOpen ] = useState<boolean>(false)
  const [ errorDialogIsOpen, setErrorDialogIsOpen ] = useState<boolean>(false)

  const { register, handleSubmit, resetField, watch,  formState: { errors } } = useForm<IInputs>()

  const { user } = useContext(AuthContext)

  const onConfirmationDialogCloses = () => {
    resetField('email')
    resetField('message')
    resetField('name')
    setConfirmationDialogIsOpen(false)
  }

  const onSubmit: SubmitHandler<IInputs> = async data => {
    try {
      await api.post('/contact', data)
      setConfirmationDialogIsOpen(true)
    } catch(error) {
      setErrorDialogIsOpen(true)
    }
  }

  return (
    <div className={styles.contactWrapper}>
      <LeftBar user={user} />
      <div>
        <TopBar user={user} />
        <main>
        <h1 className={styles.title}>Entrar em contato</h1>
          <div className={styles.card}>
            <h2 className={styles.subtitle}>Informações</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <label>
                Nome
                <Input className={styles.input} type='text' {...register('name')} />
              </label>
              <label>
                E-mail
                <Input className={styles.input} type='email' {...register('email')} />
              </label>
              <label>
                Mensagem  
                <Textarea className={styles.textarea} type='text' {...register('message')} />
              </label>

              <Button className={styles.btnSubmit} type='submit' variant='fill' >Enviar</Button>

              <Divider />

              <p className={styles.text}>Entre em contato através do seguinte e-mail: <u>pablohhdr@gmail.com</u></p>
            </form>

            <ConfirmationDialog isOpen={confirmationDialogIsOpen} onClose={onConfirmationDialogCloses} />
            <ErrorDialog isOpen={errorDialogIsOpen} onClose={() => setErrorDialogIsOpen(false)} />
          </div>
        </main>
      </div>
    </div>
  )
}

export { Contact }