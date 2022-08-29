interface filterState{
  category: string,
  designer: string,
  sort: Object,
  url: string
}

export interface rootState{
  filter: filterState
}