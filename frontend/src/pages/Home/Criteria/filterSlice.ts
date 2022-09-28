import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import parseToSearchUrl from '@helpers/parseToSearchUrl';
import SLICE_NAMES from '@constants/slice';
import parseFilterURLParams from '@helpers/parseFilterURLParam';

const searchParams = new URLSearchParams(window.location.search);
const searchParamsObject = parseFilterURLParams(searchParams);
const initialURL = parseToSearchUrl(searchParamsObject);
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

const initialState: FilterState = {
  name: '',
  category: '',
  designer: '',
  key: '',
  order: '',
  url: `/products/filter?${initialURL}`,
};
export const DEFAULT_FILTER = {
  name: '',
  category: '',
  designer: '',
  key: '',
  order: '',
  url: '/products',
};
const filterSlice = createSlice({
  name: SLICE_NAMES.FILTER,
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
      const { key, order } = action.payload;
      state.key = key;
      state.order = order;
    },
    updateUrl: (state) => {
      const { name, category, designer, key, order } = state;
      const params = {
        name,
        category,
        designer,
        key,
        order,
      };
      const searchUrl = parseToSearchUrl(params);
      state.url = `/products/filter?${searchUrl}`;
    },
    resetAll: (state) => {
      state = { ...DEFAULT_FILTER };
    },
    updateAll: (state, action) => {
      const { name, category, designer, key, order } = action.payload;
      state.name = name;
      state.category = category;
      state.designer = designer;
      state.key = key;
      state.order = order;
    },
  },
});

export const { updateCategory, updateDesigner, updateSort, updateUrl, updateName, resetAll, updateAll } =
  filterSlice.actions;
export default filterSlice.reducer;
