const setInputValue = (input: HTMLInputElement, value: string): void => {
  const inputPrototype = Object.getPrototypeOf(input);
  const inputSetter = Object.getOwnPropertyDescriptor(inputPrototype, 'value').set;

  input.focus();
  inputSetter.call(input, value);
  input.dispatchEvent(new Event('input', {bubbles: true}));
};

export default setInputValue;
