import { RiThumbUpFill, RiThumbDownFill, RiQuestionAnswerFill, RiCalendarFill } from 'react-icons/ri'
import { Button } from '@chakra-ui/react'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import dateFormat, { i18n } from "dateformat";

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
import { CommentsPublicationDate } from './components/default/CommentsPublicationDate'
import { ShareModal } from '../ShareModal'

import styles from './styles.module.scss'
import { ViewIcon } from '@chakra-ui/icons';

function titleCase(str: string) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

interface IProps {
  analysis: DefaultResponse | MiningResponse | CompleteResponse
}

function formatDate(date: string) {
  const dateObject = new Date(date)
  const dateFormatted = dateFormat(dateObject, 'dd / mm / yyyy')
  return dateFormatted
}

const Analysis: React.FC<IProps> = ({ analysis }) => {
  const { type, options } = analysis.requestData

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
              <h2 className={styles.title}>{titleCase(videoData.title)}</h2>
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
              <div className={styles.viewCount}>
                <ViewIcon />
                <span>{videoData.statistics.viewCount}</span>
              </div>
              <div className={styles.commentCount}>
                <RiQuestionAnswerFill />
                <span>{videoData.statistics.commentCount}</span>
              </div>
              <div className={styles.videoDate}>
                <RiCalendarFill />
                <span>{formatDate(videoData.published_at)}</span>
              </div>
            </div>
          </div>
        </header>
        <div className={styles.content}>
          <ul className={styles.optionList}>
            {/* Polaridade dos comentários */}
            { options.commentsPolarity && (
              <li className={styles.option}><CommentsPolarity commentsPolarity={commentsPolarity} /></li>
            )}

            {/* Principais comentários positivos */}
            { options.topPositiveComments && (
              <li className={styles.option}><TopPositiveComments comments={topPositiveComments} /></li>
            )}

            {/* Principais comentários negativos */}
            { options.topNegativeComments && (
              <li className={styles.option}><TopNegativeComments comments={topNegativeComments} /></li>
            )}

            {/* Contagem de comentários */}
            { options.commentCount && (
              <li className={styles.option}><CommentCount count={commentCount} requestData={options.commentCount} /></li>
            )}

            {/* Comentário com mais curtidas */}
            { options.mostLikedComment && (
              <li className={styles.option}><MostLikedComment comment={mostLikedComment} /></li>
            )}

            {/* Idioma dos comentários */}
            { options.commentsLanguage && (
              <li className={styles.option}><CommentsLanguage languages={commentsLanguage} /></li>
            )}


            {/* Comentário com mais respostas */}
            { options.mostRepliesComment && (
              <li className={styles.option}><MostRepliesComment comment={mostRepliesComment} /></li>
            )}

            {/* Usuário com mais comentários */}
            { options.topComentingUser && (
              <li className={styles.option}><TopCommentingUser user={topComentingUser} /></li>
            )}

            {/* Contagem de palavras */}
            { options.wordCount && (
              <li className={styles.option}><WordCount count={wordCount} requestData={options.wordCount} /></li>
            )}

            {/* Principais palavras */}
            { options.topWords && (
              <li className={styles.option}><TopWords words={topWords} /> </li>
            )}

            {/* Principais palavras usadas em conjunto */}
            { options.topWordsUsedTogether && (
              <li className={styles.option}><TopWordsUsedTogether words={topWordsUsedTogether} /></li>
            )}

            {/* Palavras relacionadas ao título do vídeo */}
            { options.wordsRelatedToVideoTitle && (
              <li className={styles.option}><WordsRelatedToVideoTitle words={wordsRelatedToVideoTitle} /></li>
            )}

            {/* Data de publicação dos comentários */}
            { options.commentsPublicationDate && (
              <li className={styles.option}><h1>Mapa de calor dos comentários não funcionando</h1></li>
              // <CommentsPublicationDate dates={commentsPublicationDate} />
            )}
            </ul>
        </div>
        <div className={styles.btns}>
          <Button className={styles.btnDownload} onClick={handleDownload}>Baixar</Button>
          <ShareModal>Compartilhar</ShareModal>
        </div>
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
              <h2 className={styles.title}>{titleCase(videoData.title)}</h2>
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
              <div className={styles.viewCount}>
                <ViewIcon />
                <span>{videoData.statistics.viewCount}</span>
              </div>
              <div className={styles.commentCount}>
                <RiQuestionAnswerFill />
                <span>{videoData.statistics.commentCount}</span>
              </div>
              <div className={styles.videoDate}>
                <RiCalendarFill />
                <span>{formatDate(videoData.published_at)}</span>
              </div>
            </div>
          </div>
        </header>
        <div className={styles.content}>
          <ul className={styles.optionList}>
            {/* Palavras mineradas */}
            { options.wordsToFindWords && (
              <li className={styles.option}><ListWords words={words} /></li>
            )}

            {/* Frases mineradas */}
            { options.phrasesToFindPhrases && (
              <li className={styles.option}><ListPhrases phrases={phrases} /></li>
            )}

            {/* Comentários de palavras específicas */}
            { options.wordsToFindComments && (
              <li className={styles.option}><CommentsFromWords comments={commentsFromWords} /></li>
            )}

            {/* Comentário  s de frases específicas */}
            { options.phrasesToFindComments && (
              <li className={styles.option}><CommentsFromPhrases comments={commentsFromPhrases} /></li>
            )}

              {/* Comentários de usuários específicos */}
            { options.usersToFindComments && (
              <li className={styles.option}><CommentsFromUsers comments={commentsFromUsers} /></li>
            )}
          </ul>
        </div>
        <div className={styles.btns}>
          <Button className={styles.btnDownload} onClick={handleDownload}>Baixar</Button>
          <ShareModal>Compartilhar</ShareModal>
        </div>
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
              <h2 className={styles.title}>{titleCase(videoData.title)}</h2>
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
              <div className={styles.viewCount}>
                <ViewIcon />
                <span>{videoData.statistics.viewCount}</span>
              </div>
              <div className={styles.commentCount}>
                <RiQuestionAnswerFill />
                <span>{videoData.statistics.commentCount}</span>
              </div>
              <div className={styles.videoDate}>
                <RiCalendarFill />
                <span>{formatDate(videoData.published_at)}</span>
              </div>
            </div>
          </div>
        </header>
        <div className={styles.content}>
          <ul className={styles.optionList}>
            {/* Polaridade dos comentários */}
            { options.commentsPolarity && (
              <li className={styles.option}><CommentsPolarity commentsPolarity={commentsPolarity} /></li>
            )}

            {/* Principais comentários positivos */}
            { options.topPositiveComments && (
              <li className={styles.option}><TopPositiveComments comments={topPositiveComments} /></li>
            )}

            {/* Principais comentários negativos */}
            { options.topNegativeComments && (
              <li className={styles.option}><TopNegativeComments comments={topNegativeComments} /></li>
            )}

            {/* Contagem de comentários */}
            { options.commentCount && (
              <li className={styles.option}><CommentCount count={commentCount} requestData={options.commentCount} /></li>
            )}

            {/* Comentário com mais curtidas */}
            { options.mostLikedComment && (
              <li className={styles.option}><MostLikedComment comment={mostLikedComment} /></li>
            )}

            {/* Idioma dos comentários */}
            { options.commentsLanguage && (
              <li className={styles.option}><CommentsLanguage languages={commentsLanguage} /></li>
            )}

            {/* Comentário com mais respostas */}
            { options.mostRepliesComment && (
              <li className={styles.option}><MostRepliesComment comment={mostRepliesComment} /></li>
            )}

            {/* Usuário com mais comentários */}
            { options.topComentingUser && (
              <li className={styles.option}><TopCommentingUser user={topComentingUser} /></li>
            )}

            {/* Contagem de palavras */}
            { options.wordCount && (
              <li className={styles.option}><WordCount count={wordCount} requestData={options.wordCount} /></li>
            )}

            {/* Principais palavras */}
            { options.topWords && (
              <li className={styles.option}><TopWords words={topWords} /></li>
            )}

            {/* Principais palavras usadas em conjunto */}
            { options.topWordsUsedTogether && (
              <li className={styles.option}><TopWordsUsedTogether words={topWordsUsedTogether} /></li>
            )}

            {/* Palavras relacionadas ao título do vídeo */}
            { options.wordsRelatedToVideoTitle && (
              <li className={styles.option}><WordsRelatedToVideoTitle words={wordsRelatedToVideoTitle} /></li>
            )}

            {/* Data de publicação dos comentários */}
            { options.commentsPublicationDate && (
              <h1>Mapa de calor dos comentários não funcionando</h1>
              // <CommentsPublicationDate dates={commentsPublicationDate} />
            )}

            {/* Palavras mineradas */}
            { options.wordsToFindWords && (
              <li className={styles.option}><ListWords words={words} /></li>
            )}

            {/* Frases mineradas */}
            { options.phrasesToFindPhrases && (
              <li className={styles.option}><ListPhrases phrases={phrases} /></li>
            )}

            {/* Comentários de palavras específicas */}
            { options.wordsToFindComments && (
              <li className={styles.option}><CommentsFromWords comments={commentsFromWords} /></li>
            )}

            {/* Comentário  s de frases específicas */}
            { options.phrasesToFindComments && (
              <li className={styles.option}><CommentsFromPhrases comments={commentsFromPhrases} /></li>
            )}

              {/* Comentários de usuários específicos */}
            { options.usersToFindComments && (
              <li className={styles.option}><CommentsFromUsers comments={commentsFromUsers} /></li>
            )}
          </ul>
        </div>
        <div className={styles.btns}>
          <Button className={styles.btnDownload} onClick={handleDownload}>Baixar</Button>
          <ShareModal>Compartilhar</ShareModal>
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