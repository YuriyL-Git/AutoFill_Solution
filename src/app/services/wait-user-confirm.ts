import ModalWindowControls from '../models/modal-controls';
import validateModalInputs from '../helpers/validate-modal-inputs';
import modalCloseHandler from '../helpers/modal-close-handler';

const waitUserConfirm = async (modalControls: ModalWindowControls
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      modalControls.btnAdd.addEventListener('click', () => {
        validateModalInputs();
        resolve(true);
      });
      modalCloseHandler(reject);

      /*      modalControls.btnCancel.addEventListener('click', () => {
              reject(false);
            });*/

      /*      const container = document.querySelector('.MuiDialog-root');
            const modalWindow = document.querySelector('.MuiDialog-container');

            container.addEventListener('click', () => {
              if (event.target === modalWindow) return;
              console.log('reject! wait user confirm');
              reject(false);
            });*/
    });
  }
;

export default waitUserConfirm;
