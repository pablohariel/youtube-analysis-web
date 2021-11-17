import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Switch, Button, Select, Input, IconButton, UnorderedList, ListItem } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

import { api } from '../../../services/api'

import { DefaultResponse, MiningResponse } from '../../../interfaces/responseData'

import { Checkbox } from '../../Checkbox'

import styles from './styles.module.scss'

interface IInputs {
  options: {
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
    content?: DefaultResponse | MiningResponse | undefined;
  }>>
}

const CreateMiningAnalysis: React.FC<IProps> = ({ videoId, setAnalysis }) => {
  const { register, handleSubmit, watch, control } = useForm<IInputs>({
    defaultValues: {
      options: {
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

  console.log(videoId)

  const onSubmit: SubmitHandler<IInputs> = async data => {
    setCreating(true)

    const { options, privacy, save } = data

    const finalData = { 
      videoId,
      type: 'mining',
      options: {
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

    const result = await api.post<MiningResponse>('/analysis', finalData)

    setAnalysis({ created: true, content: result.data })

    // console.log(result)
  }

  return (
    <>
    {creating ? <h1>Criando análise...</h1> : 
    <form onSubmit={handleSubmit(onSubmit)} className={styles.miningFormWrapper}>
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
    }
    </>
  )
}

export { CreateMiningAnalysis }