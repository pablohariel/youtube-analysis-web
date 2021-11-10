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
  const [phrasesToFindPhrases, setPhrasesToFindPhrases] = useState<string[]>([])
  const [wordsToFindComments, setWordsToFindComments] = useState<string[]>([])
  const [phrasesToFindComments, setPhrasesToFindComments] = useState<string[]>([])
  const [usersToFindComments, setUsersToFindComments] = useState<string[]>([])

  const onSubmit: SubmitHandler<IInputs> = async data => {
    setCreating(true)

    const result = await api.post('/analysis', { 
      videoId,
      type: 'mining',
      ...data 
    })

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
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('privacy')} />
          Salvar
        </label>
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