import KEY_EVENT from '@constants/keyEventValue';
import { KeyboardEvent } from 'react';

const handleInputEvent = (event: KeyboardEvent<HTMLInputElement>, action: (value: string) => void) => {
  if (event.code === KEY_EVENT.ENTER.code) {
    const inputValue = event.currentTarget.value.trim();
    action(inputValue);
  }
};

export default handleInputEvent;
