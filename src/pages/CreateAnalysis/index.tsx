import { useForm, SubmitHandler } from 'react-hook-form'
import { useContext, useState } from 'react'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { CreateDefaultAnalysis } from '../../components/Forms/CreateDefaultAnalysis'
import { CreateMiningAnalysis } from '../../components/Forms/CreateMiningAnalysis'

import { AuthContext } from '../../contexts/auth'
import { api } from '../../services/api'

import styles from './styles.module.scss'

interface IInputs {
  videoUrl: string
}

const CreateAnalysis: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<IInputs>()
  const [typeSelected, setTypeSelected] = useState<string>('default')
  const [video, setVideo] = useState<{ isValid: boolean, id: string }>({
    isValid: false,
    id: ''
  })

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
          setVideo({ isValid: true, id: videoId })
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
 
        {video.isValid &&
          <>
            <select value={typeSelected} onChange={handleChangeType}>
              <option value='default'>Padrão</option>
              <option value='mining'>Mineração</option>
              <option value='complete'>Completa</option>
            </select>
            {typeSelected === 'default' && <CreateDefaultAnalysis videoId={video.id} />}
            {typeSelected === 'mining' && <CreateMiningAnalysis videoId={video.id} />}
          </>
        }
      </div>
    </div>
  )
}

export { CreateAnalysis }