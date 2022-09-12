import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../components/common/Header/Cart/cartSlice";
import filterReducer from "../pages/Home/components/Criteria/filterSlice";

export default configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
  }
})
