import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
// import { Switch } from '@mui/material'
import { Switch, Button, Select } from '@chakra-ui/react'

import { DefaultResponse, MiningResponse } from '../../../interfaces/responseData'

import { Checkbox } from '../../../components/Checkbox'

import { api } from '../../../services/api'

import styles from './styles.module.scss'
import { useEffect } from 'react'

export interface IInputs {
  options: {
    commentCount: {
      checked: boolean
      includeCommentReplies: boolean
    }
    commentsPolarity: {
      checked: boolean
      includeCommentReplies: boolean
    }
    topPositiveComments: {
      checked: boolean
      includeCommentReplies: boolean
    }
    topNegativeComments: {
      checked: boolean
      includeCommentReplies: boolean
    }
    mostLikedComment: {
      checked: boolean
      includeCommentReplies: boolean
    }
    mostRepliesComment: {
      checked: boolean
    }
    wordCount: {
      checked: boolean
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
      includeRepeatedWords: boolean
    }
    topWords: {
      checked: boolean
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    }
    topWordsUsedTogether: {
      checked: boolean
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    }
    wordsRelatedToVideoTitle: {
      checked: boolean
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    }
    topComentingUser: {
      checked: boolean
      includeCommentReplies: boolean
    }
    commentsLanguage: {
      checked: boolean
      includeCommentReplies: boolean
    }
    commentsPublicationDate: {
      checked: boolean
      includeCommentReplies: boolean
    }
  }
  privacy: 'public' | 'private'
  save: boolean 
}

interface IProps {
  videoId: string,
  setAnalysis: React.Dispatch<React.SetStateAction<{
    created: boolean;
    content?: DefaultResponse | MiningResponse | undefined;
  }>>
}

const CreateDefaultAnalysis: React.FC<IProps> = ({ videoId, setAnalysis }) => {
  const { handleSubmit, watch, control } = useForm<IInputs>({
    defaultValues: {
      options: {
        commentCount: {
          checked: false,
          includeCommentReplies: false
        },
        commentsPolarity: {
          checked: false,
          includeCommentReplies: false
        }, 
        topPositiveComments: {
          checked: false,
          includeCommentReplies: false
        },
        topNegativeComments: {
          checked: false,
          includeCommentReplies: false
        },
        topComentingUser: {
          checked: false,
          includeCommentReplies: false
        },
        mostLikedComment: {
          checked: false,
          includeCommentReplies: false
        },
        mostRepliesComment: {
          checked: false
        },
        wordCount: {
          checked: false,
          includeCommentReplies: false,
          avoidAccentuation: false,
          caseSensitive: false,
          includeRepeatedWords: false
        },
        topWords: {
          checked: false,
          includeCommentReplies: false,
          avoidAccentuation: false,
          caseSensitive: false,
        },
        topWordsUsedTogether: {
          checked: false,
          includeCommentReplies: false,
          avoidAccentuation: false,
          caseSensitive: false,
        },
        wordsRelatedToVideoTitle: {
          checked: false,
          includeCommentReplies: false,
          avoidAccentuation: false,
          caseSensitive: false,
        },
        commentsLanguage: {
          checked: false,
          includeCommentReplies: false
        },
        commentsPublicationDate: {
          checked: false,
          includeCommentReplies: false
        }
      },
      privacy: 'public',
      save: false
    }

  })
  const [creating, setCreating] = useState<boolean>(false)
  


  const onSubmit: SubmitHandler<IInputs> = async data => {
    try {
      setCreating(true)
      const result = await api.post<DefaultResponse>('/analysis', { 
        videoId,
        type: 'default',
        ...data 
      })
      setAnalysis({ created: true, content: result.data })
    } catch(error) {
      setCreating(false)
      alert('Não foi possível criar a análise')
    }
    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.defaultFormWrapper}>
      

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.commentCount.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Contagem de comentários' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
          
        {watch('options.commentCount.checked') && 
          <div className={styles.filters}>
            <div>
              <Controller 
                control={control}
                name='options.commentCount.includeCommentReplies'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
          </div>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.commentsPolarity.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Polaridade dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.commentsPolarity.checked') && 
          <div className={styles.filters}>
            <div>
              <Controller 
                control={control}
                name='options.commentsPolarity.includeCommentReplies'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
          </div>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.topPositiveComments.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Principais comentários positivos' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.topPositiveComments.checked') && 
          <div className={styles.filters}>
            <div>
              <Controller 
                control={control}
                name='options.topPositiveComments.includeCommentReplies'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
          </div>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.topNegativeComments.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Principais comentários negativos' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.topNegativeComments.checked') && 
          <div className={styles.filters}>
            <div>
              <Controller 
                control={control}
                name='options.topNegativeComments.includeCommentReplies'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
          </div>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.mostLikedComment.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Comentários com mais curtidas' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.mostLikedComment.checked') && 
          <div className={styles.filters}>
            <div>
              <Controller 
                control={control}
                name='options.mostLikedComment.includeCommentReplies'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
          </div>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.mostRepliesComment.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Comentário com mais respostas' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
      </div>
      
      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.wordCount.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Contagem de palavras' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.wordCount.checked') && 
          <div className={styles.filters}>
            <div>
              <Controller 
                control={control}
                name='options.wordCount.includeCommentReplies'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
            <div>
              <Controller 
                control={control}
                name='options.wordCount.avoidAccentuation'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Ignorar acentuação' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
            <div>
              <Controller 
                control={control}
                name='options.wordCount.caseSensitive'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Diferenciar letras maiusculas de minusculas' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
            <div>
              <Controller 
                control={control}
                name='options.wordCount.includeRepeatedWords'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Contar palavras repetidas' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
          </div>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.topWords.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Principais palavras' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.topWords.checked') && 
          <div className={styles.filters}>
            <div>
              <Controller 
                control={control}
                name='options.topWords.includeCommentReplies'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
            <div>
              <Controller 
                control={control}
                name='options.topWords.avoidAccentuation'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Ignorar acentuação' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
            <div>
              <Controller 
                control={control}
                name='options.topWords.caseSensitive'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Diferenciar letras maiusculas de minusculas' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
          </div>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.topWordsUsedTogether.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Principais palavras usadas em conjunto' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.topWordsUsedTogether.checked') && 
          <div className={styles.filters}>
            <div>
              <Controller 
                control={control}
                name='options.topWordsUsedTogether.includeCommentReplies'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
            <div>
              <Controller 
                control={control}
                name='options.topWordsUsedTogether.avoidAccentuation'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Ignorar acentuação' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
            <div>
              <Controller 
                control={control}
                name='options.topWordsUsedTogether.caseSensitive'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Diferenciar letras maiusculas de minusculas' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
          </div>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.wordsRelatedToVideoTitle.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Palavras relacionadas ao título do vídeo' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.wordsRelatedToVideoTitle.checked') && 
          <div className={styles.filters}>
            <div>
              <Controller 
                control={control}
                name='options.wordsRelatedToVideoTitle.includeCommentReplies'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
            <div>
              <Controller 
                control={control}
                name='options.wordsRelatedToVideoTitle.avoidAccentuation'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Ignorar acentuação' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
            <div>
              <Controller 
                control={control}
                name='options.wordsRelatedToVideoTitle.caseSensitive'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Diferenciar letras maiusculas de minusculas' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
          </div>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.topComentingUser.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Usuário com mais comentários' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.topComentingUser.checked') && 
          <div className={styles.filters}>
            <div>
              <Controller 
                control={control}
                name='options.topComentingUser.includeCommentReplies'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
          </div>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.commentsLanguage.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Idioma dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.commentsLanguage.checked') && 
          <div className={styles.filters}>
            <div>
              <Controller 
                control={control}
                name='options.commentsLanguage.includeCommentReplies'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
          </div>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.commentsPublicationDate.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Data de publicação dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.commentsPublicationDate.checked') && 
          <div className={styles.filters}>
            <div>
              <Controller 
                control={control}
                name='options.commentsPublicationDate.includeCommentReplies'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                )}
              />
            </div>
          </div>
        }
      </div>

      {watch('save') && (
        <div className={styles.privacy}>
          <label className={styles.subtitle}>
            Privacidade
          </label>
          <div className={styles.select}>
            <Controller 
              control={control}
              name='privacy'
              render={({ field: { onChange, onBlur, value } }) => (
                <Select 
                  id='selectType'
                  value={value}
                  onChange={onChange}
                >
                  <option value='public'>Pública</option>
                  <option value='private'>Privada</option>
                </Select>
              )}
            />
          </div>
          
        </div>
      )}

      <div className={styles.save}>
        <label>
          Salvar
        </label>
        
        <Controller 
          control={control}
          name='save'
          render={({ field: { onChange, onBlur, value } }) => (
            <Switch onChange={onChange} checked={value} />
          )}
        />
      </div>  
      
      <Button className={styles.submitBtn} _hover={{ backgroundColor: '#8981D8 '}} isLoading={creating} type='submit'>Enviar</Button>
      <Button className={styles.resetBtn} _hover={{ backgroundColor: '#D4C2FF '}} type='reset'>Resetar</Button>
    </form>
  )
}

export { CreateDefaultAnalysis }