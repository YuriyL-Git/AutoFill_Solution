import UserModel from '../app/models/user-model';
import ArrayUserModel from '../app/models/array-user-model';

const convertUserData = (userData: UserModel): ArrayUserModel => {
  const user: Array<string> = [];
  user.push(userData.name || '');
  user.push(userData.email || '');
  user.push(userData.firstPhone || '');
  user.push(userData.secondaryPhone || '');
  user.push(userData.desc || '');

  const workers: Array<Array<string>> = [];
  userData.workers.forEach(worker => {
    const currentWorker = [];
    currentWorker.push(worker.firstName || '');
    currentWorker.push(worker.lastName || '');
    currentWorker.push(worker.job || '');
    currentWorker.push(worker.dob || '');
    currentWorker.push(worker.experience || '');
    currentWorker.push(worker.gender || '');

    workers.push(currentWorker);
  });

  return {
    user,
    workers,
  };
};

export default convertUserData;
