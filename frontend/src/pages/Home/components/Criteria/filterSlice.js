import { createSlice } from "@reduxjs/toolkit"

const DEFAULT_URL = "http://localhost:8080/api/v1/products"
const filterSlice = createSlice({
  name: "filter",
  initialState: {
    name: "",
    category: "",
    designer: "",
    key: "",
    order: "",
    url: DEFAULT_URL,
  },
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload
    },
    updateCategory: (state, action) => {
      state.category = action.payload
    },
    updateDesigner: (state, action) => {
      state.designer = action.payload
    },
    updateSort: (state, action) => {
      state.key = action.payload.key
      state.order = action.payload.order
    },
    updateUrl: (state) => {
      const params = {
        name: state.name,
        category: state.category,
        designer: state.designer,
        key: state.key,
        order: state.order,
      }
      const searchUrl = new URLSearchParams();
      for (const key in params) {
        if (params[key] !== "") {
          searchUrl.append(key, params[key]);
        }
      }
      state.url = `http://localhost:8080/api/v1/products/filter?${searchUrl.toString()}`
    },
    resetAll: (state) => {
      state.name = ""
      state.category = ""
      state.designer = ""
      state.key = ""
      state.order = ""
      state.url = DEFAULT_URL
    }
  }
})

export const { updateCategory, updateDesigner, updateSort, setUrl, updateUrl, updateName, resetAll } = filterSlice.actions
export default filterSlice.reducer
