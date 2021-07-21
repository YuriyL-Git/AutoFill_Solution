import UserModel from './models/user-model';
import getBtnByText from './helpers/get-btn-by-text';
import setInputValue from './helpers/set-input-value';
import convertUserData from './helpers/convert-user-data';
import ArrayUserModel from './models/array-user-model';
import waitModalWindow from './services/wait-modal-window';
import waitModalInput from './services/wait-modal-input';

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
    console.log(this.inputs);

    this.setupButtons();
  }

  setupButtons(): void {
    this.btnFill.addEventListener('click', () => {
      if (this.isInputsFilled) return;
      this.fillMainFormInputs();
      this.fillModalInputs().then();
    });
  }

  fillMainFormInputs(): void {
    this.userData.user.forEach((field, index) => {
      setInputValue(this.inputs[index], field);
    });
    this.btnAdd.click();
    this.isInputsFilled = true;
  }

  async fillModalInputs(): Promise<void> {
    for (const worker of this.userData.workers) {
      await waitModalWindow();
      await waitModalInput();
    }

    console.log('modal showed!');
  }
}

export default App;
