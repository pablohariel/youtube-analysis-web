import { IDefaultAnalysis, IMiningAnalysis, ICompleteAnalysis } from '../contexts/analysis'

import { IFilterOptions } from '../interfaces/filters'

interface IProps {
  analysis: (IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]
  orderBy: IFilterOptions
  userId: string | undefined
}

interface Response {
  filteredAnalysis: (IDefaultAnalysis | IMiningAnalysis | ICompleteAnalysis)[]
}

const filterAnalysis = ({ analysis, orderBy, userId }: IProps): Response => {
  switch(orderBy) {
    case 'time': {
      const filteredAnalysis = analysis.sort((aL, aR) => {
        if(aL.created_at > aR.created_at) {
          return -1
        }
        if(aL.created_at < aR.created_at) {
          return 1
        }
        return 0
      })

      return { filteredAnalysis }
    }
    case 'popularity': {
      const filteredAnalysis = analysis.sort((aL, aR) => {
        if(aL.viewCount > aR.viewCount) {
          return -1
        }
        if(aL.viewCount < aR.viewCount) {
          return 1
        }
        return 0
      })

      return { filteredAnalysis }
    }
    case 'own': {
      if(userId) {
        const filteredAnalysis = analysis.filter(a => a.userId === userId)

        return { filteredAnalysis }
      }
    }
  }

  return { filteredAnalysis: analysis }
}

export { filterAnalysis }