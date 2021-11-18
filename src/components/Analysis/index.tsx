import { CompleteResponse, DefaultResponse, MiningResponse } from '../../interfaces/responseData'

interface IProps {
  analysis: DefaultResponse | MiningResponse | CompleteResponse
}

const Analysis: React.FC<IProps> = ({ analysis }) => {
  const { type } = analysis.requestData

  if(type === 'default') {
    const { content, requestData, videoData } = analysis as DefaultResponse

    const { options } = requestData
    const { 
      commentsPolarity, 
      commentCount, 
      mostLikedComment, 
      commentsLanguage,
      mostRepliesComment,
      topComentingUser,
      topPositiveComments,
      topNegativeComments,
      wordCount,
      topWords,
      topWordsUsedTogether,
      wordsRelatedToVideoTitle
    } = content

    return (
      <div>
        <h1>Análise realizada com sucesso. Resultados:</h1>
        <header>
          <img src={videoData.thumbnail} width='100px' height='100px' />
          <h2>{videoData.title}</h2>
        </header>
        {type === 'default' && (
          <div>
            {/* Polaridade dos comentários */}
            { options.commentsPolarity && (
              <div>
                <h3>Polaridade dos comentários</h3>
                {JSON.stringify(commentsPolarity)}
              </div>
            )}

            {/* Principais comentários positivos */}
            { options.topPositiveComments && (
              <div>
                <h3>Principais comentários positivos</h3>
                {JSON.stringify(topPositiveComments)}
              </div>
            )}

            {/* Principais comentários negativos */}
            { options.topNegativeComments && (
              <div>
                <h3>Principais comentários negativos</h3>
                {JSON.stringify(topNegativeComments)}
              </div>
            )}

            {/* Contagem de comentários */}
            { options.commentCount && (
              <div>
                <h3>Contagem de comentários</h3>
                <p>Foram encontrados um total de <strong>{commentCount}</strong> comentários</p>
              </div>
            )}

            {/* Comentário com mais curtidas */}
            { options.mostLikedComment && (
              <div>
                <h3>Comentário com mais curtidas</h3>
                <p>{mostLikedComment?.content}</p>
              </div>
            )}

            {/* Idioma dos comentários */}
            { options.commentsLanguage && (
              <div>
                <h3>Idioma dos comentários</h3>
                <p>{JSON.stringify(commentsLanguage)}</p>
              </div>
            )}


            {/* Comentário com mais respostas */}
            { options.mostRepliesComment && (
              <div>
                <h3>Comentário com mais respostas</h3>
                <p>{JSON.stringify(mostRepliesComment)}</p>
              </div>
            )}

            {/* Usuário com mais comentários */}
            { options.topComentingUser && (
              <div>
                <h3>Usuário com mais comentários</h3>
                <p>{JSON.stringify(topComentingUser)}</p>
              </div>
            )}

            {/* Contagem de palavras */}
            { options.wordCount && (
              <div>
                <h3>Contagem de palavras</h3>
                <p>Foram encontrados um total de <strong>{wordCount}</strong> palavras</p>
              </div>
            )}

            {/* Principais palavras */}
            { options.topWords && (
              <div>
                <h3>Principais palavras</h3>
                <p>{JSON.stringify(topWords)}</p>
              </div>
            )}

            {/* Principais palavras usadas em conjunto */}
            { options.topWordsUsedTogether && (
              <div>
                <h3>Principais palavras usadas em conjunto</h3>
                <p>{JSON.stringify(topWordsUsedTogether)}</p>
              </div>
            )}

            {/* Palavras relacionadas ao título do vídeo */}
            { options.wordsRelatedToVideoTitle && (
              <div>
                <h3>Palavras relacionadas ao título do vídeo</h3>
                <p>{JSON.stringify(wordsRelatedToVideoTitle)}</p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  } 
  else if(type === 'mining') {
    const { content, requestData, videoData } = analysis as MiningResponse

    const { options } = requestData
    const { 
      words,
      phrases,
      commentsFromWords,
      commentsFromPhrases,
      commentsFromUsers
    } = content

    return (
      <div>
        <h1>Análise realizada com sucesso. Resultados:</h1>
        <header>
          <img src={videoData.thumbnail} width='100px' height='100px' />
          <h2>{videoData.title}</h2>
        </header>
          <div>
            {/* Palavras mineradas */}
            { options.wordsToFindWords && (
              <div>
                <h3>Palavras mineradas</h3>
                {JSON.stringify(words)}
              </div>
            )}

            {/* Frases mineradas */}
            { options.phrasesToFindPhrases && (
              <div>
                <h3>Frases mineradas</h3>
                {JSON.stringify(phrases)}
              </div>
            )}

            {/* Comentários de palavras específicas */}
            { options.wordsToFindComments && (
              <div>
                <h3>Comentários de palavras específicas</h3>
                {JSON.stringify(commentsFromWords)}
              </div>
            )}

            {/* Comentários de frases específicas */}
            { options.phrasesToFindComments && (
              <div>
                <h3>Comentários de frases específicas</h3>
                {JSON.stringify(commentsFromPhrases)}
              </div>
            )}

              {/* Comentários de usuários específicos */}
            { options.usersToFindComments && (
              <div>
                <h3>Comentários de usuários específicos</h3>
                {JSON.stringify(commentsFromUsers)}
              </div>
            )}

          </div>
      </div>
    )

  } else {
    return (
      <h1>Tipo de análise não suportado</h1>
    )
  }

  
}

export { Analysis }