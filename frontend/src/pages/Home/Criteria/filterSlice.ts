import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import parseToSearchUrl from '@assets/helper/parseToSearchUrl';

export interface FilterState {
  name: string;
  category: string;
  designer: string;
  key: string;
  order: string;
  url: string;
}
export interface SortProps {
  key: string;
  order: string;
}

const DEFAULT_URL = 'http://localhost:8080/api/v1';
const initialState: FilterState = {
  name: '',
  category: '',
  designer: '',
  key: '',
  order: '',
  url: `${DEFAULT_URL}/products`,
};
export const DEFAULT_FILTER = {
  name: '',
  category: '',
  designer: '',
  key: '',
  order: '',
  url: `${DEFAULT_URL}/products`,
};
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    updateDesigner: (state, action: PayloadAction<string>) => {
      state.designer = action.payload;
    },
    updateSort: (state, action: PayloadAction<SortProps>) => {
      state.key = action.payload.key;
      state.order = action.payload.order;
    },
    updateUrl: (state) => {
      const params = {
        name: state.name,
        category: state.category,
        designer: state.designer,
        key: state.key,
        order: state.order,
      };
      const searchUrl = parseToSearchUrl(params);
      state.url = `${DEFAULT_URL}/products/filter?${searchUrl}`;
    },
    resetAll: (state) => {
      state.name = DEFAULT_FILTER.name;
      state.category = DEFAULT_FILTER.category;
      state.designer = DEFAULT_FILTER.designer;
      state.key = DEFAULT_FILTER.key;
      state.order = DEFAULT_FILTER.order;
      state.url = DEFAULT_FILTER.url;
    },
    updateAll: (state, action) => {
      state.name = action.payload?.name;
      state.category = action.payload?.category;
      state.designer = action.payload?.designer;
      state.key = action.payload?.key;
      state.order = action.payload?.order;
    },
  },
});

export const { updateCategory, updateDesigner, updateSort, updateUrl, updateName, resetAll, updateAll } =
  filterSlice.actions;
export default filterSlice.reducer;
