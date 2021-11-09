import { useState, createContext } from "react"

import { DefaultRequest, MiningRequest } from '../interfaces/requestData'
import { Comment, CommentAnalyzed, CommentsGroupedByPolarityNoComments } from '../interfaces/comment'
import { JoinedPhrase } from '../interfaces/joinedPhrase'
import { VideoData } from '../interfaces/videoData'
import { WordsTogether } from '../interfaces/wordsTogether'
import { JoinedWord } from '../interfaces/word'
import { CommentsFromPhrase, CommentsFromUser, CommentsFromWord } from '../interfaces/commentFromData'
import { LanguagesCount } from '../interfaces/languages'
import { WordRelatedToVideoTitle } from '../interfaces/wordRelatedToVideoTitle'
import { IUser } from './auth'
import { useEffect } from "react"
import { api } from "../services/api"


export interface IAnalysis {
  id: string
  userId: string
  user: IUser
  requestData: DefaultRequest | MiningRequest
  videoData: VideoData
  content: {
    commentCount?: number
    commentsPolarity?: CommentsGroupedByPolarityNoComments,
    topPositiveComments?: CommentAnalyzed[]
    topNegativeComments?: CommentAnalyzed[]
    mostLikedComment?: Comment
    mostRepliesComment?: Comment
    wordCount?: number
    topWords?: JoinedWord[]
    topWordsUsedTogether?: WordsTogether[]
    wordsRelatedToVideoTitle?: WordRelatedToVideoTitle[]
    topComentingUser?: IUser
    commentsLanguage?: LanguagesCount
    commentsPublicationData?: string[]
    words?: JoinedWord[]
    phrases?: JoinedPhrase[]
    commentsFromWords?: CommentsFromWord[]
    commentsFromPhrases?: CommentsFromPhrase[]
    commentsFromUsers?: CommentsFromUser[]
  }
  viewCount: number
  privacy: 'private' | 'public'
  created_at: string
  updated_at: string
}

interface AnalysisContextData {
  analysis: IAnalysis[]
}

const AnalysisContext = createContext({} as AnalysisContextData)

const AnalysisProvider: React.FC = ({ children }) => {
  const [analysis, setAnalysis] = useState<IAnalysis[]>([])

  useEffect(() => {
    api.get<IAnalysis[]>('/analysis').then(response => {
      setAnalysis(response.data)
    })
  }, [])

  return (
    <AnalysisContext.Provider value={{ analysis }}>
      {children}
    </AnalysisContext.Provider>
  )
}

export { AnalysisProvider, AnalysisContext }