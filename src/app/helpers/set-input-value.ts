const setInputValue = (input: HTMLInputElement, value: string): void => {
  const inputSetter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value').set;

  input.focus();
  inputSetter.call(input, value);
  input.dispatchEvent(new Event('input', {bubbles: true}));
};

export default setInputValue;
