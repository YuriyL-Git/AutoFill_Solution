import ModalWindowControls from '../models/modal-controls';
import validateModalInputs from '../helpers/validate-modal-inputs';

const waitUserConfirm = async (modalControls: ModalWindowControls
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      modalControls.btnAdd.addEventListener('click', () => {
        validateModalInputs();
        resolve(true);
      });

      modalControls.btnCancel.addEventListener('click', () => {
        reject(false);
      });
    });
  }
;

export default waitUserConfirm;
