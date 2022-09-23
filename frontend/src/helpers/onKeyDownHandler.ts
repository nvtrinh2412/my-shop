import { CartItemProps } from '@components/common/Cart/Cart';
import { KeyboardEvent } from 'react';

const onKeyDownHandler = (
  event: KeyboardEvent<HTMLDivElement>,
  action: (item: CartItemProps, option: string) => void
) => {
  if (event.code === 'Enter') {
    const { item, option } = event.currentTarget.dataset;
    if (item && option) {
      action(JSON.parse(item), option);
    }
  }
};
export default onKeyDownHandler;
