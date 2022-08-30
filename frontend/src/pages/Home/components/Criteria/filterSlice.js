import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    category: "",
    designer: "",
    sort: {
      key: "",
      order: "",
    },
    url: "http://localhost:8080/api/v1/products",
  },
  reducers: {
    updateCategory: (state, action) => {
      state.category = action.payload
    },
    updateDesigner: (state, action) => {
      state.designer = action.payload
    },
    updateSort: (state, action) => {
      state.sort = action.payload
    },
    updateUrl: (state) => {
      const params = {
        category: state.category,
        designer: state.designer,
        key: state.sort.key,
        order: state.sort.order,
      }
      const searchUrl = new URLSearchParams();
      for (const key in params) {
        if (params[key] !== "") {
          searchUrl.append(key, params[key]);
        }
      }
      state.url = `http://localhost:8080/api/v1/products/filter?${searchUrl.toString()}`
    },
  }
})

export const { updateCategory, updateDesigner, updateSort, setUrl, updateUrl } = filterSlice.actions
export default filterSlice.reducer
