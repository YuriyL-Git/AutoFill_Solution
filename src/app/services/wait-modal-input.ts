const waitModalInput = async (): Promise<HTMLInputElement | null> => {
  return new Promise((resolve, reject) => {
    const modalInterval = setInterval(() => {
      const modalWindow = document.querySelector('.MuiDialog-container');
      const inputs = modalWindow.querySelectorAll('input');

      if (inputs.length === 8) {
        clearInterval(modalInterval);
        resolve(inputs[4]);
      }
      if (inputs.length === 0) {
        clearInterval(modalInterval);
        reject(null);
      }
    }, 100);
  });
};

export default waitModalInput;
