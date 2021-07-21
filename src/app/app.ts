import UserModel from './models/user-model';
import getBtnByText from './helpers/get-btn-by-text';
import setInputValue from './helpers/set-input-value';
import convertUserData from './helpers/convert-user-data';
import ArrayUserModel from './models/array-user-model';
import waitModalOpen from './services/wait-modal-open';
import waitUserConfirm from './services/wait-user-confirm';
import fillModalFields from './helpers/fill-modal-fields';
import waitModalClose from './services/wait-modal-close';

class App {
  private btnFill: HTMLButtonElement;

  private btnAdd: HTMLButtonElement;

  private inputs: NodeListOf<HTMLInputElement>;

  private userData: ArrayUserModel;

  private isInputsFilled = false;

  constructor(user: UserModel) {
    this.userData = convertUserData(user);
    console.log(user);

    this.btnFill = getBtnByText('fill', document);
    this.btnAdd = getBtnByText('add', document);
    this.inputs = document.querySelectorAll('input');

    this.setupButtonFill();
  }

  setupButtonFill(): void {
    this.btnFill.addEventListener('click', () => {
      if (this.isInputsFilled) return;
      this.fillMainFormInputs();

      if (this.userData.workers.length > 0) {
        this.fillModalInputs().then();
      }
    });
  }

  fillMainFormInputs(): void {
    this.userData.user.forEach((field, index) => {
      setInputValue(this.inputs[index], field);
    });

    this.isInputsFilled = true;
  }

  async fillModalInputs(): Promise<void> {
    for (const worker of this.userData.workers) {
      try {
        this.btnAdd.click();
        const modalControls = await waitModalOpen();
        await fillModalFields(modalControls, worker);
        await waitUserConfirm(modalControls);
        await waitModalClose();
      } catch (e) {
        console.log('window closed');
      }
    }

    console.log('modal showed!');
  }
}

export default App;
