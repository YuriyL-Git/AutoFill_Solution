import getBtnByText from '../helpers/get-btn-by-text';
import ModalWindowControls from '../models/modal-controls';
import modalCloseHandler from '../helpers/modal-close-handler';

const CHECK_INTERVAL = 100;

const waitModalOpen = async (): Promise<ModalWindowControls | null> => {
  return new Promise((resolve, reject) => {
    const modalInterval = setInterval(() => {
      const modalWindow = document.querySelector('.MuiDialog-container');
      if (!modalWindow) return;

      const btnAdd = getBtnByText('add', modalWindow);
      const btnCancel = getBtnByText('cancel', modalWindow);
      const inputs = modalWindow.querySelectorAll('input');

      if (btnAdd) {
        clearInterval(modalInterval);
        console.log('MODAL OPENED!');
        resolve({inputs, btnCancel, btnAdd});
      }
    }, CHECK_INTERVAL);

    modalCloseHandler(reject);
  });
};

export default waitModalOpen;
