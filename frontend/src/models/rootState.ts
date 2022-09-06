interface filterState {
  name: string;
  category: string;
  designer: string;
  key: string;
  order: string;
  url: string;
}

export default interface rootState {
  filter: filterState;
}
