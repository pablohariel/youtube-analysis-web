import { useForm, SubmitHandler } from 'react-hook-form'
import { useContext } from 'react'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'

import { CreateDefaultAnalysis } from '../../components/Forms/CreateDefaultAnalysis'

import { AuthContext } from '../../contexts/auth'

import styles from './styles.module.scss'

const CreateAnalysis: React.FC = () => {
  const {} = useForm()
  const { user } = useContext(AuthContext)

  return (
    <div className={styles.createAnalysisWrapper}>
      <LeftBar user={user} />
      <div className={styles.main}>
        <TopBar user={user} />
        <h1>Create Analysis</h1>
        <CreateDefaultAnalysis />
      </div>
    </div>
  )
}

export { CreateAnalysis }