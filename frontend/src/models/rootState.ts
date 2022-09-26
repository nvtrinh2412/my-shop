import { CartState } from '@components/common/Cart/cartSlice';

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
  cart: CartState;
}
