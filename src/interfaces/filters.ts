type IFilterOptions = 'time' | 'popularity' | 'own'
type IHistoryFilterOptions = 'time' | 'popularity'

interface IFilters {
  active: IFilterOptions
  options: {
    time: boolean
    popularity: boolean
    own: boolean
  }
}

interface IHistoryFilters {
  active: IHistoryFilterOptions
  options: {
    time: boolean
    popularity: boolean
  }
}

export { IFilters, IFilterOptions, IHistoryFilters, IHistoryFilterOptions }