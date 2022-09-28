import KEY_EVENT from '@constants/keyEventValue';
import { KeyboardEvent } from 'react';

const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>, action: Function) => {
  if (event.code === KEY_EVENT.ENTER.code) {
    action();
  }
};
export default onKeyDownHandler;
