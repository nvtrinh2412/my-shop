import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemProps } from './Cart';

export interface CartState {
  cartList: CartItemProps[];
  total: number;
}

const initialState: CartState = {
  cartList: [],
  total: 0,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemProps>) => {
      const { cartList } = state;
      const addedItem = action.payload;
      const existingItem = cartList.find((item) => item.id === addedItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartList = [...cartList, addedItem];
      }
      state.total += addedItem.price;
    },
    removeFromCart: (state, action: PayloadAction<CartItemProps>) => {
      const { cartList } = state;
      const removedItem = action.payload;
      const existingItem = cartList.find((item) => item.id === removedItem.id);
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.cartList = cartList.filter((item) => item.id !== removedItem.id);
        }
      }
      state.total -= removedItem.price;
    },
    updateTotal: (state) => {
      const { cartList } = state;
      let total = 0;
      cartList.forEach((item) => {
        total += item.price * item.quantity;
      });
      state.total = total;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
