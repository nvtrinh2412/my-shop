const handleInputEvent = (event: any, action: (value: string) => void) => {
  if (event.code === 'Enter') {
    const inputValue = event.target.value.trim();
    action(inputValue);
  }
};

export default handleInputEvent;
