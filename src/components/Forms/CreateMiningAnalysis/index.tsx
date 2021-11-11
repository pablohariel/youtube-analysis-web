import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { api } from '../../../services/api'

interface IInputs {
  options: {
    wordsToFindWords: {
      checked: boolean
      content: string[]
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    } 
    phrasesToFindPhrases: {
      checked: boolean
      content: string[]
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    }
    wordsToFindComments: {
      checked: boolean
      content: string[]
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    }
    phrasesToFindComments: {
      checked: boolean
      content: string[]
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    }
    usersToFindComments: {
      checked: boolean
      content: string[]
      includeCommentReplies: boolean
      avoidAccentuation: boolean
      caseSensitive: boolean
    }
  }
  privacy: 'public' | 'private'
  save: boolean
}

interface IProps {
  videoId: string
}

const CreateMiningAnalysis: React.FC<IProps> = ({ videoId }) => {
  const { register, handleSubmit, watch } = useForm<IInputs>()
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

    const result = await api.post('/analysis', finalData)

    setCreating(false)

    console.log(result)
  }

  return (
    <>
    {creating ? <h1>Criando análise...</h1> : 
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          <input type='checkbox'  {...register('options.wordsToFindWords.checked')} />
          Minerar palavras
        </label>
        {watch('options.wordsToFindWords.checked') && 
          <>
            <div>
              <label>
                <input type='checkbox' {...register('options.wordsToFindWords.includeCommentReplies')} />
                Incluir respostas dos comentários
              </label>
              <label>
                <input type='checkbox' {...register('options.wordsToFindWords.avoidAccentuation')} />
                Ignorar acentuação
              </label>
              <label>
                <input type='checkbox' {...register('options.wordsToFindWords.caseSensitive')} />
                Diferenciar letras maiusculas de minusculas
              </label>
            </div>
            <div>
              <input type='text' value={wordToFindWords} onChange={event => setWordToFindWords(event.target.value)} /> 
              <button type='button' onClick={() => setWordsToFindWords([...wordsToFindWords, wordToFindWords])}>Add</button>
              <ul>
                {wordsToFindWords.map((word, index) => <li>{word}<button type='button' onClick={() => setWordsToFindWords(wordsToFindWords.filter((item, i) => i !== index))}>X</button></li>)}
              </ul>
            </div>
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.phrasesToFindPhrases.checked')} />
          Minerar frases
        </label>
        {watch('options.phrasesToFindPhrases.checked') && 
          <>
            <div>
              <label>
                <input type='checkbox' {...register('options.phrasesToFindPhrases.includeCommentReplies')} />
                Incluir respostas dos comentários
              </label>
              <label>
                <input type='checkbox' {...register('options.phrasesToFindPhrases.avoidAccentuation')} />
                Ignorar acentuação
              </label>
              <label>
                <input type='checkbox' {...register('options.phrasesToFindPhrases.caseSensitive')} />
                Diferenciar letras maiusculas de minusculas
              </label>
            </div>
            <div>
              <input type='text' value={phraseToFindPhrases} onChange={event => setPhraseToFindPhrases(event.target.value)} /> 
              <button type='button' onClick={() => setPhrasesToFindPhrases([...phrasesToFindPhrases, phraseToFindPhrases])}>Add</button>
              <ul>
                {phrasesToFindPhrases.map((phrase, index) => <li>{phrase}<button type='button' onClick={() => setPhrasesToFindPhrases(phrasesToFindPhrases.filter((item, i) => i !== index))}>X</button></li>)}
              </ul>
            </div>
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.wordsToFindComments.checked')} />
          Minerar comentários contendo palavras específicas
        </label>
        {watch('options.wordsToFindComments.checked') && 
          <>
            <div>
              <label>
                <input type='checkbox' {...register('options.wordsToFindComments.includeCommentReplies')} />
                Incluir respostas dos comentários
              </label>
              <label>
                <input type='checkbox' {...register('options.wordsToFindComments.avoidAccentuation')} />
                Ignorar acentuação
              </label>
              <label>
                <input type='checkbox' {...register('options.wordsToFindComments.caseSensitive')} />
                Diferenciar letras maiusculas de minusculas
              </label>
            </div>
            <div>
              <input type='text' value={wordToFindComments} onChange={event => setWordToFindComments(event.target.value)} /> 
              <button type='button' onClick={() => setWordsToFindComments([...wordsToFindComments, wordToFindComments])}>Add</button>
              <ul>
                {wordsToFindComments.map((word, index) => <li>{word}<button type='button' onClick={() => setWordsToFindComments(wordsToFindComments.filter((item, i) => i !== index))}>X</button></li>)}
              </ul>
            </div>
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.phrasesToFindComments.checked')} />
          Minerar comentários contendo frases específicas
        </label>
        {watch('options.phrasesToFindComments.checked') && 
          <>
            <div>
              <label>
                <input type='checkbox' {...register('options.phrasesToFindComments.includeCommentReplies')} />
                Incluir respostas dos comentários
              </label>
              <label>
                <input type='checkbox' {...register('options.phrasesToFindComments.avoidAccentuation')} />
                Ignorar acentuação
              </label>
              <label>
                <input type='checkbox' {...register('options.phrasesToFindComments.caseSensitive')} />
                Diferenciar letras maiusculas de minusculas
              </label>
            </div>
            <div>
              <input type='text' value={phraseToFindComments} onChange={event => setPhraseToFindComments(event.target.value)} /> 
              <button type='button' onClick={() => setPhrasesToFindComments([...phrasesToFindComments, phraseToFindComments])}>Add</button>
              <ul>
                {phrasesToFindComments.map((phrase, index) => <li>{phrase}<button type='button' onClick={() => setPhrasesToFindComments(phrasesToFindComments.filter((item, i) => i !== index))}>X</button></li>)}
              </ul>
            </div>
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.usersToFindComments.checked')} />
          Minerar comentários de usuários específicos
        </label>
        {watch('options.usersToFindComments.checked') && 
          <>
            <div>
              <label>
                <input type='checkbox' {...register('options.usersToFindComments.includeCommentReplies')} />
                Incluir respostas dos comentários
              </label>
              <label>
                <input type='checkbox' {...register('options.usersToFindComments.avoidAccentuation')} />
                Ignorar acentuação
              </label>
              <label>
                <input type='checkbox' {...register('options.usersToFindComments.caseSensitive')} />
                Diferenciar letras maiusculas de minusculas
              </label>
            </div>
            <div>
              <input type='text' value={userToFindComments} onChange={event => setUserToFindComments(event.target.value)} /> 
              <button type='button' onClick={() => setUsersToFindComments([...usersToFindComments, userToFindComments])}>Add</button>
              <ul>
                {usersToFindComments.map((user, index) => <li>{user}<button type='button' onClick={() => setUsersToFindComments(usersToFindComments.filter((item, i) => i !== index))}>X</button></li>)}
              </ul>
            </div>

          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('save')} />
          Salvar
        </label>
      </div>

      <button type='submit'>Enviar</button>
    </form>
    }
    </>
  )
}

export { CreateMiningAnalysis }