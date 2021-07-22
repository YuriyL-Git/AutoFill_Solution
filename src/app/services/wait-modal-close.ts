import modalCloseHandler from '../helpers/modal-close-handler';

const CHECK_INTERVAL = 100;

const waitModalClose = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const modalInterval = setInterval(() => {
      const modalWindow = document.querySelector('.MuiDialog-container');

      if (!modalWindow) {
        clearInterval(modalInterval);
        resolve(true);
      }

    }, CHECK_INTERVAL);

    modalCloseHandler(reject);
  });
};

export default waitModalClose;
