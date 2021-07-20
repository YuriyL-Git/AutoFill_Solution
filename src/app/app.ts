import UserModel from './models/user-model';
import getBtnByText from '../helpers/get-btn-by-text';
import setInputValue from '../helpers/set-input-value';
import convertUserData from '../helpers/convert-user-data';
import ArrayUserModel from './models/array-user-model';

class App {
  private btnFill: HTMLButtonElement;

  private btnAdd: HTMLButtonElement;

  private inputs: NodeListOf<HTMLInputElement>;

  private userData: ArrayUserModel;

  constructor(user: UserModel) {
    this.userData = convertUserData(user);

    this.btnFill = getBtnByText('fill');
    this.btnAdd = getBtnByText('add');
    this.inputs = document.querySelectorAll('input');
    console.log(this.inputs);

    this.setupButtons();
  }

  setupButtons(): void {
    this.btnFill.addEventListener('click', () => {
      this.fillMainInputs();
    });
  }

  fillMainInputs(): void {
    this.userData.user.forEach((field, index) => {
      setInputValue(this.inputs[index], field);
    });
  }
}

export default App;
