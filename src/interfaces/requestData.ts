interface MiningRequestWordFilters {
  avoidAccentuation: boolean
  caseSensitive: boolean
  includeCommentReplies: boolean
  polarity: 'positive' | 'negative' | 'neutral' | 'all'
  class: 'noun' | 'verb' | 'adjective' | 'all'
}

interface MiningRequestPhraseFilters {
  avoidAccentuation: boolean
  caseSensitive: boolean
  includeCommentReplies: boolean
}

interface MiningRequestUserFilters {
  avoidAccentuation: boolean
  caseSensitive: boolean
  includeCommentReplies: boolean
}

interface MiningRequest {
  videoId: string
  userId: string
  type: 'default' | 'mining' | 'complete'
  options: {
    wordsToFindWords?: {
      content: string[]
      filters: MiningRequestWordFilters
    }
    wordsToFindComments?: {
      content: string[]
      filters: MiningRequestWordFilters
    }
    phrasesToFindPhrases?: {
      content: string[]
      filters: MiningRequestPhraseFilters
    }
    phrasesToFindComments?: {
      content: string[]
      filters: MiningRequestPhraseFilters
    }
    usersToFindComments?: {
      content: string[]
      filters: MiningRequestUserFilters
    }
  }
  privacy: 'public' | 'private'
  save: boolean
}

export interface DefaultRequestCommentFilters {
  includeCommentReplies: boolean
}

export interface DefaultRequestWordFilters {
  includeCommentReplies: boolean
  avoidAccentuation: boolean
  caseSensitive: boolean
}

interface DefaultRequest {
  videoId: string
  userId: string
  type: 'default' | 'mining' | 'complete'
  options: {
    commentCount?: DefaultRequestCommentFilters
    commentsPolarity?: DefaultRequestCommentFilters
    topPositiveComments?: DefaultRequestCommentFilters
    topNegativeComments?: DefaultRequestCommentFilters
    mostLikedComment?: DefaultRequestCommentFilters
    mostRepliesComment?: boolean
    wordCount?: {
      checked: boolean
      includeCommentReplies: boolean
      countRepeatedWords: boolean
    }
    topWords?: DefaultRequestWordFilters
    topWordsUsedTogether?: DefaultRequestWordFilters
    wordsRelatedToVideoTitle?: DefaultRequestWordFilters
    topComentingUser?: DefaultRequestCommentFilters
    commentsLanguage?: DefaultRequestCommentFilters
    commentsPublicationDate?: DefaultRequestCommentFilters
  }
  privacy: 'public' | 'private'
  save: boolean
}

interface CompleteRequest {
  videoId: string
  userId: string
  type: 'default' | 'mining' | 'complete'
  options: {
    commentCount?: DefaultRequestCommentFilters
    commentsPolarity?: DefaultRequestCommentFilters
    topPositiveComments?: DefaultRequestCommentFilters
    topNegativeComments?: DefaultRequestCommentFilters
    mostLikedComment?: DefaultRequestCommentFilters
    mostRepliesComment?: boolean
    wordCount?: {
      checked: boolean
      includeCommentReplies: boolean
      countRepeatedWords: boolean
    }
    topWords?: DefaultRequestWordFilters
    topWordsUsedTogether?: DefaultRequestWordFilters
    wordsRelatedToVideoTitle?: DefaultRequestWordFilters
    topComentingUser?: DefaultRequestCommentFilters
    commentsLanguage?: DefaultRequestCommentFilters
    commentsPublicationDate?: DefaultRequestCommentFilters
    wordsToFindWords?: {
      content: string[]
      filters: MiningRequestWordFilters
    }
    wordsToFindComments?: {
      content: string[]
      filters: MiningRequestWordFilters
    }
    phrasesToFindPhrases?: {
      content: string[]
      filters: MiningRequestPhraseFilters
    }
    phrasesToFindComments?: {
      content: string[]
      filters: MiningRequestPhraseFilters
    }
    usersToFindComments?: {
      content: string[]
      filters: MiningRequestUserFilters
    }
  }
  privacy: 'public' | 'private'
  save: boolean
}

export { DefaultRequest, MiningRequest, CompleteRequest }
