import UserModel from './app/models/user-model';
import App from './app/app';

window.addEventListener('load', function (event) {
  // @ts-ignore
  const userData = data as UserModel;
  new App(userData);
});
