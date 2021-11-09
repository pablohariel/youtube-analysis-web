import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { api } from '../../../services/api'

interface IInputs {
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
      avoidAccentuation: boolean
      caseSensitive: boolean
    }
    commentsLanguage: {
      checked: boolean
      includeCommentReplies: boolean
    }
    commentsPublicationData: {
      checked: boolean
      includeCommentReplies: boolean
    }
  }
  save: boolean
}

const CreateDefaultAnalysis: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<IInputs>()
  const [creating, setCreating] = useState<boolean>(false)
  

  const onSubmit: SubmitHandler<IInputs> = async data => {
    setCreating(true)

    const result = await api.post('/analysis', { 
      videoId: "TPGZcfNVUGI",
      type: 'default',
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
          <input type='checkbox'  {...register('options.commentCount.checked')} />
          Contagem de comentários
        </label>
        {watch('options.commentCount.checked') && 
          <>
            <input type='checkbox' {...register('options.commentCount.includeCommentReplies')} />
            Incluir respostas dos comentários
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.commentsPolarity.checked')} />
          Polaridade dos comentários
        </label>
        {watch('options.commentsPolarity.checked') && 
          <>
            <input type='checkbox' {...register('options.commentsPolarity.includeCommentReplies')} />
            Incluir respostas dos comentários
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.topPositiveComments.checked')} />
          Principais comentários positivos
        </label>
        {watch('options.topPositiveComments.checked') && 
          <>
            <input type='checkbox' {...register('options.topPositiveComments.includeCommentReplies')} />
            Incluir respostas dos comentários
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.topNegativeComments.checked')} />
          Principais comentários negativos
        </label>
        {watch('options.topNegativeComments.checked') && 
          <>
            <input type='checkbox' {...register('options.topNegativeComments.includeCommentReplies')} />
            Incluir respostas dos comentários
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.mostLikedComment.checked')} />
          Comentários com mais curtidas
        </label>
        {watch('options.mostLikedComment.checked') && 
          <>
            <input type='checkbox' {...register('options.mostLikedComment.includeCommentReplies')} />
            Incluir respostas dos comentários
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.mostRepliesComment.checked')} />
          Comentários com mais respostas
        </label>
      </div>
      
      <div>
        <label>
          <input type='checkbox'  {...register('options.wordCount.checked')} />
          Contagem de palavras
        </label>
        {watch('options.wordCount.checked') && 
          <>
            <label>
              <input type='checkbox' {...register('options.wordCount.includeCommentReplies')} />
              Incluir respostas dos comentários
            </label>
            <label>
              <input type='checkbox' {...register('options.wordCount.avoidAccentuation')} />
              Ignorar acentuação
            </label>
            <label>
              <input type='checkbox' {...register('options.wordCount.caseSensitive')} />
              Diferenciar letras maiusculas de minusculas
            </label>
            <label>
              <input type='checkbox' {...register('options.wordCount.includeRepeatedWords')} />
              Contar palavras repetidas
            </label>
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.topWords.checked')} />
          Principais palavras
        </label>
        {watch('options.topWords.checked') && 
          <>
            <label>
              <input type='checkbox' {...register('options.topWords.includeCommentReplies')} />
              Incluir respostas dos comentários
            </label>
            <label>
              <input type='checkbox' {...register('options.topWords.avoidAccentuation')} />
              Ignorar acentuação
            </label>
            <label>
              <input type='checkbox' {...register('options.topWords.caseSensitive')} />
              Diferenciar letras maiusculas de minusculas
            </label>
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.topWordsUsedTogether.checked')} />
          Principais palavras usadas em conjunto
        </label>
        {watch('options.topWordsUsedTogether.checked') && 
          <>
            <label>
              <input type='checkbox' {...register('options.topWordsUsedTogether.includeCommentReplies')} />
              Incluir respostas dos comentários
            </label>
            <label>
              <input type='checkbox' {...register('options.topWordsUsedTogether.avoidAccentuation')} />
              Ignorar acentuação
            </label>
            <label>
              <input type='checkbox' {...register('options.topWordsUsedTogether.caseSensitive')} />
              Diferenciar letras maiusculas de minusculas
            </label>
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.wordsRelatedToVideoTitle.checked')} />
          Palavras relacionadas ao título do vídeo
        </label>
        {watch('options.wordsRelatedToVideoTitle.checked') && 
          <>
            <label>
              <input type='checkbox' {...register('options.wordsRelatedToVideoTitle.includeCommentReplies')} />
              Incluir respostas dos comentários
            </label>
            <label>
              <input type='checkbox' {...register('options.wordsRelatedToVideoTitle.avoidAccentuation')} />
              Ignorar acentuação
            </label>
            <label>
              <input type='checkbox' {...register('options.wordsRelatedToVideoTitle.caseSensitive')} />
              Diferenciar letras maiusculas de minusculas
            </label>
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.topComentingUser.checked')} />
          Usuário com mais comentários
        </label>
        {watch('options.topComentingUser.checked') && 
          <>
            <label>
              <input type='checkbox' {...register('options.topComentingUser.includeCommentReplies')} />
              Incluir respostas dos comentários
            </label>
            <label>
              <input type='checkbox' {...register('options.topComentingUser.avoidAccentuation')} />
              Ignorar acentuação
            </label>
            <label>
              <input type='checkbox' {...register('options.topComentingUser.caseSensitive')} />
              Diferenciar letras maiusculas de minusculas
            </label>
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.commentsLanguage.checked')} />
          Idioma dos comentários
        </label>
        {watch('options.commentsLanguage.checked') && 
          <>
            <label>
              <input type='checkbox' {...register('options.commentsLanguage.includeCommentReplies')} />
              Incluir respostas dos comentários
            </label>
          </>
        }
      </div>

      <div>
        <label>
          <input type='checkbox'  {...register('options.commentsPublicationData.checked')} />
          Data de publicação dos comentários
        </label>
        {watch('options.commentsPublicationData.checked') && 
          <>
            <label>
              <input type='checkbox' {...register('options.commentsPublicationData.includeCommentReplies')} />
              Incluir respostas dos comentários
            </label>
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

export { CreateDefaultAnalysis }