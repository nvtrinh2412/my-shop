const handleInputEvent = (event: any, action: Function) => {
  if (event.code === 'Enter' || event.code === 'Space') {
    const inputValue = event.target.value.trim();
    action(inputValue);
  }
};

export default handleInputEvent;
