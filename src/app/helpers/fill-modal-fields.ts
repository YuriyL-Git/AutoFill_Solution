import ModalWindowControls from '../models/modal-controls';
import setInputValue from './set-input-value';
import convertDate from './convert-date';
import waitModalInput from '../services/wait-modal-input';

const fillModalFields = async (modalControls: ModalWindowControls, worker: Array<string>): Promise<boolean> => {
  // set First Name, Last Name, Job position
  for (let i = 0; i < 3; i++) {
    setInputValue(modalControls.inputs[i], worker[i]);
  }

  // set date converted to right format
  setInputValue(modalControls.inputs[3], convertDate(worker[3]));

  // set gender if information available
  if (worker[5]) {
    modalControls.inputs.forEach(input => {
      if (input.value === worker[5]) {
        input.click();
      }
    });
  }

  try {
    const inputExperience = await waitModalInput();
    setInputValue(inputExperience, convertDate(worker[4]));
    return true;
  } catch (e) {
    return false;
  }
};

export default fillModalFields;
