import modalCloseHandler from '../helpers/modal-close-handler';

const INDEX_INPUT_EXPERIENCE = 4;
const INPUTS_QTY = 8;
const CHECK_INTERVAL = 100;

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
      if (inputs?.length === INPUTS_QTY) {
        clearInterval(modalInterval);
        resolve(inputs[INDEX_INPUT_EXPERIENCE]);
      }
    }, CHECK_INTERVAL);
  });
};

export default waitModalInput;
