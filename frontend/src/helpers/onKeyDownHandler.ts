import { KeyboardEvent } from 'react';

const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>, action: Function) => {
  if (event.code === 'Enter') {
    action();
  }
};
export default onKeyDownHandler;
