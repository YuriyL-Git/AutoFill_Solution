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

  private autoFillInProcess: boolean;

  constructor(user: UserModel) {
    this.userData = convertUserData(user);
    this.initWorkersQty = this.userData.workers.length;

    this.btnFill = getBtnByText('fill', document);
    this.btnAdd = getBtnByText('add', document);
    this.inputs = document.querySelectorAll('input');

    this.setupButtons();
  }

  setupButtons(): void {
    this.btnFill.addEventListener('click', () => {
      if (!this.isInputsFilled) {
        this.fillMainFormInputs();
      }
      if (this.userData.workers.length > 0) {
        this.fillWorkers().then();
      }
    });

    this.btnAdd.addEventListener('click', () => {
      if (this.autoFillInProcess || !this.isInputsFilled) return;
      if (this.userData.workers.length > 0) {
        this.fillWorkers().then();
      }
    });
  }

  fillMainFormInputs(): void {
    this.userData.user.forEach((field, index) => {
      setInputValue(this.inputs[index], field);
    });
    this.isInputsFilled = true;
  }

  async fillWorkers(): Promise<void> {
    this.autoFillInProcess = true;

    for (const worker of this.userData.workers) {
      try {
        this.btnAdd.click();
        await this.fillCurrentWorker(worker);

      } catch {
        const filledRows = document.querySelectorAll('.MuiTableRow-root');
        const diff = this.userData.workers.length + filledRows.length - this.initWorkersQty - 1;
        this.userData.workers.splice(0, diff);
        this.autoFillInProcess = false;
        return;
      }
    }
    this.userData.workers = [];
  }

  async fillCurrentWorker(worker: Array<string>): Promise<void> {
    const modalControls = await waitModalOpen();
    await fillModalFields(modalControls, worker);
    await waitUserConfirm(modalControls);
    await waitModalClose();
  }
}

export default App;
