const getBtnByText = (text: string, component: Element | Document): HTMLButtonElement | null => {
  const btnArray = component?.querySelectorAll('button');
  if (!btnArray) return null;

  let result = null;
  btnArray.forEach((btn) => {
    const btnSpan = btn.querySelector('span');
    if (btnSpan.innerHTML.toLowerCase() === text.toLowerCase()) {
      result = btn;
    }
  });
  return result;
};

export default getBtnByText;
