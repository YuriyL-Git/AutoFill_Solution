import WorkerModel from './worker-model';

interface UserModel {
  name: string;
  email: string;
  desc: string;
  firstPhone: string;
  secondaryPhone: string;
  workers: Array<WorkerModel>;
}

export default UserModel;
