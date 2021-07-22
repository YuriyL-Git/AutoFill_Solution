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
    });
  }
;

export default waitUserConfirm;
