import UserModel from './models/user-model';
import getBtnByText from './helpers/get-btn-by-text';
import setInputValue from './helpers/set-input-value';
import convertUserData from './data/convert-user-data';
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

  private initWorkersQty: number;

  private flowIsRunning = false;

  private autoFillInProcess: boolean;

  constructor(user: UserModel) {
    this.userData = convertUserData(user);
    this.initWorkersQty = this.userData.workers.length;
    console.log(this.userData);

    this.btnFill = getBtnByText('fill', document);
    this.btnAdd = getBtnByText('add', document);
    this.inputs = document.querySelectorAll('input');

    this.setupButtons();
  }

  setupButtons(): void {
    this.btnFill.addEventListener('click', () => {
      this.flowIsRunning = true;
      if (!this.isInputsFilled) {
        this.fillMainFormInputs();
      }
      if (this.userData.workers.length > 0) {
        this.fillModalInputs().then();
      }
    });

    this.btnAdd.addEventListener('click', () => {
      if (this.autoFillInProcess) return;
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
    this.autoFillInProcess = true;
    console.log('workers', this.userData.workers);
    for (const worker of this.userData.workers) {
      try {
        this.btnAdd.click();
        const modalControls = await waitModalOpen();
        await fillModalFields(modalControls, worker);
        await waitUserConfirm(modalControls);
        await waitModalClose();
      } catch (e) {
        const filledRows = document.querySelectorAll('.MuiTableRow-root');
        const diff = this.userData.workers.length + filledRows.length - this.initWorkersQty - 1;
        if (diff > 0) {
          this.userData.workers.splice(0, diff);
        }
        this.autoFillInProcess = false;
        console.log('REJECT!!');
        console.log(this.userData.workers);
        return;
      }
    }
    this.userData.workers = [];
  }
}

export default App;
