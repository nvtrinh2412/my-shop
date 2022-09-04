import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../pages/Home/components/Criteria/filterSlice";

export default configureStore({
  reducer: {
    filter: filterReducer,
  }
})
