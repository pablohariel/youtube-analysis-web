import { RiThumbUpFill, RiThumbDownFill, RiQuestionAnswerFill, RiCalendarFill } from 'react-icons/ri'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

import { CompleteResponse, DefaultResponse, MiningResponse } from '../../interfaces/responseData'

import { CommentsPolarity } from './components/default/CommentsPolarity'
import { TopPositiveComments } from './components/default/TopPositiveComments'
import { TopNegativeComments } from './components/default/TopNegativeComments'
import { MostLikedComment } from './components/default/MostLikedComment'
import { MostRepliesComment } from './components/default/MostRepliesComment'
import { TopCommentingUser } from './components/default/TopCommentingUser'
import { CommentsLanguage } from './components/default/CommentsLanguage'
import { WordsRelatedToVideoTitle } from './components/default/WordsRelatedToVideoTitle'
import { WordCount } from './components/default/WordCount'
import { CommentCount } from './components/default/CommentCount'
import { TopWords } from './components/default/TopWords'
import { TopWordsUsedTogether } from './components/default/TopWordsUsedTogether'
import { ListWords } from './components/mining/ListWords'
import { CommentsFromWords } from './components/mining/CommentsFromWords'
import { CommentsFromPhrases } from './components/mining/CommentsFromPhrases'
import { ListPhrases } from './components/mining/ListPhrases'
import { CommentsFromUsers } from './components/mining/CommentsFromUsers'
import { CommentsPublicationDate } from './components/default/CommentsPublicationDate';

import styles from './styles.module.scss'
import { useEffect } from 'react';
import { api } from '../../services/api';

interface IProps {
  analysis: DefaultResponse | MiningResponse | CompleteResponse
}

const Analysis: React.FC<IProps> = ({ analysis }) => {
  const { type } = analysis.requestData

  const handleDownload = () => {
    let element = document.getElementById("analysisCardWrapper") || document.body;
    savePDF(element, {
      paperSize: "A4",
      scale: 0.6,
      imageResolution: 1080
    });
  }

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
      wordsRelatedToVideoTitle,
      commentsPublicationDate
    } = content

    console.log(videoData.thumbnail)
    videoData.statistics

    return (
      <div className={styles.analysisCardWrapper}>
        <header className={styles.header}>
          <img className={styles.videoImg} src={videoData.thumbnail} />
          <div className={styles.videoInfo}>
            <div>
              <h2 className={styles.title}>{videoData.title}</h2>
              <div className={styles.channelInfoWrapper}> 
                <img className={styles.channelImg} src={videoData.channelDetails.thumbnail} />
                <h3 className={styles.channelTitle}>{videoData.channelDetails.title}</h3>
              </div>
            </div>
            <div className={styles.videoStatistics}>
              
              <div className={styles.likeCount}>
                <RiThumbUpFill />
                <span>{videoData.statistics.likeCount}</span>
              </div>
              <div className={styles.dislikeCount}>
                <RiThumbDownFill />
                <span>{videoData.statistics.dislikeCount}</span>
              </div>
              <div className={styles.commentCount}>
                <RiQuestionAnswerFill />
                <span>{videoData.statistics.commentCount}</span>
              </div>
              <div className={styles.videoDate}>
                <RiCalendarFill />
                <span>{videoData.published_at}</span>
              </div>
            </div>
          </div>
        </header>
        {type === 'default' && (
          <div className={styles.content}>
            {/* Polaridade dos comentários */}
            { options.commentsPolarity && (
              <CommentsPolarity commentsPolarity={commentsPolarity} />
            )}

            {/* Principais comentários positivos */}
            { options.topPositiveComments && (
              <TopPositiveComments comments={topPositiveComments} />
            )}

            {/* Principais comentários negativos */}
            { options.topNegativeComments && (
              <TopNegativeComments comments={topNegativeComments} />
            )}

            {/* Contagem de comentários */}
            { options.commentCount && (
              <CommentCount count={commentCount} />
            )}

            {/* Comentário com mais curtidas */}
            { options.mostLikedComment && (
              <MostLikedComment comment={mostLikedComment} />
            )}

            {/* Idioma dos comentários */}
            { options.commentsLanguage && (
              <CommentsLanguage languages={commentsLanguage} />
            )}


            {/* Comentário com mais respostas */}
            { options.mostRepliesComment && (
              <MostRepliesComment comment={mostRepliesComment} />
            )}

            {/* Usuário com mais comentários */}
            { options.topComentingUser && (
              <TopCommentingUser user={topComentingUser} />
            )}

            {/* Contagem de palavras */}
            { options.wordCount && (
              <WordCount count={wordCount} />
            )}

            {/* Principais palavras */}
            { options.topWords && (
              <TopWords words={topWords} />
            )}

            {/* Principais palavras usadas em conjunto */}
            { options.topWordsUsedTogether && (
              <TopWordsUsedTogether words={topWordsUsedTogether} />
            )}

            {/* Palavras relacionadas ao título do vídeo */}
            { options.wordsRelatedToVideoTitle && (
              <WordsRelatedToVideoTitle words={wordsRelatedToVideoTitle} />
            )}

            {/* Data de publicação dos comentários */}
            { options.commentsPublicationDate && (
              <CommentsPublicationDate dates={commentsPublicationDate} />
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
      <div className={styles.analysisCardWrapper} id='analysisCardWrapper'>
        <header className={styles.header}>
          <img className={styles.videoImg} src={videoData.thumbnail} />
          <div className={styles.videoInfo}>
            <div>
              <h2 className={styles.title}>{videoData.title}</h2>
              <div className={styles.channelInfoWrapper}> 
                <img className={styles.channelImg} src={videoData.channelDetails.thumbnail} />
                <h3 className={styles.channelTitle}>{videoData.channelDetails.title}</h3>
              </div>
            </div>
            <div className={styles.videoStatistics}>
              <div className={styles.likeCount}>
                <RiThumbUpFill />
                <span>{videoData.statistics.likeCount}</span>
              </div>
              <div className={styles.dislikeCount}>
                <RiThumbDownFill />
                <span>{videoData.statistics.dislikeCount}</span>
              </div>
              <div className={styles.commentCount}>
                <RiQuestionAnswerFill />
                <span>{videoData.statistics.commentCount}</span>
              </div>
              <div className={styles.videoDate}>
                <RiCalendarFill />
                <span>{videoData.published_at}</span>
              </div>
            </div>
          </div>
        </header>
        <div className={styles.content}>
          {/* Palavras mineradas */}
          { options.wordsToFindWords && (
            <ListWords words={words} />
          )}

          {/* Frases mineradas */}
          { options.phrasesToFindPhrases && (
            <ListPhrases phrases={phrases} />
          )}

          {/* Comentários de palavras específicas */}
          { options.wordsToFindComments && (
            <CommentsFromWords comments={commentsFromWords} />
          )}

          {/* Comentário  s de frases específicas */}
          { options.phrasesToFindComments && (
            <CommentsFromPhrases comments={commentsFromPhrases} />
          )}

            {/* Comentários de usuários específicos */}
          { options.usersToFindComments && (
            <CommentsFromUsers comments={commentsFromUsers} />
          )}
        </div>
        <button onClick={handleDownload}>Download</button>
      </div>
    )

  } 
  else if(type === 'complete') {
    const { content, requestData, videoData } = analysis as CompleteResponse

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
      wordsRelatedToVideoTitle,
      commentsPublicationDate,
      words,
      phrases,
      commentsFromWords,
      commentsFromPhrases,
      commentsFromUsers
    } = content

    console.log(videoData.thumbnail)
    videoData.statistics

    return (
      <div className={styles.analysisCardWrapper}>
        <header className={styles.header}>
          <img className={styles.videoImg} src={videoData.thumbnail} />
          <div className={styles.videoInfo}>
            <div>
              <h2 className={styles.title}>{videoData.title}</h2>
              <div className={styles.channelInfoWrapper}> 
                <img className={styles.channelImg} src={videoData.channelDetails.thumbnail} />
                <h3 className={styles.channelTitle}>{videoData.channelDetails.title}</h3>
              </div>
            </div>
            <div className={styles.videoStatistics}>
              
              <div className={styles.likeCount}>
                <RiThumbUpFill />
                <span>{videoData.statistics.likeCount}</span>
              </div>
              <div className={styles.dislikeCount}>
                <RiThumbDownFill />
                <span>{videoData.statistics.dislikeCount}</span>
              </div>
              <div className={styles.commentCount}>
                <RiQuestionAnswerFill />
                <span>{videoData.statistics.commentCount}</span>
              </div>
              <div className={styles.videoDate}>
                <RiCalendarFill />
                <span>{videoData.published_at}</span>
              </div>
            </div>
          </div>
        </header>
        <div className={styles.content}>
          {/* Polaridade dos comentários */}
          { options.commentsPolarity && (
            <CommentsPolarity commentsPolarity={commentsPolarity} />
          )}

          {/* Principais comentários positivos */}
          { options.topPositiveComments && (
            <TopPositiveComments comments={topPositiveComments} />
          )}

          {/* Principais comentários negativos */}
          { options.topNegativeComments && (
            <TopNegativeComments comments={topNegativeComments} />
          )}

          {/* Contagem de comentários */}
          { options.commentCount && (
            <CommentCount count={commentCount} />
          )}

          {/* Comentário com mais curtidas */}
          { options.mostLikedComment && (
            <MostLikedComment comment={mostLikedComment} />
          )}

          {/* Idioma dos comentários */}
          { options.commentsLanguage && (
            <CommentsLanguage languages={commentsLanguage} />
          )}


          {/* Comentário com mais respostas */}
          { options.mostRepliesComment && (
            <MostRepliesComment comment={mostRepliesComment} />
          )}

          {/* Usuário com mais comentários */}
          { options.topComentingUser && (
            <TopCommentingUser user={topComentingUser} />
          )}

          {/* Contagem de palavras */}
          { options.wordCount && (
            <WordCount count={wordCount} />
          )}

          {/* Principais palavras */}
          { options.topWords && (
            <TopWords words={topWords} />
          )}

          {/* Principais palavras usadas em conjunto */}
          { options.topWordsUsedTogether && (
            <TopWordsUsedTogether words={topWordsUsedTogether} />
          )}

          {/* Palavras relacionadas ao título do vídeo */}
          { options.wordsRelatedToVideoTitle && (
            <WordsRelatedToVideoTitle words={wordsRelatedToVideoTitle} />
          )}

          {/* Data de publicação dos comentários */}
          { options.commentsPublicationDate && (
            <CommentsPublicationDate dates={commentsPublicationDate} />
          )}

          {/* Palavras mineradas */}
          { options.wordsToFindWords && (
            <ListWords words={words} />
          )}

          {/* Frases mineradas */}
          { options.phrasesToFindPhrases && (
            <ListPhrases phrases={phrases} />
          )}

          {/* Comentários de palavras específicas */}
          { options.wordsToFindComments && (
            <CommentsFromWords comments={commentsFromWords} />
          )}

          {/* Comentário  s de frases específicas */}
          { options.phrasesToFindComments && (
            <CommentsFromPhrases comments={commentsFromPhrases} />
          )}

            {/* Comentários de usuários específicos */}
          { options.usersToFindComments && (
            <CommentsFromUsers comments={commentsFromUsers} />
          )}
        </div>
      </div>
    )
  }
  else {
    return (
      <h1>Tipo de análise não suportado</h1>
    )
  }

  
}

export { Analysis }