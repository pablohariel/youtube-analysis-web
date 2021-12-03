import { useForm, SubmitHandler } from 'react-hook-form'
import { useContext, useState, useEffect } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import { Button,  Image, Input, Select } from '@chakra-ui/react'
import { RepeatIcon, CheckIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'
import { CreateDefaultAnalysis } from '../../components/Forms/CreateDefaultAnalysis'
import { CreateMiningAnalysis } from '../../components/Forms/CreateMiningAnalysis'
import { CreateCompleteAnalysis } from '../../components/Forms/CreateCompleteAnalysis'

import { AuthContext } from '../../contexts/auth'
import { api } from '../../services/api'

import { DefaultResponse, MiningResponse } from '../../interfaces/responseData'

import styles from './styles.module.scss'
import { Analysis } from '../../components/Analysis'
import { VideoData } from '../../interfaces/videoData'

interface IInputs {
  videoUrl: string
}

const CreateAnalysis: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<IInputs>()
  const [typeSelected, setTypeSelected] = useState<string>('default')
  const [video, setVideo] = useState<{ isLoading: boolean, isValid: boolean, id: string, content?: VideoData }>({
    isLoading: false,
    isValid: false,
    id: ''
  })
  const [analysis, setAnalysis] = useState<{ created: boolean, content?: DefaultResponse | MiningResponse }>({
    created: false
  })

  const toast = useToast()

  const { user } = useContext(AuthContext)

  const handleChangeType = (event: React.FormEvent<HTMLSelectElement>) => {
    setTypeSelected(event.currentTarget.value)
  }

  const verifyVideo: SubmitHandler<IInputs> = async data => {

    const { videoUrl } = data
    const url = new URL(videoUrl)

    const videoId = url.searchParams.get('v')

    if(videoId) {
      try {
        setVideo({ isLoading: true, isValid: false, id: '' })

        const result = await api.get<VideoData>(`/videos?videoId=${videoId}`)
      
        if(result.data) {
          setVideo({ isLoading: false, isValid: true, id: videoId, content: result.data })
        }
      } catch(error) {
        setVideo({ isLoading: false, isValid: false, id: '' })
        toast({
          title: 'Vídeo inválido',
          description: `Vídeo inexistente ou não possui comentários.`,
          status: 'error',
          isClosable: true,
        })
      }
     
    } else {  
      toast({
        title: 'Vídeo inválido',
        description: `Vídeo inexistente ou não possui comentários.`,
        status: 'error',
        isClosable: true,
      })
    }
  } 

  return (
    <div className={styles.createAnalysisWrapper}>
      <LeftBar user={user} />
      <div className={styles.main}>
        <TopBar user={user} />

        <div className={styles.content}>

        { analysis.created && analysis.content ?
          <div className={styles.analysisWrapper}>
            <h1 className={styles.createdTitle}>Análise gerada com sucesso. Resultados:</h1>
            <Analysis analysis={analysis.content} />
          </div>
           
          :
          <>
            <h1 className={styles.title}>Criar Análise</h1>

            <div className={styles.card}>
              <form onSubmit={handleSubmit(verifyVideo)} className={styles.videoUrlForm}>
                <label className={styles.label} htmlFor='videoUrl'>
                  <span className={styles.name}>Vídeo</span><span className={styles.info}>URL</span>
                </label>
                <div className={styles.btnWrapper}>
                  <Input id='videoUrl' color={'#34495E'} focusBorderColor={video.isValid ? '#1AAE9F' : '#8981D8'} type='url' {...register('videoUrl')} placeholder='youtube.com/watch?v=id' />
                  <Button size='lg' style={{ height: '3.313rem', backgroundColor: video.isValid ? '#1AAE9F' : '#8981D8' }} type='submit' isLoading={video.isLoading}>{video.isValid ? <CheckIcon /> : <RepeatIcon />}</Button>
                </div>
              </form>

              {video.isValid &&
                <>
                  {video.content && (
                    <div className={styles.videoInfoWrapper}>
                      <h3 className={styles.videoTitle}>{video.content.title}</h3>
                      <Image className={styles.videoImg} src={video.content.thumbnail} />
                    </div>
                  )}

                  <h2 className={styles.subtitle}>Dados para criação</h2>

                  <div className={styles.selectTypeWrapper}>
                    <label className={styles.label} htmlFor='selectType'>
                      <span className={styles.name}>Tipo de análise</span><span className={styles.info}>Apenas uma opção selecionável</span>
                    </label>
                    <div className={styles.select}>
                      <Select 
                        id='selectType'
                        value={typeSelected}
                        onChange={handleChangeType}
                      >
                        <option value='default'>Padrão</option>
                        <option value='mining'>Mineração</option>
                        <option value='complete'>Completa</option>
                      </Select>
                    </div>
                    
                  </div>
                  
                  <div className={styles.analysisForm}>
                    <label className={styles.label}>
                      <span className={styles.name}>Opções</span><span className={styles.info}>Diversas opções selecionáveis</span>
                    </label>
                    {typeSelected === 'default' && <CreateDefaultAnalysis videoId={video.id} setAnalysis={setAnalysis} setVideo={setVideo} />}
                    {typeSelected === 'mining' && <CreateMiningAnalysis videoId={video.id} setAnalysis={setAnalysis} setVideo={setVideo} />}
                    {typeSelected === 'complete' && <CreateCompleteAnalysis videoId={video.id} setAnalysis={setAnalysis} setVideo={setVideo} />}
                  </div>
                  
                </>
              }
            </div>
          </>
        }
        </div>
      </div>
    </div>
  )
}

export { CreateAnalysis }