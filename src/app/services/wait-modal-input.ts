import modalCloseHandler from '../helpers/modal-close-handler';

const INDEX_INPUT_EXPERIENCE = 4;
const ALL_INPUTS = 8;

const waitModalInput = async (): Promise<HTMLInputElement | null> => {
  return new Promise((resolve, reject) => {
    modalCloseHandler(reject);
    const modalInterval = setInterval(() => {
      const modalWindow = document.querySelector('.MuiDialog-container');
      if (!modalWindow) {
        clearInterval(modalInterval);
        reject(null);
      }

      const inputs = modalWindow?.querySelectorAll('input');
      if (inputs?.length === ALL_INPUTS) {
        clearInterval(modalInterval);
        resolve(inputs[INDEX_INPUT_EXPERIENCE]);
      }
    }, 100);
  });
};

export default waitModalInput;
