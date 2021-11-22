import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
// import { Switch } from '@mui/material'
import { Switch, Button, Select, Input, IconButton, UnorderedList, ListItem } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { CompleteResponse, DefaultResponse, MiningResponse } from '../../../interfaces/responseData'

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
    },
    wordsToFindWords: {
      checked: boolean
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    } 
    phrasesToFindPhrases: {
      checked: boolean
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    }
    wordsToFindComments: {
      checked: boolean
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    }
    phrasesToFindComments: {
      checked: boolean
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    }
    usersToFindComments: {
      checked: boolean
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    }
  }
  privacy: 'public' | 'private'
  save: boolean 
}

interface IProps {
  videoId: string,
  setAnalysis: React.Dispatch<React.SetStateAction<{
    created: boolean;
    content?: DefaultResponse | MiningResponse | CompleteResponse;
  }>>
}

const CreateCompleteAnalysis: React.FC<IProps> = ({ videoId, setAnalysis }) => {
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
        },
        wordsToFindWords: {
          checked: false,
          includeCommentReplies: false,
          avoidAccentuation: false,
          caseSensitive: false
        },
        phrasesToFindPhrases: {
          checked: false,
          includeCommentReplies: false,
          avoidAccentuation: false,
          caseSensitive: false
        },
        wordsToFindComments: {
          checked: false,
          includeCommentReplies: false,
          avoidAccentuation: false,
          caseSensitive: false
        },
        phrasesToFindComments: {
          checked: false,
          includeCommentReplies: false,
          avoidAccentuation: false,
          caseSensitive: false
        },
        usersToFindComments: {
          checked: false,
          includeCommentReplies: false,
          avoidAccentuation: false,
          caseSensitive: false
        }
      },
      privacy: 'public',
      save: false
    }

  })
  const [creating, setCreating] = useState<boolean>(false)
  
  const [wordToFindWords, setWordToFindWords] = useState<string>('')
  const [wordsToFindWords, setWordsToFindWords] = useState<string[]>([])

  const [phraseToFindPhrases, setPhraseToFindPhrases] = useState<string>('')
  const [phrasesToFindPhrases, setPhrasesToFindPhrases] = useState<string[]>([])

  const [wordToFindComments, setWordToFindComments] = useState<string>('')
  const [wordsToFindComments, setWordsToFindComments] = useState<string[]>([])

  const [phraseToFindComments, setPhraseToFindComments] = useState<string>('')
  const [phrasesToFindComments, setPhrasesToFindComments] = useState<string[]>([])

  const [userToFindComments, setUserToFindComments] = useState<string>('')
  const [usersToFindComments, setUsersToFindComments] = useState<string[]>([])


  const onSubmit: SubmitHandler<IInputs> = async data => {
    const { options, privacy, save } = data

    const finalData = { 
      videoId,
      type: 'complete',
      options: {
        ...data.options,
        wordsToFindWords: {
          checked: options.wordsToFindWords.checked,
          filters: { ...options.wordsToFindWords },
          content: wordsToFindWords
        },
        phrasesToFindPhrases: {
          checked: options.phrasesToFindPhrases.checked,
          filters: { ...options.phrasesToFindPhrases },
          content: phrasesToFindPhrases
        },
        wordsToFindComments: {
          checked: options.wordsToFindComments.checked,
          filters: { ...options.wordsToFindComments },
          content: wordsToFindComments
        },
        phrasesToFindComments: {
          checked: options.phrasesToFindComments.checked,
          filters: { ...options.phrasesToFindComments },
          content: phrasesToFindComments
        },
        usersToFindComments: {
          checked: options.usersToFindComments.checked,
          filters: { ...options.usersToFindComments },
          content: usersToFindComments
        }
      },
      privacy,
      save 
    }

    console.log(finalData)

    // setCreating(true)
    // const result = await api.post<CompleteResponse>('/analysis', finalData)
    // setAnalysis({ created: true, content: result.data })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.completeFormWrapper}>
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

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.wordsToFindWords.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Minerar palavras' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.wordsToFindWords.checked') && 
          <>
            <div className={styles.filters}>
              <div>
                <Controller 
                  control={control}
                  name='options.wordsToFindWords.includeCommentReplies'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>

              <div>
                <Controller 
                  control={control}
                  name='options.wordsToFindWords.avoidAccentuation'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Ignorar acentuação' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>

              <div>
                <Controller 
                  control={control}
                  name='options.wordsToFindWords.caseSensitive'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Diferenciar letras maiusculas de minusculas' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.wordInputWrapper}>
                <label className={styles.label} htmlFor='wordToFindWords'>
                  <span className={styles.name}>Palavras</span><span className={styles.info}>Máximo de 10</span>
                </label>
                <div className={styles.input}>
                  <Input id='wordToFindWords' placeholder='Digite uma palavra...' color='#34495E' focusBorderColor='#8981D8' type='text' value={wordToFindWords} onChange={event => setWordToFindWords(event.target.value)} /> 
                  <IconButton icon={<AddIcon />} aria-label='Add Word' _hover={{ backgroundColor: '#8981D8 '}} color='#fff' backgroundColor='#8981D8' type='button' onClick={() => setWordsToFindWords([...wordsToFindWords, wordToFindWords])} />
                </div>
              </div>
              
              <UnorderedList className={styles.wordList}>
                {wordsToFindWords.map((word, index) => 
                  <ListItem key={index}>{word}
                    <button type='button' onClick={() => setWordsToFindWords(wordsToFindWords.filter((item, i) => i !== index))}>
                      X
                    </button>
                  </ListItem>
                )}
              </UnorderedList>
            </div>
          </>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.phrasesToFindPhrases.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Minerar frases' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.phrasesToFindPhrases.checked') && 
          <>
            <div className={styles.filters}>
              <div>
                <Controller 
                  control={control}
                  name='options.phrasesToFindPhrases.includeCommentReplies'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
              <div>
                <Controller 
                  control={control}
                  name='options.phrasesToFindPhrases.avoidAccentuation'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Ignorar acentuação' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
              <div>
                <Controller 
                  control={control}
                  name='options.phrasesToFindPhrases.caseSensitive'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Diferenciar letras maiusculas de minusculas' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.wordInputWrapper}>
                <label className={styles.label} htmlFor='phraseToFindPhrases'>
                  <span className={styles.name}>Frases</span><span className={styles.info}>Máximo de 5</span>
                </label>
                <div className={styles.input}>
                  <Input id='phraseToFindPhrases' placeholder='Digite uma frase...' type='text' value={phraseToFindPhrases} onChange={event => setPhraseToFindPhrases(event.target.value)} /> 
                  <IconButton icon={<AddIcon />} aria-label='Add Word' _hover={{ backgroundColor: '#8981D8 '}} color='#fff' backgroundColor='#8981D8' type='button' onClick={() => setPhrasesToFindPhrases([...phrasesToFindPhrases, phraseToFindPhrases])} />
                </div>
              </div>
              <UnorderedList className={styles.wordList}>
                {phrasesToFindPhrases.map((phrase, index) => 
                  <ListItem key={index}>
                    {phrase}
                    <button type='button' onClick={() => setPhrasesToFindPhrases(phrasesToFindPhrases.filter((item, i) => i !== index))}>
                      X
                    </button>
                  </ListItem>)}
              </UnorderedList>
            </div>
          </>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.wordsToFindComments.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Minerar comentários contendo palavras específicas' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.wordsToFindComments.checked') && 
          <>
            <div className={styles.filters}>
              <div>
                <Controller 
                  control={control}
                  name='options.wordsToFindComments.includeCommentReplies'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
              <div>
                <Controller 
                  control={control}
                  name='options.wordsToFindComments.avoidAccentuation'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Ignorar acentuação' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
              <div>
                <Controller 
                  control={control}
                  name='options.wordsToFindComments.caseSensitive'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Diferenciar letras maiusculas de minusculas' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.wordInputWrapper}>
                <label className={styles.label} htmlFor='wordToFindComments'>
                  <span className={styles.name}>Palavras</span><span className={styles.info}>Máximo de 5</span>
                </label>
                <div className={styles.input}>
                  <Input id='wordToFindComments' placeholder='Digite uma palavra...' type='text' value={wordToFindComments} onChange={event => setWordToFindComments(event.target.value)} /> 
                  <IconButton icon={<AddIcon />} aria-label='Add Word' _hover={{ backgroundColor: '#8981D8 '}} color='#fff' backgroundColor='#8981D8'  type='button' onClick={() => setWordsToFindComments([...wordsToFindComments, wordToFindComments])} />
                </div>
              </div> 
              <UnorderedList className={styles.wordList}>
                {wordsToFindComments.map((word, index) => 
                  <ListItem key={index}>
                    {word}
                    <button type='button' onClick={() => setWordsToFindComments(wordsToFindComments.filter((item, i) => i !== index))}>
                      X
                    </button>
                  </ListItem>)}
              </UnorderedList>
            </div>
          </>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.phrasesToFindComments.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Minerar comentários contendo frases específicas' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.phrasesToFindComments.checked') && 
          <>
            <div className={styles.filters}>
              <div>
                <Controller 
                  control={control}
                  name='options.phrasesToFindComments.includeCommentReplies'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
              <div>
                <Controller 
                  control={control}
                  name='options.phrasesToFindComments.avoidAccentuation'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Ignorar acentuação' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
              <div>
                <Controller 
                  control={control}
                  name='options.phrasesToFindComments.caseSensitive'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Diferenciar letras maiusculas de minusculas' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.wordInputWrapper}>
                <label className={styles.label} htmlFor='phraseToFindComments'>
                  <span className={styles.name}>Frases</span><span className={styles.info}>Máximo de 5</span>
                </label>
                <div className={styles.input}>
                  <Input id='phraseToFindComments' placeholder='Digite uma frase...'  type='text' value={phraseToFindComments} onChange={event => setPhraseToFindComments(event.target.value)} /> 
                  <IconButton icon={<AddIcon />} aria-label='Add Word' _hover={{ backgroundColor: '#8981D8 '}} color='#fff' backgroundColor='#8981D8' type='button' onClick={() => setPhrasesToFindComments([...phrasesToFindComments, phraseToFindComments])} />
                </div>
              </div>
              <UnorderedList className={styles.wordList}>
                {phrasesToFindComments.map((phrase, index) => 
                  <ListItem key={index}>
                    {phrase}
                    <button type='button' onClick={() => setPhrasesToFindComments(phrasesToFindComments.filter((item, i) => i !== index))}>
                      X
                    </button>
                  </ListItem>
                )}
              </UnorderedList>
            </div>
          </>
        }
      </div>

      <div className={styles.option}>
        <Controller 
          control={control}
          name='options.usersToFindComments.checked'
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox text='Minerar comentários de usuários específicos' onChange={onChange} onBlur={onBlur} checked={value} />
          )}
        />
        {watch('options.usersToFindComments.checked') && 
          <>
            <div className={styles.filters}>
              <div>
                <Controller 
                  control={control}
                  name='options.usersToFindComments.includeCommentReplies'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Incluir respostas dos comentários' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
              <div>
                <Controller 
                  control={control}
                  name='options.usersToFindComments.avoidAccentuation'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Ignorar acentuação' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
              <div>
                <Controller 
                  control={control}
                  name='options.usersToFindComments.caseSensitive'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox text='Diferenciar letras maiusculas de minusculas' onChange={onChange} onBlur={onBlur} checked={value} />
                  )}
                />
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.wordInputWrapper}>
                <label className={styles.label} htmlFor='userToFindComments'>
                  <span className={styles.name}>Usuários</span><span className={styles.info}>Máximo de 5</span>
                </label>
                <div className={styles.input}>
                  <Input id='userToFindComments' placeholder='Digite um nome de usuário...' type='text' value={userToFindComments} onChange={event => setUserToFindComments(event.target.value)} /> 
                  <IconButton icon={<AddIcon />} aria-label='Add User' _hover={{ backgroundColor: '#8981D8 '}} color='#fff' backgroundColor='#8981D8' type='button' onClick={() => setUsersToFindComments([...usersToFindComments, userToFindComments])} />
                </div>
              </div>
              <UnorderedList className={styles.wordList}>
                {usersToFindComments.map((user, index) => 
                  <ListItem key={index}>
                    {user}
                    <button type='button' onClick={() => setUsersToFindComments(usersToFindComments.filter((item, i) => i !== index))}>
                      X
                    </button>
                  </ListItem>)}
              </UnorderedList>
            </div>

          </>
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
              render={({ field: { onChange, onBlur, value, ref } }) => (
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
          render={({ field: { onChange, value } }) => (
            <Switch onChange={onChange} checked={value} />
          )}
        />
      </div> 
      
      <Button className={styles.submitBtn} _hover={{ backgroundColor: '#8981D8 '}} isLoading={creating} type='submit'>Enviar</Button>
      <Button className={styles.resetBtn} _hover={{ backgroundColor: '#D4C2FF '}} type='reset'>Resetar</Button>
    </form>
  )
}

export { CreateCompleteAnalysis }