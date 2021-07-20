const getBtnByText = (text: string): HTMLButtonElement | null => {
  const btnArray = document.querySelectorAll('button');
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
