import { Comment, Reply } from './comment'

interface WordRelatedToVideoTitle {
  word: string
  timesUsed: number
  comments: (Comment | Reply)[]
}

export { WordRelatedToVideoTitle }