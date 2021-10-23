import styles from './styles.module.scss'

interface IProps extends React.HTMLProps<HTMLInputElement> {
  formType: 'login' | 'signup'
}


const Input: React.FC<IProps> = ({ formType, ...rest }) => {
  return (
    <>
      { formType === 'login' && <input className={styles.login} {...rest} />}
      { formType === 'signup' && <input className={styles.signup} {...rest} />}
    </>
  )
}

export { Input }