import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@components/common/Cart/cartSlice';
import filterReducer from '@pages/Home/Criteria/filterSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
  },
});
