type IListAnalysisOrderOptions = 'created_at' | 'viewCount'
type IHistoryFilterOptions = 'time' | 'popularity'

interface IListAnalysisFilters {
  options: {
    orderBy: IListAnalysisOrderOptions
    pageNumber: number
  }
}

interface IHistoryFilters {
  active: IHistoryFilterOptions
  options: {
    time: boolean
    popularity: boolean
  }
}

export { IListAnalysisFilters, IListAnalysisOrderOptions, IHistoryFilters, IHistoryFilterOptions }