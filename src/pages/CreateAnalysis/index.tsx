import { useForm, SubmitHandler } from 'react-hook-form'
import { useContext } from 'react'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'

import { CreateDefaultAnalysis } from '../../components/Forms/CreateDefaultAnalysis'

import { AuthContext } from '../../contexts/auth'

import styles from './styles.module.scss'
import { useState } from 'react'
import { api } from '../../services/api'

interface IInputs {
  videoUrl: string
}

const CreateAnalysis: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<IInputs>()
  const [typeSelected, setTypeSelected] = useState<string>('default')
  const [videoIsValid, setVideoIsValid] = useState<boolean>(false)

  const { user } = useContext(AuthContext)

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeSelected(event.target.value)
  }

  const verifyVideo: SubmitHandler<IInputs> = async data => {
    const { videoUrl } = data
    const url = new URL(videoUrl)

    const videoId = url.searchParams.get('v')

    if(videoId) {
      try {
        const result = await api.get(`/videos?videoId=${videoId}`)
      
        if(result.data) {
          setVideoIsValid(true)
        }
      } catch(error) {
        alert('Vídeo não encontrado')
      }
     
    } else {
      alert('Vídeo não encontrado')
    }
  } 

  return (
    <div className={styles.createAnalysisWrapper}>
      <LeftBar user={user} />
      <div className={styles.main}>
        <TopBar user={user} />
        <h1>Create Analysis</h1>
        <form onSubmit={handleSubmit(verifyVideo)}>
          <input type='url' {...register('videoUrl')} placeholder='URL do Vídeo' />
          <button type='submit'>Verificar</button>
        </form>
        {videoIsValid &&
        <>
          <select value={typeSelected} onChange={handleChangeType}>
            <option value='default'>Padrão</option>
            <option value='mining'>Mineração</option>
            <option value='complete'>Completa</option>
          </select>
          <CreateDefaultAnalysis />
        </>
        }
      </div>
    </div>
  )
}

export { CreateAnalysis }