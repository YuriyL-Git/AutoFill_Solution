import getBtnByText from '../helpers/get-btn-by-text';
import ModalWindowControls from '../models/modal-controls';

const MODAL_WINDOW_TIMEOUT = 4000;

const waitModalWindow = async (): Promise<ModalWindowControls | null> => {
  let timePassed = 0;
  return new Promise((resolve, reject) => {
    const modalInterval = setInterval(() => {
      const modalWindow = document.querySelector('.MuiDialog-container');
      const btnAdd = getBtnByText('add', modalWindow);
      const btnCancel = getBtnByText('cancel', modalWindow);
      const inputs = modalWindow.querySelectorAll('input');
      timePassed += 100;

      if (btnAdd) {
        const result: ModalWindowControls = {
          inputs,
          btnCancel,
          btnAdd
        };
        clearInterval(modalInterval);
        resolve(result);
      }
      if (timePassed > MODAL_WINDOW_TIMEOUT) {
        reject(null);
      }
    }, 100);
  });
};

export default waitModalWindow;
