const handleInputEvent = (event: any, action: Function) => {
  if (event.code === 'Enter') {
    const inputValue = event.target.value.trim();
    action(inputValue);
  }
};

export default handleInputEvent;
