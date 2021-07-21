import getBtnByText from '../helpers/get-btn-by-text';
import ModalWindowControls from '../models/modal-controls';

const MODAL_WINDOW_TIMEOUT = 6000;
const CHECK_INTERVAL = 100;

const waitModalOpen = async (): Promise<ModalWindowControls | null> => {
  let timePassed = 0;
  return new Promise((resolve, reject) => {
    const modalInterval = setInterval(() => {
      const modalWindow = document.querySelector('.MuiDialog-container');
      if (!modalWindow) return;
      const btnAdd = getBtnByText('add', modalWindow);
      const btnCancel = getBtnByText('cancel', modalWindow);
      const inputs = modalWindow.querySelectorAll('input');
      timePassed += CHECK_INTERVAL;

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
    }, CHECK_INTERVAL);
  });
};

export default waitModalOpen;
