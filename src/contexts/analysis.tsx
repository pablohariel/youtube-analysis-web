import { useState, createContext } from "react"

import { CompleteRequest, DefaultRequest, MiningRequest } from '../interfaces/requestData'
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


export interface IDefaultAnalysis {
  id: string
  userId: string
  user: IUser
  requestData: DefaultRequest
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
    commentsPublicationDate?: string[]
  }
  viewCount: number
  privacy: 'private' | 'public'
  created_at: string
  updated_at: string
}

export interface IMiningAnalysis {
  id: string
  userId: string
  user: IUser
  requestData: MiningRequest
  videoData: VideoData
  content: {
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

export interface ICompleteAnalysis {
  id: string
  userId: string
  user: IUser
  requestData: CompleteRequest
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
    commentsPublicationDate?: string[]
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
  analysis: (IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]
  setAnalysis: React.Dispatch<React.SetStateAction<(IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]>>
}

const AnalysisContext = createContext({} as AnalysisContextData)

const AnalysisProvider: React.FC = ({ children }) => {
  const [analysis, setAnalysis] = useState<(IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]>([])

  useEffect(() => {
    api.get<(IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]>('/analysis').then(response => {
      setAnalysis(response.data)
    })
  }, [])

  return (
    <AnalysisContext.Provider value={{ analysis, setAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  )
}

export { AnalysisProvider, AnalysisContext }