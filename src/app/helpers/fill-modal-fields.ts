import ModalWindowControls from '../models/modal-controls';
import setInputValue from './set-input-value';
import convertDate from './convert-date';
import waitModalInput from '../services/wait-modal-input';

const AUTO_FILL_ROWS = 3;
const DOB_INDEX = 3;
const EXPERIENCE_INDEX = 4;
const GENDER_INDEX = 5;

const fillModalFields = async (modalControls: ModalWindowControls, worker: Array<string>): Promise<boolean> => {
  // set First Name, Last Name, Job position
  for (let i = 0; i < AUTO_FILL_ROWS; i++) {
    setInputValue(modalControls.inputs[i], worker[i]);
  }

  // set date converted to right format
  setInputValue(modalControls.inputs[DOB_INDEX], convertDate(worker[DOB_INDEX]));

  // set gender if information is available
  if (worker[GENDER_INDEX]) {
    modalControls.inputs.forEach(input => {
      if (input.value === worker[GENDER_INDEX]) {
        input.click();
      }
    });
  }

  const inputExperience = await waitModalInput();
  setInputValue(inputExperience, worker[EXPERIENCE_INDEX]);
  return true;
};

export default fillModalFields;
