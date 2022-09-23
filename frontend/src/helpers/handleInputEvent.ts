import { KeyboardEvent } from 'react';

const handleInputEvent = (event: KeyboardEvent<HTMLInputElement>, action: (value: string) => void) => {
  if (event.code === 'Enter') {
    const inputValue = event.currentTarget.value.trim();
    action(inputValue);
  }
};

export default handleInputEvent;
