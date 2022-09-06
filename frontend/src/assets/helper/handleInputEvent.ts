const KEY_CODE_SPACE = 32;
// eslint-disable-next-line @typescript-eslint/ban-types
const handleInputEvent = (event: any, action: Function) => {
  if (event.key === 'Enter' || event.key === KEY_CODE_SPACE) {
    const inputValue = event.target.value.trim();
    action(inputValue);
  }
};

export default handleInputEvent;
